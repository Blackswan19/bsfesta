document.addEventListener('DOMContentLoaded', () => {
    // Cached DOM Elements
    const elements = {
        searchBar: document.getElementById('search-bar'),
        popup: document.getElementById('search-popup'),
        progressBarContainer: document.getElementById('progress-bar'),
        progressBar: document.querySelector('#progress-bar .progress'),
        previousBtn: document.getElementById('previous-btn'),
        nextBtn: document.getElementById('next-btn'),
        playPauseBtn: document.getElementById('play-pause-btn'),
        currentSongDetails: document.getElementById('current-song-details'),
        repeatBtn: document.getElementById('repeat-btn'),
        shuffleBtn: document.querySelector('.fa-shuffle'),
        volumeSlider: document.getElementById('volume-slider'),
        volumeToggleBtn: document.getElementById('volume-toggle-btn'),
        playlistContainer: document.getElementById('playlist-list'),
        addToPlaylistOverlay: document.getElementById('add-to-playlist-overlay'),
        playlistOptions: document.getElementById('playlist-options'),
        songsPopupOverlay: document.getElementById('songs-popup-overlay'),
        songsPopupTitle: document.getElementById('songs-popup-title'),
        songsPopupList: document.getElementById('songs-popup-list'),
        queueBtn: document.getElementById('queue-btn'),
        queuePopupOverlay: document.getElementById('queue-popup-overlay'),
        queuePopupList: document.getElementById('queue-popup-list'),
    };

    // Audio and State
    const audioPlayer = new Audio();
    const preloadPlayer = new Audio();
    let currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;
    let playbackPosition = parseFloat(localStorage.getItem('playbackPosition')) || 0;
    let isPlaying = false;
    let isRepeating = false;
    let isShuffleMode = false;
    let isMuted = false;
    let previousVolume = parseFloat(localStorage.getItem('previousVolume')) || 0.2;
    let currentSection = localStorage.getItem('currentSection') || 'allin';
    let currentSectionButtons = [];
    let shuffleHistory = [];
    let lastPlayedSong = localStorage.getItem('lastPlayedSong') || null;
    let songList = [];
    let originalSongList = [];
    let attemptedSongs = new Set();
    let playlists = JSON.parse(localStorage.getItem('playlists')) || { Favorites: [] };
    let currentSongToAdd = null;
    const initialVolume = 0.2;
    let nextSongPreloaded = null;
    let playbackQueue = [];

    audioPlayer.volume = initialVolume;
    preloadPlayer.volume = 0;
    audioPlayer.pause();

    // Initialize Volume
    if (elements.volumeSlider) {
        elements.volumeSlider.value = initialVolume * 100;
        elements.volumeToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }

    // Wake Lock
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').then(() => {
            console.log('Screen Wake Lock active');
        }).catch(err => console.error('Wake Lock error:', err));
    }

    // Loading Screen
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        const playerInterface = document.getElementById('player-interface');
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (playerInterface) playerInterface.style.display = 'block';
    }, 1000);

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initialize Song List
    function initializeSongList() {
        songList = Array.from(document.querySelectorAll('.page #song-list li'))
            .map(li => ({
                title: li.querySelector('.song-title')?.innerText.trim() || 'Untitled Song',
                src: li.getAttribute('data-src'),
                section: li.closest('.page')?.id || currentSection
            }))
            .filter(song => song.src);
        originalSongList = [...songList];
        console.log('Songs initialized:', songList.length);
    }
    initializeSongList();

    // Song List Management
    const getAllSongs = () => {
        return songList;
    };

    function updateSectionButtons(sectionId) {
        currentSection = sectionId;
        currentSectionButtons = Array.from(document.querySelectorAll(`#${sectionId} .play-button`));
        console.log(`Section set to ${sectionId} with ${currentSectionButtons.length} songs`);
        localStorage.setItem('currentSection', sectionId);
        resetPlaybackQueue();
        if (isPlaying && audioPlayer.src) {
            const currentSrc = new URL(audioPlayer.src, window.location.href).href;
            const currentSongInSection = currentSectionButtons.findIndex(button =>
                new URL(button.parentElement.getAttribute('data-src'), window.location.href).href === currentSrc
            );
            if (currentSongInSection === -1) {
                audioPlayer.pause();
                currentSongIndex = 0;
            } else {
                currentSongIndex = currentSongInSection;
                playbackQueue.unshift(currentSongIndex);
            }
        } else {
            currentSongIndex = 0;
        }
        updateQueueUI();
        preloadNextSong();
    }
 setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.getElementById('player-interface').style.display = 'block';
    }, 1500);
    function resetPlaybackQueue() {
        playbackQueue = Array.from({ length: currentSectionButtons.length }, (_, i) => i)
            .filter(i => !attemptedSongs.has(i));
        if (isShuffleMode) {
            shuffleArray(playbackQueue);
            if (currentSongIndex >= 0 && playbackQueue.includes(currentSongIndex)) {
                playbackQueue = playbackQueue.filter(i => i !== currentSongIndex);
                playbackQueue.unshift(currentSongIndex);
            }
        }
        console.log(`Playback queue reset with ${playbackQueue.length} songs, shuffle: ${isShuffleMode}`);
        updateQueueUI();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function updatePlayButtonListeners() {
        const allPlayButtons = document.querySelectorAll('.play-button');
        allPlayButtons.forEach(button => {
            button.removeEventListener('click', handlePlayButtonClick);
            button.addEventListener('click', handlePlayButtonClick);
        });
    }

    function updateAddToPlaylistListeners() {
        const addButtons = document.querySelectorAll('#song-list .add-to-playlist');
        addButtons.forEach(button => {
            button.removeEventListener('click', handleAddToPlaylistClick);
            button.addEventListener('click', handleAddToPlayListClick);
        });
    }

    // Event Delegation for Play and Playlist Buttons
    function setupEventDelegation() {
        document.addEventListener('click', e => {
            const playButton = e.target.closest('.play-button');
            if (playButton) {
                handlePlayButtonClick.call(playButton, e);
            }
            const addToPlaylist = e.target.closest('.add-to-playlist');
            if (addToPlaylist) {
                handleAddToPlaylistClick.call(addToPlaylist, e);
            }
        });
    }
    setupEventDelegation();

    function handlePlayButtonClick(e) {
        const sectionElement = this.closest('.page');
        if (!sectionElement) return;
        const newSectionId = sectionElement.id;
        updateSectionButtons(newSectionId);
        const sectionIndex = currentSectionButtons.indexOf(this);
        if (sectionIndex === -1) return;
        const songSrc = currentSectionButtons[sectionIndex].parentElement.getAttribute('data-src');
        const songTitle = currentSectionButtons[sectionIndex].parentElement.querySelector('.song-title').innerText;
        
        if (isPlaying && currentSongIndex === sectionIndex && newSectionId === currentSection) {
            pauseAudio();
        } else {
            currentSongIndex = sectionIndex;
            playbackQueue = playbackQueue.filter(i => i !== sectionIndex);
            playbackQueue.unshift(sectionIndex);
            if (isShuffleMode) {
                shuffleArray(playbackQueue.slice(1));
                playbackQueue = [sectionIndex, ...playbackQueue.slice(1)];
            }
            const isSameSong = audioPlayer.src === new URL(songSrc, window.location.href).href;
            playAudio(songSrc, songTitle, newSectionId, isSameSong ? audioPlayer.currentTime : 0);
            updateQueueUI();
        }
    }

    function handleAddToPlaylistClick(e) {
        const li = this.closest('li');
        const songTitle = li.querySelector('.song-title')?.innerText.trim() || 'Untitled Song';
        const song = {
            title: songTitle,
            src: li.getAttribute('data-src'),
            section: li.closest('.page')?.id || currentSection
        };
        console.log('Opening add-to-playlistHollywood popup:', song);
        openAddToPlaylistPopup(song);
    }

    // Preload Next Song
    function preloadNextSong() {
        const nextIndex = playbackQueue[0] ?? -1;
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
    updatePlaylistUI();
    resetPlaybackQueue();

    if (lastPlayedSong && playbackPosition > 0) {
        const songIndex = currentSectionButtons.findIndex(button => 
            button.parentElement.getAttribute('data-src') === lastPlayedSong
        );
        if (songIndex !== -1) {
            currentSongIndex = songIndex;
            audioPlayer.src = lastPlayedSong;
            audioPlayer.currentTime = playbackPosition;
            audioPlayer.play().then(() => {
                isPlaying = true;
                elements.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                highlightCurrentSong();
                updateAllPlayButtons();
                playbackQueue = playbackQueue.filter(i => i !== songIndex);
                playbackQueue.unshift(songIndex);
                updateQueueUI();
                preloadNextSong();
            }).catch(error => {
                console.error('Error resuming song:', error);
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
        localStorage.setItem('lastPlayedSong', audioSrc);

        try {
            const playPromise = audioPlayer.play();
            const timeout = setTimeout(() => {
                if (!audioPlayer.currentTime > 0 && !audioPlayer.paused) {
                    console.error(`Song ${songTitle} failed to start`);
                    throw new Error('Playback didn’t start');
                }
            }, 500);

            await playPromise;
            clearTimeout(timeout);

            isPlaying = true;
            elements.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            elements.currentSongDetails.textContent = songTitle;
            currentSection = section;
            console.log(`Playing: ${songTitle} from ${audioSrc} at ${position}`);
            highlightCurrentSong();
            updateAllPlayButtons();
            localStorage.setItem('currentSongIndex', currentSongIndex);
            attemptedSongs.delete(currentSongIndex);
            updateQueueUI();
            preloadNextSong();
        } catch (error) {
            console.error(`Error playing song ${currentSongIndex}:`, error);
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
        elements.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playbackPosition = audioPlayer.currentTime;
        localStorage.setItem('playbackPosition', playbackPosition);
        console.log(`Paused at: ${playbackPosition}`);
        highlightCurrentSong();
        updateAllPlayButtons();
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseAudio();
        } else if (audioPlayer.src) {
            audioPlayer.play().then(() => {
                isPlaying = true;
                elements.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                highlightCurrentSong();
                updateAllPlayButtons();
                preloadNextSong();
            }).catch(error => {
                console.error('Error resuming:', error);
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
        if (playbackQueue.length > 0) {
            currentSongIndex = playbackQueue[0];
            const songSrc = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
            const songTitle = currentSectionButtons[currentSongIndex].parentElement.querySelector('.song-title').innerText;
            playAudio(songSrc, songTitle, currentSection);
        }
    }

    function playPreviousSong() {
        if (isShuffleMode) {
            if (shuffleHistory.length > 0) {
                if (currentSongIndex >= 0) {
                    playbackQueue.unshift(currentSongIndex);
                }
                currentSongIndex = shuffleHistory.pop();
                playbackQueue = playbackQueue.filter(i => i !== currentSongIndex);
                playbackQueue.unshift(currentSongIndex);
                const previousSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
                const songTitle = elements.currentSongDetails.innerText;
                playbackPosition = 0;
                playAudio(previousSong, songTitle, currentSection);
                updateQueueUI();
            } else {
                showMessage('No previous songs');
            }
        } else {
            const currentQueueIndex = playbackQueue.indexOf(currentSongIndex);
            if (currentQueueIndex > 0) {
                currentSongIndex = playbackQueue[currentQueueIndex - 1];
                const previousSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
                const songTitle = elements.currentSongDetails.innerText;
                playbackPosition = 0;
                playAudio(previousSong, songTitle, currentSection);
                updateQueueUI();
            } else {
                showMessage('No previous songs in queue');
            }
        }
    }

    function playNextSong() {
        if (currentSongIndex >= 0) {
            shuffleHistory.push(currentSongIndex);
        }
        playbackQueue.shift();
        if (playbackQueue.length === 0) {
            if (isRepeating) {
                resetPlaybackQueue();
                currentSongIndex = playbackQueue[0];
            } else {
                pauseAudio();
                showMessage('Reached end of queue');
                return;
            }
        } else {
            currentSongIndex = playbackQueue[0];
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
        updateQueueUI();
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
        const currentSrc = audioPlayer.src ? new URL(audioPlayer.src, window.location.href).href : null;
        console.log('Highlighting - Current src:', currentSrc);

        document.querySelectorAll('.page #song-list li').forEach(item => {
            const songSrc = item.getAttribute('data-src');
            const absoluteSongSrc = songSrc ? new URL(songSrc, window.location.href).href : null;
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
                playIcon.className = 'play-button';
            }
        });
    }

    function updateAllPlayButtons() {
        const currentTitle = elements.currentSongDetails.textContent;
        elements.popup.querySelectorAll('.play-button').forEach(btn => {
            const songTitle = btn.parentElement.querySelector('span').textContent;
            btn.innerHTML = songTitle === currentTitle && isPlaying 
                ? '<span class="material-symbols-outlined"></span>' 
                : '<i class="fa-solid fa-play"></i>';
            btn.className = 'play-button';
        });
        document.querySelectorAll('#song-list .play-button').forEach(btn => {
            const songTitle = btn.parentElement.querySelector('.song-title').innerText;
            btn.innerHTML = songTitle === currentTitle && isPlaying 
                ? '<span class="material-symbols-outlined"></span>' 
                : '<i class="fa-solid fa-play"></i>';
            btn.className = 'play-button';
        });
        elements.playPauseBtn.innerHTML = isPlaying 
            ? '<i class="fa-solid fa-pause"></i>' 
            : '<i class="fa-solid fa-play"></i>';
    }

    function toggleRepeat() {
        isRepeating = !isRepeating;
        elements.repeatBtn.classList.toggle('active', isRepeating);
        elements.repeatBtn.setAttribute('title', isRepeating ? 'Repeat On' : 'Repeat Off');
        preloadNextSong();
    }

    function setVolume(value) {
        if (isMuted && value > 0) {
            toggleMute();
        }
        audioPlayer.volume = value / 100;
        previousVolume = value / 100;
        localStorage.setItem('previousVolume', previousVolume);
        elements.volumeSlider.value = value;
    }

    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            audioPlayer.volume = 0;
            elements.volumeSlider.value = 0;
            elements.volumeToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            const restoreVolume = previousVolume > 0 ? previousVolume : initialVolume;
            audioPlayer.volume = restoreVolume;
            elements.volumeSlider.value = restoreVolume * 100;
            elements.volumeToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
        localStorage.setItem('isMuted', isMuted);
        localStorage.setItem('previousVolume', previousVolume);
    }

    // Queue Management
    function openQueuePopup() {
        updateQueueUI();
        elements.queuePopupOverlay.style.display = 'block';
    }

    window.closeQueuePopup = function() {
        elements.queuePopupOverlay.style.display = 'none';
    };

    function updateQueueUI() {
        if (!elements.queuePopupList) return;
        elements.queuePopupList.innerHTML = '';
        playbackQueue.forEach((index, queueIndex) => {
            const song = currentSectionButtons[index].parentElement;
            const songTitle = song.querySelector('.song-title').innerText;
            const li = document.createElement('li');
            li.className = `queue-item${index === currentSongIndex ? ' playing' : ''}`;
            li.setAttribute('draggable', 'true');
            li.setAttribute('data-queue-index', queueIndex);
            li.innerHTML = `
                <span>${songTitle}</span>
                <button class="queue-play-now"><i class="fa-solid fa-play"></i></button>
                <button class="queue-remove"><i class="fa-solid fa-times"></i></button>
            `;
            li.querySelector('.queue-play-now').addEventListener('click', () => {
                currentSongIndex = index;
                playbackQueue.splice(queueIndex, 1);
                playbackQueue.unshift(index);
                if (isShuffleMode) {
                    shuffleArray(playbackQueue.slice(1));
                    playbackQueue = [index, ...playbackQueue.slice(1)];
                }
                const songSrc = song.getAttribute('data-src');
                playAudio(songSrc, songTitle, currentSection, 0);
                updateQueueUI();
            });
            li.querySelector('.queue-remove').addEventListener('click', () => {
                playbackQueue.splice(queueIndex, 1);
                updateQueueUI();
                preloadNextSong();
            });

            // Drag-and-Drop
            li.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', queueIndex);
                li.classList.add('dragging');
            });
            li.addEventListener('dragend', () => li.classList.remove('dragging'));
            li.addEventListener('dragover', e => e.preventDefault());
            li.addEventListener('drop', e => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                if (fromIndex !== queueIndex) {
                    const [movedItem] = playbackQueue.splice(fromIndex, 1);
                    playbackQueue.splice(queueIndex, 0, movedItem);
                    updateQueueUI();
                    preloadNextSong();
                }
            });

            elements.queuePopupList.appendChild(li);
        });

        elements.queuePopupList.addEventListener('dragover', e => e.preventDefault());
        elements.queuePopupList.addEventListener('drop', e => {
            e.preventDefault();
            const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const toIndex = playbackQueue.length;
            if (fromIndex !== toIndex) {
                const [movedItem] = playbackQueue.splice(fromIndex, 1);
                playbackQueue.splice(toIndex, 0, movedItem);
                updateQueueUI();
                preloadNextSong();
            }
        });
    }

    // Playlist Functions
    function openAddToPlaylistPopup(song) {
        console.log('Opening add-to-playlist popup:', song);
        currentSongToAdd = { ...song };
        elements.playlistOptions.innerHTML = '';
        Object.keys(playlists).forEach(playlistName => {
            const li = document.createElement('li');
            li.textContent = playlistName;
            li.addEventListener('click', () => {
                addToPlaylist(playlistName, currentSongToAdd);
                closeAddToPlaylistPopup();
            });
            elements.playlistOptions.appendChild(li);
        });
        elements.addToPlaylistOverlay.style.display = 'block';
    }

    window.closeAddToPlaylistPopup = function() {
        elements.addToPlaylistOverlay.style.display = 'none';
        currentSongToAdd = null;
    };

    function addToPlaylist(playlistName, song) {
        console.log('Adding to playlist:', playlistName, 'song:', song);
        if (!song?.title || !song.src) {
            console.error('Invalid song:', song);
            return;
        }
        const songData = { title: song.title, src: song.src, section: song.section };
        if (!playlists[playlistName]) playlists[playlistName] = [];
        if (!playlists[playlistName].some(item => item.src === song.src)) {
            playlists[playlistName].push(songData);
            localStorage.setItem('playlists', JSON.stringify(playlists));
            console.log(`Added to "${playlistName}": ${songData.title}`);
            showMessage(`Added "${songData.title}" to ${playlistName}`);
            updatePlaylistUI();
        } else {
            console.log(`${songData.title} already in "${playlistName}"`);
            showMessage(`"${songData.title}" already in ${playlistName}`);
        }
    }

    function removeFromPlaylist(playlistName, index) {
        const removedSong = playlists[playlistName][index];
        playlists[playlistName].splice(index, 1);
        if (playlists[playlistName].length === 0) {
            delete playlists[playlistName];
        }
        localStorage.setItem('playlists', JSON.stringify(playlists));
        console.log(`Removed from "${playlistName}": ${removedSong.title}`);
        showMessage(`Removed "${removedSong.title}" from ${playlistName}`);
        updatePlaylistUI();
    }

    function updatePlaylistUI() {
        if (!elements.playlistContainer) {
            console.warn('Playlist container (#playlist-list) not found');
            return;
        }
        elements.playlistContainer.innerHTML = '';
        Object.keys(playlists).forEach(playlistName => {
            const li = document.createElement('li');
            li.className = 'playlist-item';
            li.textContent = playlistName;
            li.addEventListener('click', () => openSongsPopup(playlistName));
            elements.playlistContainer.appendChild(li);
        });
    }

    function openSongsPopup(playlistName) {
        elements.songsPopupTitle.textContent = playlistName;
        elements.songsPopupList.innerHTML = '';
        (playlists[playlistName] || []).forEach((song, index) => {
            console.log(`Rendering song in ${playlistName}: ${song.title}`);
            const li = document.createElement('li');
            li.className = 'playlist-item';
            li.innerHTML = `
                <span>${song.title}</span>
                <i class="fa-solid fa-play playlist-play-button"></i>
                <i class="fa-solid fa-times remove-from-playlist" style="color: red;"></i>
            `;
            li.setAttribute('data-src', song.src);
            li.querySelector('.playlist-play-button').addEventListener('click', () => {
                playAudio(song.src, song.title, song.section);
            });
            li.querySelector('.remove-from-playlist').addEventListener('click', () => {
                removeFromPlaylist(playlistName, index);
                openSongsPopup(playlistName);
            });
            elements.songsPopupList.appendChild(li);
        });
        elements.songsPopupOverlay.style.display = 'block';
    }

    window.closeSongsPopup = function() {
        elements.songsPopupOverlay.style.display = 'none';
    };

    // Search Functionality
    function debounce(fn, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    function performSearch() {
        const searchTerm = elements.searchBar.value.toLowerCase().trim();
        console.log('Search term:', searchTerm);
        elements.popup.innerHTML = '';

        if (!searchTerm) {
            elements.popup.classList.remove('active');
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
                elements.popup.appendChild(songDiv);

                songDiv.querySelector('.play-button').addEventListener('click', () => {
                    console.log(`Playing: ${song.title} from ${song.section}`);
                    updateSectionButtons(song.section);
                    const sectionSongs = songList.filter(s => s.section === song.section);
                    currentSongIndex = sectionSongs.findIndex(s => s.src === song.src && s.title === song.title);
                    if (currentSongIndex === -1) {
                        console.error(`Song ${song.title} not found in ${song.section}`);
                        return;
                    }
                    playbackQueue = playbackQueue.filter(i => i !== currentSongIndex);
                    playbackQueue.unshift(currentSongIndex);
                    if (isShuffleMode) {
                        shuffleArray(playbackQueue.slice(1));
                        playbackQueue = [currentSongIndex, ...playbackQueue.slice(1)];
                    }
                    const isSameSong = audioPlayer.src === new URL(song.src, window.location.href).href;
                    playAudio(song.src, song.title, song.section, isSameSong ? audioPlayer.currentTime : 0);
                    updateQueueUI();
                });

                songDiv.querySelector('.scroll-to-song').addEventListener('click', () => {
                    console.log(`Scrolling to: ${song.title} with src: ${song.src}`);
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
                        showMessage(`Song "${song.title}" not found`);
                    }
                });
            });
            elements.popup.classList.add('active');
            console.log('Popup shown with', uniqueMatches.length, 'results');
            updateAllPlayButtons();
            highlightCurrentSong();
        } else {
            elements.popup.classList.remove('active');
            console.log('No matches found, popup hidden');
        }
    }

    const debouncedSearch = debounce(performSearch, 300);

    // Event Listeners
    audioPlayer.addEventListener('error', e => {
        console.error('Audio playback error:', e);
        showMessage('Song skipped due to error');
        skipToNextPlayableSong();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            elements.progressBar.style.width = `${progress}%`;
            if (Math.floor(audioPlayer.currentTime) % 10 === 0) {
                localStorage.setItem('playbackPosition', audioPlayer.currentTime);
            }
        }
    });

    audioPlayer.addEventListener('ended', () => {
        if (isRepeating && !isShuffleMode) {
            playAudioFromPosition(audioPlayer.src, 0, elements.currentSongDetails.textContent, currentSection);
        } else {
            playNextSong();
        }
    });

    elements.playPauseBtn?.addEventListener('click', togglePlayPause);
    elements.previousBtn?.addEventListener('click', playPreviousSong);
    elements.nextBtn?.addEventListener('click', playNextSong);
    elements.repeatBtn?.addEventListener('click', toggleRepeat);
    elements.shuffleBtn?.addEventListener('click', () => {
        isShuffleMode = !isShuffleMode;
        elements.shuffleBtn.classList.toggle('active-shuffle');
        if (isShuffleMode) {
            shuffleArray(playbackQueue);
            if (currentSongIndex >= 0 && playbackQueue.includes(currentSongIndex)) {
                playbackQueue = playbackQueue.filter(i => i !== currentSongIndex);
                playbackQueue.unshift(currentSongIndex);
            }
            shuffleHistory = [];
        } else {
            resetPlaybackQueue();
            shuffleHistory = [];
        }
        updateQueueUI();
        preloadNextSong();
    });
    elements.volumeSlider?.addEventListener('input', e => setVolume(e.target.value));
    elements.searchBar?.addEventListener('input', debouncedSearch);
    document.addEventListener('click', e => {
        if (!elements.popup.contains(e.target) && e.target !== elements.searchBar) {
            elements.popup.classList.remove('active');
            console.log('Popup hidden by outside click');
        }
    });
    elements.queueBtn?.addEventListener('click', openQueuePopup);
    elements.volumeToggleBtn?.addEventListener('click', toggleMute);

    if (elements.progressBarContainer) {
        elements.progressBarContainer.addEventListener('click', e => {
            const rect = elements.progressBarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            audioPlayer.currentTime = (clickX / rect.width) * audioPlayer.duration;
        });

        let isDragging = false;
        elements.progressBarContainer.addEventListener('mousedown', e => {
            isDragging = true;
            const rect = elements.progressBarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            audioPlayer.currentTime = (clickX / rect.width) * audioPlayer.duration;
        });

        document.addEventListener('mousemove', e => {
            if (isDragging) {
                const rect = elements.progressBarContainer.getBoundingClientRect();
                const moveX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                audioPlayer.currentTime = (moveX / rect.width) * audioPlayer.duration;
            }
        });

        document.addEventListener('mouseup', () => isDragging = false);

        elements.progressBarContainer.addEventListener('touchstart', e => {
            const touch = e.touches[0];
            const rect = elements.progressBarContainer.getBoundingClientRect();
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
        .control-button.active { color: #007bff; opacity: 1; }
        .control-button { opacity: 0.7; color: #ffffff; }
        .control-button:hover { opacity: 1; }
        .skip-message { 
            position: fixed; bottom: 130px; right: 10px; 
            background: rgba(0, 0, 0, 0.8); color: #fff; 
            padding: 10px 20px; border-radius: 5px; 
            opacity: 0; transition: opacity 0.3s ease-in-out; 
            z-index: 1000; 
        }
        .skip-message.show { opacity: 1; }
        .popup-song { 
            display: flex; justify-content: space-between; 
            align-items: center; padding: 10px; cursor: pointer; 
        }
        .popup-song.playing { background: #f0f0f0; }
        .song-title.highlighted { font-weight: bold; color: #1db954; }
        #repeat-btn.active i, .active-shuffle { color: rgb(0, 55, 255); }
        .divert { text-align: center; margin-top: 20px; }
        .divert button { 
            padding: 10px 20px; background: #007bff; color: #fff; 
            border: none; border-radius: 5px; cursor: pointer; 
        }
        .divert button:hover { background: #0056b3; }
        #song-list li.highlight { border: none; transition: border 0.5s ease; }
        .play-button { 
            display: inline-flex; align-items: center; 
            justify-content: center; width: 24px; height: 24px; 
        }
        #volume-toggle-btn { 
            cursor: pointer; display: inline-flex; 
            align-items: center; justify-content: center; 
            width: 24px; height: 24px; margin-right: 50px; 
        }
        .queue-item { 
            display: flex; justify-content: space-between; 
            align-items: center; padding: 10px; 
            border-bottom: 1px solid #ddd; cursor: grab; 
        }
        .queue-item:active:focus { cursor: grabbing; }
        .queue-item.playing {  font-weight: bold; }
        .queue-item.dragging { opacity: 0.5; background: #f0f0f0; }
        .queue-item button { 
            background: none; border: none; 
            cursor: pointer; padding: 10px 15px;    margin-left: 24px;
        }
        .queue-item button:hover {background: #dcdcdc6d;
    }
    `;
    document.head.appendChild(style);
});

function hideQueuePopup() {
    document.getElementById('queue-popup-overlay').style.display = 'none';
}

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
