document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const searchBar = document.getElementById('search-bar');
    const popup = document.getElementById('search-popup');
    const progressBarContainer = document.getElementById('progress-bar');
    const progressBar = progressBarContainer ? progressBarContainer.querySelector('.progress') : null;
    const previousBtn = document.getElementById('previous-btn');
    const nextBtn = document.getElementById('next-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const currentSongDetails = document.getElementById('current-song-details');
    const repeatBtn = document.getElementById('repeat-btn');
    const shuffleBtn = document.querySelector('.fa-shuffle');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeToggleBtn = document.getElementById('volume-toggle-btn');
    let allPlayButtons = document.querySelectorAll('.play-button');
    const playlistContainer = document.getElementById('playlist-list');
    const addToPlaylistOverlay = document.getElementById('add-to-playlist-overlay');
    const playlistOptions = document.getElementById('playlist-options');
    const songsPopupOverlay = document.getElementById('songs-popup-overlay');
    const songsPopupTitle = document.getElementById('songs-popup-title');
    const songsPopupList = document.getElementById('songs-popup-list');

    // Audio and State
    const audioPlayer = new Audio();
    const preloadPlayer = new Audio(); // For preloading next song
    let currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;
    let playbackPosition = parseFloat(localStorage.getItem('playbackPosition')) || 0;
    let isPlaying = false;
    let isRepeating = false;
    let isShuffleMode = false;
    let isMuted = false; // Track mute state
    let previousVolume = parseFloat(localStorage.getItem('previousVolume')) || 0.2; // Store volume before muting
    let currentSection = localStorage.getItem('currentSection') || 'allin';
    let currentSectionButtons = [];
    let shuffleQueue = [];
    let playedSongs = new Set();
    let shuffleHistory = [];
    let lastPlayedSong = localStorage.getItem('lastPlayedSong') || null;
    let songList = [];
    let originalSongList = [];
    let attemptedSongs = new Set(); // Tracks songs that failed to play
    let playlists = JSON.parse(localStorage.getItem('playlists')) || { "Favorites": [] };
    console.log('Loaded playlists from localStorage:', playlists);
    let currentSongToAdd = null;
    const initialVolume = 0.2;
    let nextSongPreloaded = null;

    audioPlayer.volume = initialVolume;
    preloadPlayer.volume = 0; // Mute preload player
    pauseAudio();

    // Initialize volume state
    if (volumeSlider) {
        volumeSlider.value = initialVolume * 100;
        if (volumeToggleBtn) {
            volumeToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    }

    // Wake Lock
    if ('wakeLock' in navigator) {
        try {
            navigator.wakeLock.request('screen');
            console.log('Screen Wake Lock is active.');
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    }

    // Loading Screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.getElementById('player-interface').style.display = 'block';
    }, 1500);

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Song List Management
    const getAllSongs = () => {
        const songs = Array.from(document.querySelectorAll('.page #song-list li'))
            .map(li => {
                const titleElement = li.querySelector('.song-title');
                const title = titleElement ? titleElement.innerText.trim() : 'Untitled Song';
                const src = li.getAttribute('data-src');
                if (!titleElement) console.warn(`No .song-title found in li with src: ${src}`);
                if (!src) console.warn(`No data-src found in li with title: ${title}`);
                console.log(`Extracted song: ${title} from ${src}`);
                return {
                    title: title,
                    src: src,
                    section: li.closest('.page')?.id || currentSection
                };
            })
            .filter(song => song.src);
        if (!originalSongList.length) {
            originalSongList = [...songs];
        }
        console.log('Songs loaded:', songs);
        return songs;
    };

    function updateSectionButtons(sectionId) {
        currentSection = sectionId;
        currentSectionButtons = Array.from(document.querySelectorAll(`#${sectionId} .play-button`));
        console.log(`Section set to ${sectionId} with ${currentSectionButtons.length} songs`);
        localStorage.setItem('currentSection', currentSection);
        resetShuffleQueue();
        if (isPlaying && audioPlayer.src) {
            highlightCurrentSong();
        } else {
            currentSongIndex = 0;
        }
        updatePlayButtonListeners();
        updateAddToPlaylistListeners();
        preloadNextSong(); // Preload the first song in the new section
    }

    function resetShuffleQueue() {
        shuffleQueue = Array.from({length: currentSectionButtons.length}, (_, i) => i)
            .filter(i => !attemptedSongs.has(i)); // Exclude failed songs
        if (currentSongIndex >= 0 && currentSectionButtons.length > 0) {
            shuffleQueue = shuffleQueue.filter(i => i !== currentSongIndex);
        }
        playedSongs.clear();
        shuffleHistory = [];
        if (isShuffleMode) {
            shuffleArray(shuffleQueue);
            if (currentSongIndex >= 0) {
                shuffleQueue.unshift(currentSongIndex);
            }
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function updatePlayButtonListeners() {
        allPlayButtons = document.querySelectorAll('.play-button');
        allPlayButtons.forEach(button => {
            button.removeEventListener('click', handlePlayButtonClick);
            button.addEventListener('click', handlePlayButtonClick);
        });
    }

    function updateAddToPlaylistListeners() {
        const addButtons = document.querySelectorAll('#song-list .add-to-playlist');
        addButtons.forEach(button => {
            button.removeEventListener('click', handleAddToPlaylistClick);
            button.addEventListener('click', handleAddToPlaylistClick);
        });
    }

    function handlePlayButtonClick() {
        const sectionElement = this.closest('.page');
        if (!sectionElement) return;
        const newSectionId = sectionElement.id;
        updateSectionButtons(newSectionId);
        const sectionIndex = currentSectionButtons.indexOf(this);
        if (sectionIndex === -1) return;
        const songSrc = currentSectionButtons[sectionIndex].parentElement.getAttribute('data-src');
        const songTitle = currentSectionButtons[sectionIndex].parentElement.querySelector('.song-title').innerText;
        
        // Check if the clicked song is currently playing
        if (isPlaying && currentSongIndex === sectionIndex && newSectionId === currentSection) {
            pauseAudio(); // Pause the song
        } else {
            // Play the song (resume if same song, start new if different)
            currentSongIndex = sectionIndex;
            if (isShuffleMode) {
                shuffleQueue = shuffleQueue.filter(i => i !== sectionIndex);
                shuffleQueue.unshift(sectionIndex);
            }
            const isSameSong = audioPlayer.src === new URL(songSrc, window.location.href).href;
            playAudio(songSrc, songTitle, newSectionId, isSameSong ? audioPlayer.currentTime : 0);
        }
    }

    function handleAddToPlaylistClick() {
        const li = this.closest('li');
        const songTitle = li.querySelector('.song-title')?.innerText.trim() || 'Untitled Song';
        const song = {
            title: songTitle,
            src: li.getAttribute('data-src'),
            section: li.closest('.page')?.id || currentSection
        };
        console.log('Opening add-to-playlist popup from song list:', song);
        openAddToPlaylistPopup(song);
    }

    // Preload Next Song
    function preloadNextSong() {
        let nextIndex;
        if (isShuffleMode) {
            if (shuffleQueue.length === 0) {
                if (playedSongs.size >= currentSectionButtons.length - attemptedSongs.size) {
                    resetShuffleQueue();
                } else {
                    shuffleQueue = Array.from({length: currentSectionButtons.length}, (_, i) => i)
                        .filter(i => !playedSongs.has(i) && i !== currentSongIndex && !attemptedSongs.has(i));
                    shuffleArray(shuffleQueue);
                }
            }
            nextIndex = shuffleQueue[0];
        } else {
            nextIndex = currentSongIndex + 1 >= currentSectionButtons.length ? 0 : currentSongIndex + 1;
            while (attemptedSongs.has(nextIndex) && nextIndex < currentSectionButtons.length) {
                nextIndex++;
            }
            if (nextIndex >= currentSectionButtons.length) nextIndex = 0;
        }
        if (nextIndex >= 0 && currentSectionButtons[nextIndex] && !attemptedSongs.has(nextIndex)) {
            const nextSongSrc = currentSectionButtons[nextIndex].parentElement.getAttribute('data-src');
            preloadPlayer.src = nextSongSrc;
            nextSongPreloaded = { index: nextIndex, src: nextSongSrc };
            console.log(`Preloaded next song: ${nextSongSrc}`);
        } else {
            nextSongPreloaded = null;
        }
    }

    // Initial Setup
    updateSectionButtons(currentSection);
    songList = getAllSongs();
    updatePlaylistUI();

    if (lastPlayedSong && playbackPosition > 0) {
        const songIndex = Array.from(currentSectionButtons).findIndex(button => 
            button.parentElement.getAttribute('data-src') === lastPlayedSong
        );
        if (songIndex !== -1) {
            currentSongIndex = songIndex;
            audioPlayer.src = lastPlayedSong;
            audioPlayer.currentTime = playbackPosition;
            audioPlayer.play().then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                highlightCurrentSong();
                updateAllPlayButtons();
                preloadNextSong();
            }).catch(error => {
                console.error('Error resuming last played song:', error);
                attemptedSongs.add(songIndex);
                skipToNextPlayableSong();
            });
        }
    }

    // Utility Functions
    function showMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.className = 'skip-message';
        document.body.appendChild(message);
        message.offsetHeight;
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 2000);
    }

    async function playAudioFromPosition(audioSrc, position, songTitle, section) {
        attemptedSongs.add(currentSongIndex);
        audioPlayer.src = audioSrc;
        audioPlayer.currentTime = position;
        lastPlayedSong = audioSrc;
        localStorage.setItem('lastPlayedSong', lastPlayedSong);

        try {
            const playPromise = audioPlayer.play();
            const timeout = setTimeout(() => {
                if (!audioPlayer.currentTime > 0 && !audioPlayer.paused) {
                    console.error(`Song ${songTitle} failed to start playing`);
                    throw new Error('Playback didn’t start');
                }
            }, 500);

            await playPromise;
            clearTimeout(timeout);

            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            currentSongDetails.textContent = songTitle;
            currentSection = section;
            console.log(`Playing: ${songTitle} from ${audioSrc} at position ${position}`);
            highlightCurrentSong();
            updateAllPlayButtons();
            localStorage.setItem('currentSongIndex', currentSongIndex);
            attemptedSongs.delete(currentSongIndex); // Remove from attempted if successful
            if (isShuffleMode) {
                playedSongs.add(currentSongIndex);
            }
            preloadNextSong(); // Preload the next song after starting playback
        } catch (error) {
            console.error(`Error playing song at index ${currentSongIndex}:`, error);
            showMessage('Song skipped due to error');
            skipToNextPlayableSong();
        }
    }

    function playAudio(audioSrc, songTitle, section, startPosition = 0) {
        playAudioFromPosition(audioSrc, startPosition, songTitle, section);
    }

    function pauseAudio() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playbackPosition = audioPlayer.currentTime;
        localStorage.setItem('playbackPosition', playbackPosition);
        console.log(`Paused at position: ${playbackPosition}`);
        highlightCurrentSong();
        updateAllPlayButtons();
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseAudio();
        } else if (audioPlayer.src) {
            audioPlayer.play()
                .then(() => {
                    isPlaying = true;
                    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    highlightCurrentSong();
                    updateAllPlayButtons();
                    preloadNextSong();
                })
                .catch(error => {
                    console.error('Error resuming playback:', error);
                    showMessage('Error resuming song');
                    skipToNextPlayableSong();
                });
        } else if (lastPlayedSong) {
            const song = songList.find(s => s.src === lastPlayedSong);
            if (song) {
                playAudio(song.src, song.title, song.section, playbackPosition);
            } else {
                playCurrentSong();
            }
        } else {
            playCurrentSong();
        }
    }

    function playCurrentSong() {
        if (currentSectionButtons.length > 0) {
            const songSrc = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
            const songTitle = currentSectionButtons[currentSongIndex].parentElement.querySelector('.song-title').innerText;
            playAudio(songSrc, songTitle, currentSection);
        }
    }

    function playPreviousSong() {
        if (isShuffleMode) {
            if (shuffleHistory.length > 0) {
                if (currentSongIndex >= 0) {
                    shuffleQueue.unshift(currentSongIndex);
                }
                currentSongIndex = shuffleHistory.pop();
                while (attemptedSongs.has(currentSongIndex) && shuffleHistory.length > 0) {
                    currentSongIndex = shuffleHistory.pop();
                }
                const previousSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
                const songTitle = currentSectionButtons[currentSongIndex].parentElement.querySelector('.song-title').innerText;
                playbackPosition = 0;
                playAudio(previousSong, songTitle, currentSection);
            } else {
                showMessage('No previous songs');
            }
        } else {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = currentSectionButtons.length - 1;
            }
            while (attemptedSongs.has(currentSongIndex) && currentSongIndex >= 0) {
                currentSongIndex--;
                if (currentSongIndex < 0) currentSongIndex = currentSectionButtons.length - 1;
            }
            const previousSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
            const songTitle = currentSectionButtons[currentSongIndex].parentElement.querySelector('.song-title').innerText;
            playbackPosition = 0;
            playAudio(previousSong, songTitle, currentSection);
        }
    }

    function playNextSong() {
        if (isShuffleMode) {
            if (currentSongIndex >= 0) {
                shuffleHistory.push(currentSongIndex);
                playedSongs.add(currentSongIndex);
            }
            if (shuffleQueue.length === 0) {
                if (playedSongs.size >= currentSectionButtons.length - attemptedSongs.size) {
                    resetShuffleQueue();
                } else {
                    shuffleQueue = Array.from({length: currentSectionButtons.length}, (_, i) => i)
                        .filter(i => !playedSongs.has(i) && i !== currentSongIndex && !attemptedSongs.has(i));
                    shuffleArray(shuffleQueue);
                }
            }
            if (shuffleQueue.length === 0) {
                pauseAudio();
                showMessage('No more playable songs');
                return;
            }
            currentSongIndex = shuffleQueue.shift();
        } else {
            currentSongIndex++;
            if (currentSongIndex >= currentSectionButtons.length) {
                currentSongIndex = 0;
                if (!isRepeating) {
                    pauseAudio();
                    attemptedSongs.clear();
                    showMessage('Reached end of playlist');
                    return;
                }
            }
            while (attemptedSongs.has(currentSongIndex) && currentSongIndex < currentSectionButtons.length) {
                currentSongIndex++;
                if (currentSongIndex >= currentSectionButtons.length) {
                    currentSongIndex = 0;
                    if (!isRepeating) {
                        pauseAudio();
                        attemptedSongs.clear();
                        showMessage('No more playable songs');
                        return;
                    }
                }
            }
        }
        const nextSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
        const songTitle = currentSectionButtons[currentSongIndex].parentElement.querySelector('.song-title').innerText;
        playbackPosition = 0;
        if (nextSongPreloaded && nextSongPreloaded.index === currentSongIndex && nextSongPreloaded.src === nextSong) {
            audioPlayer.src = preloadPlayer.src;
            playAudio(nextSong, songTitle, currentSection, 0);
        } else {
            playAudio(nextSong, songTitle, currentSection, 0);
        }
    }

    function skipToNextPlayableSong() {
        if (attemptedSongs.size >= currentSectionButtons.length) {
            pauseAudio();
            attemptedSongs.clear();
            showMessage('No more playable songs in this section');
            return;
        }
        playNextSong();
    }

    function highlightCurrentSong() {
        const currentSrc = audioPlayer.src ? new URL(audioPlayer.src, window.location.href).href : '<span class="material-symbols-outlined"></span>';
        console.log('Highlighting - Current playing src:', currentSrc);

        const allSongItems = document.querySelectorAll('.page #song-list li');
        console.log(`Found ${allSongItems.length} song items to check`);

        allSongItems.forEach(item => {
            const songSrc = item.getAttribute('data-src');
            const absoluteSongSrc = songSrc ? new URL(songSrc, window.location.href).href : '<span class="material-symbols-outlined"></span>';
            const songTitle = item.querySelector('.song-title');
            const playIcon = item.querySelector('.play-button');
            const isCurrentSong = currentSrc && absoluteSongSrc === currentSrc;

            console.log(`Checking: ${absoluteSongSrc} === ${currentSrc} -> ${isCurrentSong}`);

            item.classList.toggle('playing', isCurrentSong);
            if (songTitle) {
                songTitle.classList.toggle('highlighted', isCurrentSong);
                playIcon.innerHTML = isCurrentSong && isPlaying 
                    ? '<span class="material-symbols-outlined"></span>' 
                    : '<i class="fa-solid fa-play"></i>';
                playIcon.className = 'play-button'; // Ensure consistent class
            }
        });
    }

    function updateAllPlayButtons() {
        popup.querySelectorAll('.play-button').forEach(btn => {
            const songTitle = btn.parentElement.querySelector('span').textContent;
            btn.innerHTML = songTitle === currentSongDetails.textContent && isPlaying 
                ? '<span class="material-symbols-outlined"></span>' 
                : '<i class="fa-solid fa-play"></i>';
            btn.className = 'play-button';
        });
        document.querySelectorAll('#song-list .play-button').forEach(btn => {
            const songTitle = btn.parentElement.querySelector('.song-title').innerText;
            btn.innerHTML = songTitle === currentSongDetails.textContent && isPlaying 
                ? '<span class="material-symbols-outlined"></span>' 
                : '<i class="fa-solid fa-play"></i>';
            btn.className = 'play-button';
        });
        if (playPauseBtn) {
            playPauseBtn.innerHTML = isPlaying 
                ? '<i class="fa-solid fa-pause"></i>' 
                : '<i class="fa-solid fa-play"></i>';
        }
    }

    function toggleRepeat() {
        isRepeating = !isRepeating;
        resetShuffleQueue(); // Rebuild queue to exclude attempted songs
        repeatBtn.classList.toggle('active', isRepeating);
        repeatBtn.setAttribute('title', isRepeating ? 'Repeat On' : 'Repeat Off');
        preloadNextSong();
    }

    function setVolume(value) {
        if (isMuted && value > 0) {
            toggleMute(); // Unmute if slider is moved above 0
        }
        audioPlayer.volume = value / 100;
        previousVolume = value / 100;
        localStorage.setItem('previousVolume', previousVolume);
        if (volumeSlider) {
            volumeSlider.value = value;
        }
    }

    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
            volumeToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            const restoreVolume = previousVolume > 0 ? previousVolume : initialVolume;
            audioPlayer.volume = restoreVolume;
            volumeSlider.value = restoreVolume * 100;
            volumeToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
        localStorage.setItem('isMuted', isMuted);
        localStorage.setItem('previousVolume', previousVolume);
    }

    // Event Listener for Volume Toggle
    if (volumeToggleBtn) {
        volumeToggleBtn.addEventListener('click', toggleMute);
    } else {
        console.warn('Volume toggle button (#volume-toggle-btn) not found');
    }

    // Playlist Functions
    function openAddToPlaylistPopup(song) {
        console.log('Opening add-to-playlist popup with song:', song);
        currentSongToAdd = { ...song };
        playlistOptions.innerHTML = '';
        Object.keys(playlists).forEach(playlistName => {
            const li = document.createElement('li');
            li.textContent = playlistName;
            li.addEventListener('click', () => {
                addToPlaylist(playlistName, currentSongToAdd);
                closeAddToPlaylistPopup();
            });
            playlistOptions.appendChild(li);
        });
        addToPlaylistOverlay.style.display = 'block';
    }

    window.closeAddToPlaylistPopup = function() {
        addToPlaylistOverlay.style.display = 'none';
        currentSongToAdd = null;
    };

    function addToPlaylist(playlistName, song) {
        console.log('Adding to playlist:', playlistName, 'song:', song);
        if (!song || !song.title || !song.src) {
            console.error('Invalid song data:', song);
            return;
        }
        const songData = {
            title: song.title,
            src: song.src,
            section: song.section
        };
        if (!playlists[playlistName]) {
            playlists[playlistName] = [];
        }
        if (!playlists[playlistName].some(item => item.src === song.src)) {
            playlists[playlistName].push(songData);
            localStorage.setItem('playlists', JSON.stringify(playlists));
            console.log(`Added to playlist "${playlistName}": ${songData.title}`, playlists);
            showMessage(`Added "${songData.title}" to ${playlistName}`);
            updatePlaylistUI();
        } else {
            console.log(`${songData.title} is already in the playlist "${playlistName}"`);
            showMessage(`"${songData.title}" is already in ${playlistName}`);
        }
    }

    function removeFromPlaylist(playlistName, index) {
        const removedSong = playlists[playlistName][index];
        playlists[playlistName].splice(index, 1);
        if (playlists[playlistName].length === 0) {
            delete playlists[playlistName];
        }
        localStorage.setItem('playlists', JSON.stringify(playlists));
        console.log(`Removed from playlist "${playlistName}": ${removedSong.title}`, playlists);
        showMessage(`Removed "${removedSong.title}" from ${playlistName}`);
        updatePlaylistUI();
    }

    function updatePlaylistUI() {
        if (playlistContainer) {
            playlistContainer.innerHTML = '';
            Object.keys(playlists).forEach(playlistName => {
                const li = document.createElement('li');
                li.className = 'playlist-item';
                li.textContent = playlistName;
                li.addEventListener('click', () => {
                    openSongsPopup(playlistName);
                });
                playlistContainer.appendChild(li);
            });
        } else {
            console.warn('Playlist container (#playlist-list) not found in DOM');
        }
    }

    function openSongsPopup(playlistName) {
        songsPopupTitle.textContent = playlistName;
        songsPopupList.innerHTML = '';
        const songs = playlists[playlistName] || [];
        songs.forEach((song, index) => {
            console.log(`Rendering song in ${playlistName}: ${song.title}`);
            const li = document.createElement('li');
            li.className = 'playlist-item';
            li.innerHTML = `
                <span>${song.title}</span>
                <i class="fa-solid fa-play playlist-play-button"></i>
                <i class="fa-solid fa-times remove-from-playlist" style="color: red;"></i>
            `;
            li.setAttribute('data-src', song.src);
            const playButton = li.querySelector('.playlist-play-button');
            playButton.addEventListener('click', () => {
                playAudio(song.src, song.title, song.section);
            });
            const removeButton = li.querySelector('.remove-from-playlist');
            removeButton.addEventListener('click', () => {
                removeFromPlaylist(playlistName, index);
                openSongsPopup(playlistName);
            });
            songsPopupList.appendChild(li);
        });
        songsPopupOverlay.style.display = 'block';
    }

    window.closeSongsPopup = function() {
        songsPopupOverlay.style.display = 'none';
    };

    // Search Functionality
    function performSearch() {
        const searchTerm = searchBar.value.toLowerCase().trim();
        console.log('Search term:', searchTerm);
        songList = getAllSongs();
        console.log('songList in performSearch:', songList);
        popup.innerHTML = '';

        if (searchTerm === '') {
            popup.classList.remove('active');
            console.log('Search cleared, popup hidden');
            return;
        }

        const matches = songList.filter(song => song.title.toLowerCase().includes(searchTerm));
        console.log('Search matches:', matches);

        const uniqueTitles = new Set();
        const uniqueMatches = matches.filter(song => {
            if (uniqueTitles.has(song.title)) return false;
            uniqueTitles.add(song.title);
            return true;
        });

        if (uniqueMatches.length > 0) {
            uniqueMatches.forEach(song => {
                console.log('Processing search result:', song);
                const songDiv = document.createElement('div');
                songDiv.className = 'popup-song';
                songDiv.innerHTML = `
                    <span>${song.title}</span>
                    <i class="fa-solid fa-play play-button"></i>
                    <i class="fa-brands fa-golang scroll-to-song"></i>
                `;
                popup.appendChild(songDiv);

                const playButton = songDiv.querySelector('.play-button');
                playButton.addEventListener('click', () => {
                    console.log(`Clicked to play: ${song.title} from ${song.section}`);
                    updateSectionButtons(song.section);
                    const sectionSongs = songList.filter(s => s.section === song.section);
                    currentSongIndex = sectionSongs.findIndex(s => s.src === song.src && s.title === song.title);
                    if (currentSongIndex === -1) {
                        console.error(`Song ${song.title} not found in section ${song.section}`);
                        return;
                    }
                    const isSameSong = audioPlayer.src === new URL(song.src, window.location.href).href;
                    playAudio(song.src, song.title, song.section, isSameSong ? audioPlayer.currentTime : 0);
                });

                const scrollButton = songDiv.querySelector('.scroll-to-song');
                scrollButton.addEventListener('click', () => {
                    console.log(`Scrolling to song: ${song.title} with src: ${song.src}`);
                    const songItem = Array.from(document.querySelectorAll('#song-list li')).find(li => {
                        const liSrc = li.getAttribute('data-src');
                        const liTitle = li.querySelector('.song-title')?.innerText.trim();
                        return liSrc === song.src && liTitle === song.title;
                    });
                    if (songItem) {
                        songItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        songItem.classList.add('highlight');
                        setTimeout(() => songItem.classList.remove('highlight'), 15000);
                    } else {
                        console.error(`Song ${song.title} not found in #song-list`);
                        showMessage(`Song "${song.title}" not found in list`);
                    }
                });
            });
            popup.classList.add('active');
            console.log('Popup shown with', uniqueMatches.length, 'results');
            updateAllPlayButtons();
            highlightCurrentSong();
        } else {
            popup.classList.remove('active');
            console.log('No matches found, popup hidden');
        }
    }

    // Event Listeners
    audioPlayer.addEventListener('error', e => {
        console.error('Error with audio playback:', e);
        showMessage('Song skipped due to error');
        skipToNextPlayableSong();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;
            if (Math.floor(audioPlayer.currentTime) % 5 === 0) {
                localStorage.setItem('playbackPosition', audioPlayer.currentTime);
            }
        }
    });

    audioPlayer.addEventListener('ended', () => {
        if (isRepeating) {
            playAudioFromPosition(audioPlayer.src, 0, currentSongDetails.textContent, currentSection);
        } else {
            playNextSong();
        }
    });

    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
    if (previousBtn) previousBtn.addEventListener('click', playPreviousSong);
    if (nextBtn) nextBtn.addEventListener('click', playNextSong);
    if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeat);
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            isShuffleMode = !isShuffleMode;
            shuffleBtn.classList.toggle('active-shuffle');
            if (isShuffleMode) {
                resetShuffleQueue();
            } else {
                shuffleQueue = [];
                shuffleHistory = [];
                playedSongs.clear();
            }
            preloadNextSong();
        });
    }
    if (volumeSlider) {
        volumeSlider.addEventListener('input', e => setVolume(e.target.value));
    } else {
        console.error('Volume slider element (#volume-slider) not found');
    }
    if (searchBar) {
        searchBar.addEventListener('input', () => {
            console.log('Search input triggered');
            performSearch();
        });
    } else {
        console.error('Search bar element (#search-bar) not found');
    }
    if (popup) {
        document.addEventListener('click', e => {
            if (!popup.contains(e.target) && e.target !== searchBar) {
                popup.classList.remove('active');
                console.log('Popup hidden by outside click');
            }
        });
    } else {
        console.error('Search popup element (#search-popup) not found');
    }

    if (progressBarContainer) {
        progressBarContainer.addEventListener('click', e => {
            const rect = progressBarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
        });

        let isDragging = false;
        progressBarContainer.addEventListener('mousedown', e => {
            isDragging = true;
            const rect = progressBarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
        });

        document.addEventListener('mousemove', e => {
            if (isDragging) {
                const rect = progressBarContainer.getBoundingClientRect();
                const moveX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                audioPlayer.currentTime = (moveX / rect.width) * audioPlayer.duration;
            }
        });

        document.addEventListener('mouseup', () => isDragging = false);

        progressBarContainer.addEventListener('touchstart', e => {
            const touch = e.touches[0];
            const rect = progressBarContainer.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            audioPlayer.currentTime = (touchX / rect.width) * audioPlayer.duration;
        });
    }

    // Page Navigation
    window.showPage = function(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        document.querySelector(`button[onclick="showPage('${pageId}')"]`).classList.add('active');
        document.dispatchEvent(new CustomEvent('updateSectionButtons', { detail: pageId }));
    };

    document.addEventListener('updateSectionButtons', e => {
        const scope = document.querySelector('script').getAttribute('data-scope');
        if (scope) {
            eval(scope + '.updateSectionButtons')(e.detail);
        } else {
            updateSectionButtons(e.detail);
        }
    });

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .control-button.active { 
            color: #007bff; 
            opacity: 1; 
        }
        .control-button { 
            opacity: 0.7; 
            color: #ffffff; 
        }
        .control-button:hover { 
            opacity: 1; 
        }
        .skip-message { 
            position: fixed; 
            bottom: 130px; 
            right: 10px; 
            background: rgba(0, 0, 0, 0.8); 
            color: #fff; 
            padding: 10px 20px; 
            border-radius: 5px; 
            opacity: 0; 
            transition: opacity 0.3s ease-in-out; 
            z-index: 1000; 
        }
        .skip-message.show { 
            opacity: 1; 
        }
        .popup-song { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 10px; 
            cursor: pointer; 
        }
        .popup-song.playing { 
            background: #f0f0f0; 
        }
        .song-title.highlighted { 
            font-weight: bold; 
            color: #1db954; 
        }
        #repeat-btn.active i {
            color:rgb(0, 55, 255); 
        }
        .divert {
            text-align: center;
            margin-top: 20px;
        }
        .divert button {
            padding: 10px 20px;
            background: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .divert button:hover {
            background: #0056b3;
        }
        #song-list li.highlight {
            border: none;
            transition: border 0.5s ease;
        }
        
        .play-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
        }
        #volume-toggle-btn {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
        #volume-toggle-btn:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener("DOMContentLoaded", () => {
    const customMenu = document.querySelector(".custom-menu");

    // Show custom menu on right-click
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        customMenu.style.display = "block";
        customMenu.style.top = `${event.pageY}px`;
        customMenu.style.left = `${event.pageX}px`;
    });

    // Hide the menu when clicking elsewhere
    document.addEventListener("click", () => {
        customMenu.style.display = "none";
    });
});
