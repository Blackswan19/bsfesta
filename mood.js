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
    const autoplayPrompt = document.getElementById('autoplay-prompt');
    const songNameSpan = document.getElementById('song-name');

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
            volumeToggleBtn.innerHTML = '<svg height="24" class="fa-volume-high" viewBox="0 0 24 24" width="24"><path class="ytp-svg-fill ytp-svg-volume-animation-speaker" d="M 11.60 2.08 L 11.48 2.14 L 3.91 6.68 C 3.02 7.21 2.28 7.97 1.77 8.87 C 1.26 9.77 1.00 10.79 1 11.83 V 12.16 L 1.01 12.56 C 1.07 13.52 1.37 14.46 1.87 15.29 C 2.38 16.12 3.08 16.81 3.91 17.31 L 11.48 21.85 C 11.63 21.94 11.80 21.99 11.98 21.99 C 12.16 22.00 12.33 21.95 12.49 21.87 C 12.64 21.78 12.77 21.65 12.86 21.50 C 12.95 21.35 13 21.17 13 21 V 3 C 12.99 2.83 12.95 2.67 12.87 2.52 C 12.80 2.37 12.68 2.25 12.54 2.16 C 12.41 2.07 12.25 2.01 12.08 2.00 C 11.92 1.98 11.75 2.01 11.60 2.08 Z" fill="#fff"></path><path class="ytp-svg-volume-animation-small-ripple" d=" M 15.53 7.05 C 15.35 7.22 15.25 7.45 15.24 7.70 C 15.23 7.95 15.31 8.19 15.46 8.38 L 15.53 8.46 L 15.70 8.64 C 16.09 9.06 16.39 9.55 16.61 10.08 L 16.70 10.31 C 16.90 10.85 17 11.42 17 12 L 16.99 12.24 C 16.96 12.73 16.87 13.22 16.70 13.68 L 16.61 13.91 C 16.36 14.51 15.99 15.07 15.53 15.53 C 15.35 15.72 15.25 15.97 15.26 16.23 C 15.26 16.49 15.37 16.74 15.55 16.92 C 15.73 17.11 15.98 17.21 16.24 17.22 C 16.50 17.22 16.76 17.12 16.95 16.95 C 17.6 16.29 18.11 15.52 18.46 14.67 L 18.59 14.35 C 18.82 13.71 18.95 13.03 18.99 12.34 L 19 12 C 18.99 11.19 18.86 10.39 18.59 9.64 L 18.46 9.32 C 18.15 8.57 17.72 7.89 17.18 7.3 L 16.95 7.05 L 16.87 6.98 C 16.68 6.82 16.43 6.74 16.19 6.75 C 15.94 6.77 15.71 6.87 15.53 7.05" fill="#fff" transform="translate(18, 12) scale(1) translate(-18,-12)"></path><path class="ytp-svg-volume-animation-big-ripple" d="M18.36 4.22C18.18 4.39 18.08 4.62 18.07 4.87C18.05 5.12 18.13 5.36 18.29 5.56L18.36 5.63L18.66 5.95C19.36 6.72 19.91 7.60 20.31 8.55L20.47 8.96C20.82 9.94 21 10.96 21 11.99L20.98 12.44C20.94 13.32 20.77 14.19 20.47 15.03L20.31 15.44C19.86 16.53 19.19 17.52 18.36 18.36C18.17 18.55 18.07 18.80 18.07 19.07C18.07 19.33 18.17 19.59 18.36 19.77C18.55 19.96 18.80 20.07 19.07 20.07C19.33 20.07 19.59 19.96 19.77 19.77C20.79 18.75 21.61 17.54 22.16 16.20L22.35 15.70C22.72 14.68 22.93 13.62 22.98 12.54L23 12C22.99 10.73 22.78 9.48 22.35 8.29L22.16 7.79C21.67 6.62 20.99 5.54 20.15 4.61L19.77 4.22L19.70 4.15C19.51 3.99 19.26 3.91 19.02 3.93C18.77 3.94 18.53 4.04 18.36 4.22 Z" fill="#fff" transform="translate(22, 12) scale(1) translate(-22, -12)"></path></svg>'
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
        updateEllipsisListeners();
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

    function updateEllipsisListeners() {
        const ellipsisButtons = document.querySelectorAll('.ellipsis-button');
        ellipsisButtons.forEach(button => {
            button.removeEventListener('click', handleEllipsisClick);
            button.addEventListener('click', handleEllipsisClick);
        });

        document.querySelectorAll('.ellipsis-menu .copy-link').forEach(option => {
            option.removeEventListener('click', handleCopyLinkClick);
            option.addEventListener('click', handleCopyLinkClick);
        });

        document.querySelectorAll('.ellipsis-menu .add-to-playlist').forEach(option => {
            option.removeEventListener('click', handleAddToPlaylistClick);
            option.addEventListener('click', handleAddToPlaylistClick);
        });

        document.addEventListener('click', handleOutsideClick);
    }

    function handleEllipsisClick(e) {
        e.stopPropagation();
        const menu = this.nextElementSibling;
        const isVisible = menu.style.display === 'block';
        hideAllEllipsisMenus();
        menu.style.display = isVisible ? 'none' : 'block';
    }

    function handleCopyLinkClick() {
        const songItem = this.closest('li');
        const songTitle = songItem.querySelector('.song-title').textContent.trim();
        copySongLink(songTitle);
        hideAllEllipsisMenus();
    }

    function handleAddToPlaylistClick() {
        const songItem = this.closest('li');
        const songTitle = songItem.querySelector('.song-title')?.innerText.trim() || 'Untitled Song';
        const song = {
            title: songTitle,
            src: songItem.getAttribute('data-src'),
            section: songItem.closest('.page')?.id || currentSection
        };
        openAddToPlaylistPopup(song);
        hideAllEllipsisMenus();
    }

    function hideAllEllipsisMenus() {
        document.querySelectorAll('.ellipsis-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }

    function handleOutsideClick(e) {
        if (!e.target.closest('.ellipsis-button') && !e.target.closest('.ellipsis-menu')) {
            hideAllEllipsisMenus();
        }
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

    function updateSongUrl(songTitle) {
        const encodedTitle = encodeURIComponent(songTitle);
        const newUrl = `${window.location.origin}${window.location.pathname}?song=${encodedTitle}`;
        window.history.replaceState({}, '', newUrl);
    }

    function copySongLink(songTitle) {
        const url = `${window.location.origin}${window.location.pathname}?song=${encodeURIComponent(songTitle)}`;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(() => {
                showMessage('Link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy link:', err);
                showMessage('Failed to copy link. Please copy this URL: ' + url);
            });
        } else {
            const tempInput = document.createElement('input');
            tempInput.value = url;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                showMessage('Link copied to clipboard!');
            } catch (err) {
                console.error('Fallback copy failed:', err);
                showMessage('Failed to copy link. Please copy this URL: ' + url);
            }
            document.body.removeChild(tempInput);
        }
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
            updateSongUrl(songTitle);
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
    const currentSrc = audioPlayer.src ? new URL(audioPlayer.src, window.location.href).href : '';
    console.log('Highlighting - Current playing src:', currentSrc);

    // Select all <li> elements within <ul> elements with class 'songssad'
    const allSongItems = document.querySelectorAll('ul.songssad li');
    console.log(`Found ${allSongItems.length} song items to check`);

    allSongItems.forEach(item => {
        const songSrc = item.getAttribute('data-src');
        const absoluteSongSrc = songSrc ? new URL(songSrc, window.location.href).href : '';
        const songTitle = item.querySelector('.song-title');
        const playIcon = item.querySelector('.play-button');
        const isCurrentSong = currentSrc && absoluteSongSrc === currentSrc;

        console.log(`Checking: ${absoluteSongSrc} === ${currentSrc} -> ${isCurrentSong}`);

        item.classList.toggle('playing', isCurrentSong);
        if (songTitle && playIcon) {
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
            volumeToggleBtn.innerHTML = '<svg class="fa-volume-xmark" height="24" viewBox="0 0 24 24" width="24"><path d="M11.60 2.08L11.48 2.14L3.91 6.68C3.02 7.21 2.28 7.97 1.77 8.87C1.26 9.77 1.00 10.79 1 11.83V12.16L1.01 12.56C1.07 13.52 1.37 14.46 1.87 15.29C2.38 16.12 3.08 16.81 3.91 17.31L11.48 21.85C11.63 21.94 11.80 21.99 11.98 21.99C12.16 22.00 12.33 21.95 12.49 21.87C12.64 21.78 12.77 21.65 12.86 21.50C12.95 21.35 13 21.17 13 21V3C12.99 2.83 12.95 2.67 12.87 2.52C12.80 2.37 12.68 2.25 12.54 2.16C12.41 2.07 12.25 2.01 12.08 2.00C11.92 1.98 11.75 2.01 11.60 2.08ZM4.94 8.4V8.40L11 4.76V19.23L4.94 15.6C4.38 15.26 3.92 14.80 3.58 14.25C3.24 13.70 3.05 13.07 3.00 12.43L3 12.17V11.83C2.99 11.14 3.17 10.46 3.51 9.86C3.85 9.25 4.34 8.75 4.94 8.4ZM21.29 8.29L19 10.58L16.70 8.29L16.63 8.22C16.43 8.07 16.19 7.99 15.95 8.00C15.70 8.01 15.47 8.12 15.29 8.29C15.12 8.47 15.01 8.70 15.00 8.95C14.99 9.19 15.07 9.43 15.22 9.63L15.29 9.70L17.58 12L15.29 14.29C15.19 14.38 15.12 14.49 15.06 14.61C15.01 14.73 14.98 14.87 14.98 15.00C14.98 15.13 15.01 15.26 15.06 15.39C15.11 15.51 15.18 15.62 15.28 15.71C15.37 15.81 15.48 15.88 15.60 15.93C15.73 15.98 15.86 16.01 15.99 16.01C16.12 16.01 16.26 15.98 16.38 15.93C16.50 15.87 16.61 15.80 16.70 15.70L19 13.41L21.29 15.70L21.36 15.77C21.56 15.93 21.80 16.01 22.05 15.99C22.29 15.98 22.53 15.88 22.70 15.70C22.88 15.53 22.98 15.29 22.99 15.05C23.00 14.80 22.93 14.56 22.77 14.36L22.70 14.29L20.41 12L22.70 9.70C22.80 9.61 22.87 9.50 22.93 9.38C22.98 9.26 23.01 9.12 23.01 8.99C23.01 8.86 22.98 8.73 22.93 8.60C22.88 8.48 22.81 8.37 22.71 8.28C22.62 8.18 22.51 8.11 22.39 8.06C22.26 8.01 22.13 7.98 22.00 7.98C21.87 7.98 21.73 8.01 21.61 8.06C21.49 8.12 21.38 8.19 21.29 8.29Z" fill="white"></path></svg>'
        
        // <svg class="fa-volume-xmark" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>';
        } else {
            const restoreVolume = previousVolume > 0 ? previousVolume : initialVolume;
            audioPlayer.volume = restoreVolume;
            volumeSlider.value = restoreVolume * 100;
            volumeToggleBtn.innerHTML = '<svg height="24" class="fa-volume-high" viewBox="0 0 24 24" width="24"><path class="ytp-svg-fill ytp-svg-volume-animation-speaker" d="M 11.60 2.08 L 11.48 2.14 L 3.91 6.68 C 3.02 7.21 2.28 7.97 1.77 8.87 C 1.26 9.77 1.00 10.79 1 11.83 V 12.16 L 1.01 12.56 C 1.07 13.52 1.37 14.46 1.87 15.29 C 2.38 16.12 3.08 16.81 3.91 17.31 L 11.48 21.85 C 11.63 21.94 11.80 21.99 11.98 21.99 C 12.16 22.00 12.33 21.95 12.49 21.87 C 12.64 21.78 12.77 21.65 12.86 21.50 C 12.95 21.35 13 21.17 13 21 V 3 C 12.99 2.83 12.95 2.67 12.87 2.52 C 12.80 2.37 12.68 2.25 12.54 2.16 C 12.41 2.07 12.25 2.01 12.08 2.00 C 11.92 1.98 11.75 2.01 11.60 2.08 Z" fill="#fff"></path><path class="ytp-svg-volume-animation-small-ripple" d=" M 15.53 7.05 C 15.35 7.22 15.25 7.45 15.24 7.70 C 15.23 7.95 15.31 8.19 15.46 8.38 L 15.53 8.46 L 15.70 8.64 C 16.09 9.06 16.39 9.55 16.61 10.08 L 16.70 10.31 C 16.90 10.85 17 11.42 17 12 L 16.99 12.24 C 16.96 12.73 16.87 13.22 16.70 13.68 L 16.61 13.91 C 16.36 14.51 15.99 15.07 15.53 15.53 C 15.35 15.72 15.25 15.97 15.26 16.23 C 15.26 16.49 15.37 16.74 15.55 16.92 C 15.73 17.11 15.98 17.21 16.24 17.22 C 16.50 17.22 16.76 17.12 16.95 16.95 C 17.6 16.29 18.11 15.52 18.46 14.67 L 18.59 14.35 C 18.82 13.71 18.95 13.03 18.99 12.34 L 19 12 C 18.99 11.19 18.86 10.39 18.59 9.64 L 18.46 9.32 C 18.15 8.57 17.72 7.89 17.18 7.3 L 16.95 7.05 L 16.87 6.98 C 16.68 6.82 16.43 6.74 16.19 6.75 C 15.94 6.77 15.71 6.87 15.53 7.05" fill="#fff" transform="translate(18, 12) scale(1) translate(-18,-12)"></path><path class="ytp-svg-volume-animation-big-ripple" d="M18.36 4.22C18.18 4.39 18.08 4.62 18.07 4.87C18.05 5.12 18.13 5.36 18.29 5.56L18.36 5.63L18.66 5.95C19.36 6.72 19.91 7.60 20.31 8.55L20.47 8.96C20.82 9.94 21 10.96 21 11.99L20.98 12.44C20.94 13.32 20.77 14.19 20.47 15.03L20.31 15.44C19.86 16.53 19.19 17.52 18.36 18.36C18.17 18.55 18.07 18.80 18.07 19.07C18.07 19.33 18.17 19.59 18.36 19.77C18.55 19.96 18.80 20.07 19.07 20.07C19.33 20.07 19.59 19.96 19.77 19.77C20.79 18.75 21.61 17.54 22.16 16.20L22.35 15.70C22.72 14.68 22.93 13.62 22.98 12.54L23 12C22.99 10.73 22.78 9.48 22.35 8.29L22.16 7.79C21.67 6.62 20.99 5.54 20.15 4.61L19.77 4.22L19.70 4.15C19.51 3.99 19.26 3.91 19.02 3.93C18.77 3.94 18.53 4.04 18.36 4.22 Z" fill="#fff" transform="translate(22, 12) scale(1) translate(-22, -12)"></path></svg>'
        // <svg class="fa-volume-high" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>';
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

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Cache songList if it doesn't change frequently
let cachedSongList = null;

function performSearch() {
    const searchTerm = searchBar.value.toLowerCase().trim();
    console.log('Search term:', searchTerm);

    // Use cached songList or fetch it
    if (!cachedSongList) {
        cachedSongList = getAllSongs().map(song => ({
            ...song,
            titleLower: song.title.toLowerCase() // Precompute lowercase title
        }));
    }
    const songList = cachedSongList;
    console.log('songList in performSearch:', songList);
    popup.innerHTML = '';

    if (searchTerm === '') {
        popup.classList.remove('active');
        console.log('Search cleared, popup hidden');
        return;
    }

    // Filter unique matches in one pass
    const uniqueTitles = new Set();
    const matches = songList.reduce((acc, song) => {
        if (song.titleLower.includes(searchTerm) && !uniqueTitles.has(song.title)) {
            uniqueTitles.add(song.title);
            acc.push(song);
        }
        return acc;
    }, []);

    console.log('Search matches:', matches);

    if (matches.length > 0) {
        // Build HTML string for all results
        const html = matches.map(song => `
            <div class="popup-song" data-src="${song.src}" data-title="${song.title}" data-section="${song.section}">
                <span>${song.title}</span>
                <i class="fa-solid fa-play play-button"></i>
                <svg class="scroll-to-song" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M160-375 17-517l45-46.5 53.5 52.5q-5-24.5-7.25-49.75T106-612.5q0-80 29.5-152.5T214-901l46 46q-40 53.5-64.75 114.75T170.5-612.5q0 30.5 4.5 61t10.5 60l72.5-72 44.5 46.5L160-375Zm457.5 268q-22 7.5-45.5 6.5T527.5-111L237-253.5l-3.5-8.5q7.5-32.5 32.75-53.5t58.25-20l91-2.5L302-651.5q-5.5-15 1.25-29.25t22.25-19.75q14-5.5 29.5 1.5t21 21.5l147.5 406-143 4 180 87q7 3 15.25 3t16.75-3.5L810-259.5q36.5-13.5 52.25-47.25T864.5-377L795-566.5q-5-15.5 1.75-30.25T818-617q15.5-5.5 30.25 1.75T867.5-594l70 190.5q23.5 65.5-6.5 128T836-188l-218.5 81Zm-71-300.5-64.5-174q-5.5-14 1.25-29T505.5-631q14-4 29 2.5t20.5 21l63 175-71.5 25Zm135-49.5L632-593q-5.5-14.5 1.25-29.75t22.25-19.75q14-5.5 28.75 1.25t19.25 20.75L754-482l-72.5 25Zm-5 108.5Z"/></svg>
            </div>
        `).join('');
        popup.innerHTML = html;
        popup.classList.add('active');
        console.log('Popup shown with', matches.length, 'results');

        // Event delegation for play and scroll buttons
        popup.addEventListener('click', (e) => {
            const songDiv = e.target.closest('.popup-song');
            if (!songDiv) return;
            const src = songDiv.dataset.src;
            const title = songDiv.dataset.title;
            const section = songDiv.dataset.section;

            if (e.target.classList.contains('play-button')) {
                console.log(`Clicked to play: ${title} from ${section}`);
                updateSectionButtons(section);
                const sectionSongs = songList.filter(s => s.section === section);
                currentSongIndex = sectionSongs.findIndex(s => s.src === src && s.title === title);
                if (currentSongIndex === -1) {
                    console.error(`Song ${title} not found in section ${section}`);
                    return;
                }
                const isSameSong = audioPlayer.src === new URL(src, window.location.href).href;
                playAudio(src, title, section, isSameSong ? audioPlayer.currentTime : 0);
            } else if (e.target.classList.contains('scroll-to-song')) {
                console.log(`Scrolling to song: ${title} with src: ${src}`);
                const songItem = Array.from(document.querySelectorAll('#song-list li')).find(li => {
                    const liSrc = li.getAttribute('data-src');
                    const liTitle = li.querySelector('.song-title')?.innerText.trim();
                    return liSrc === src && liTitle === title;
                });
                if (songItem) {
                    songItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    songItem.classList.add('highlight');
                    setTimeout(() => songItem.classList.remove('highlight'), 1500); // Reduced highlight duration
                } else {
                    console.error(`Song ${title} not found in #song-list`);
                    showMessage(`Song "${title}" not found in list`);
                }
            }
        });

        updateAllPlayButtons();
        highlightCurrentSong();
    } else {
        popup.classList.remove('active');
        console.log('No matches found, popup hidden');
    }
}

// Attach debounced search to input event
searchBar.addEventListener('input', debounce(performSearch, 300));

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
        console.error('Search popup element (#search-popup, #searchboxcon) not found');
    }

    
    if (progressBarContainer) {
        let isDragging = false;
        let lastUpdate = 0;
        const debounceTime = 150; // Increased to 150ms to reduce rapid updates

        // Shared function to update currentTime
        function updateCurrentTime(x, rect) {
            const width = rect.width;
            const boundedX = Math.max(0, Math.min(x, width));
            audioPlayer.currentTime = (boundedX / width) * audioPlayer.duration;
            localStorage.setItem('playbackPosition', audioPlayer.currentTime);
            console.log(`Updated currentTime to ${audioPlayer.currentTime}`);
        }

        // Handle mousedown to start dragging
        progressBarContainer.addEventListener('mousedown', e => {
            e.preventDefault(); // Prevent text selection or other default behaviors
            isDragging = true;
            console.log('Mousedown triggered');
            const rect = progressBarContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            updateCurrentTime(clickX, rect);
        });

        // Handle dragging with mousemove
        document.addEventListener('mousemove', e => {
            if (isDragging) {
                const now = Date.now();
                if (now - lastUpdate < debounceTime) return;
                lastUpdate = now;
                console.log('Mousemove triggered during drag');
                const rect = progressBarContainer.getBoundingClientRect();
                const moveX = e.clientX - rect.left;
                updateCurrentTime(moveX, rect);
            }
        });

        // Stop dragging on mouseup
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                console.log('Mouseup triggered, stopping drag');
                isDragging = false;
            }
        });

        // Handle touchstart for touch devices
        progressBarContainer.addEventListener('touchstart', e => {
            e.preventDefault(); // Prevent emulated mouse events
            console.log('Touchstart triggered');
            const touch = e.touches[0];
            const rect = progressBarContainer.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            updateCurrentTime(touchX, rect);
            isDragging = true; // Enable dragging for touch
        });

        // Handle touchmove for dragging on touch devices
        progressBarContainer.addEventListener('touchmove', e => {
            e.preventDefault(); // Prevent scrolling or other default behaviors
            if (isDragging) {
                const now = Date.now();
                if (now - lastUpdate < debounceTime) return;
                lastUpdate = now;
                console.log('Touchmove triggered during drag');
                const touch = e.touches[0];
                const rect = progressBarContainer.getBoundingClientRect();
                const touchX = touch.clientX - rect.left;
                updateCurrentTime(touchX, rect);
            }
        });

        // Stop dragging on touchend
        progressBarContainer.addEventListener('touchend', () => {
            console.log('Touchend triggered, stopping drag');
            isDragging = false;
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

    // Check for shared link and show prompt
    if (autoplayPrompt && songNameSpan) {
        const urlParams = new URLSearchParams(window.location.search);
        const songTitleParam = urlParams.get('song');
        if (songTitleParam) {
            const decodedTitle = decodeURIComponent(songTitleParam);
            songNameSpan.textContent = decodedTitle;
            const song = songList.find(s => s.title === decodedTitle);
            if (song) {
                autoplayPrompt.style.display = 'flex';
                audioPlayer.dataset.src = song.src;
                audioPlayer.dataset.title = song.title;
                audioPlayer.dataset.section = song.section;
            }
        }
    }

    window.startAutoPlay = function() {
        if (autoplayPrompt) autoplayPrompt.style.display = 'none';
        if (audioPlayer.dataset.src) {
            const src = audioPlayer.dataset.src;
            const title = audioPlayer.dataset.title;
            const section = audioPlayer.dataset.section;
            updateSectionButtons(section);
            currentSongIndex = Array.from(currentSectionButtons).findIndex(btn => 
                btn.parentElement.getAttribute('data-src') === src
            );
            if (currentSongIndex !== -1) {
                playAudio(src, title, section, 0);
            } else {
                showMessage('Song not found in current section');
            }
        }
    };

    window.cancelAutoPlay = function() {
        if (autoplayPrompt) autoplayPrompt.style.display = 'none';
        window.history.replaceState({}, '', window.location.pathname);
    };

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .control-button.active { 
            
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
        #repeat-btn.active{
           background-color: #0048ff;
    padding: 4px 6px;
    border-radius: 38px;
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
    display: inline-flex
;
    align-items: center;
    justify-content: center;
    width: 33px;
    margin-right: -10px;

    }
        
    `;
    document.head.appendChild(style);
});

document.addEventListener("DOMContentLoaded", () => {
    const customMenu = document.querySelector(".custom-menu");

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        customMenu.style.display = "block";
        customMenu.style.top = `${event.pageY}px`;
        customMenu.style.left = `${event.pageX}px`;
    });
    document.addEventListener("click", () => {
        customMenu.style.display = "none";
    });
});
