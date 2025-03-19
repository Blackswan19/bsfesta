document.addEventListener('DOMContentLoaded', function () {
    var allPlayButtons = document.querySelectorAll('.play-button');
    var audioPlayer = new Audio();
    var volumeBar = document.getElementById('volume-bar');
    var previousBtn = document.getElementById('previous-btn');
    var nextBtn = document.getElementById('next-btn');
    var playPauseBtn = document.getElementById('play-pause-btn');
    var progressBar = document.getElementById('progress-bar');
    var repeatBtn = document.getElementById('repeat-btn');
    var shuffleBtn = document.querySelector('.fa-shuffle');
    var isPlaying = false;
    var currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;
    var playbackPosition = parseFloat(localStorage.getItem('playbackPosition')) || 0;
    var hasInteracted = false;
    var videoElement = document.getElementById('video-background');
    var initialVolume = 0.2;
    var isVolumeChanged = false;
    var isRepeating = false;
    var isShuffleMode = false;
    var attemptedSongs = new Set();
    var currentSection = localStorage.getItem('currentSection') || 'allin';
    var currentSectionButtons = [];
    var shuffleQueue = [];
    var playedSongs = new Set();
    var lastPlayedSong = localStorage.getItem('lastPlayedSong') || null;

    pauseAudio();

    audioPlayer.addEventListener('error', (e) => {
        console.error('Error with audio playback:', e);
    });

    if ('wakeLock' in navigator) {
        try {
            const wakeLock = navigator.wakeLock.request('screen');
            console.log('Screen Wake Lock is active.');
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    }

    setTimeout(function () {
        document.querySelector('.loading-screen').style.display = 'none';
        document.getElementById('player-interface').style.display = 'block';
    }, 1500);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function updateSectionButtons(sectionId) {
        currentSection = sectionId;
        currentSectionButtons = document.querySelectorAll(`#${sectionId} .play-button`);
        console.log(`Section changed to ${sectionId} with ${currentSectionButtons.length} songs`);
        localStorage.setItem('currentSection', currentSection);
        resetShuffleQueue();
    }

    function resetShuffleQueue() {
        shuffleQueue = Array.from({length: currentSectionButtons.length}, (_, i) => i)
            .filter(i => !attemptedSongs.has(i) || playedSongs.has(i));
        if (isShuffleMode) {
            shuffleArray(shuffleQueue);
            playedSongs.clear(); // Clear played songs when resetting shuffle
        }
        console.log('Shuffle queue reset:', shuffleQueue);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Initial setup
    updateSectionButtons(currentSection);

    if (lastPlayedSong && playbackPosition >= 0) {
        const songIndex = Array.from(currentSectionButtons).findIndex(button => 
            button.parentElement.getAttribute('data-src') === lastPlayedSong
        );
        if (songIndex !== -1) {
            currentSongIndex = songIndex;
            audioPlayer.src = lastPlayedSong;
            audioPlayer.currentTime = playbackPosition;
        }
    }

    function showMessage(text) {
        console.log('Showing message:', text);
        const message = document.createElement('div');
        message.textContent = text;
        message.className = 'skip-message';
        document.body.appendChild(message);
        
        message.offsetHeight;
        message.classList.add('show');
        
        setTimeout(() => {
            console.log('Removing message:', text);
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 2000);
    }

    async function playAudioFromPosition(audioSrc, position) {
        console.log(`Playing song at index ${currentSongIndex}: ${audioSrc}`);
        audioPlayer.src = audioSrc;
        audioPlayer.currentTime = position;
        lastPlayedSong = audioSrc;
        localStorage.setItem('lastPlayedSong', lastPlayedSong);

        try {
            await audioPlayer.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            highlightCurrentSong();
            localStorage.setItem('currentSongIndex', currentSongIndex);
            localStorage.setItem('playbackPosition', audioPlayer.currentTime);
            console.log(`Song at index ${currentSongIndex} started playing`);
            attemptedSongs.delete(currentSongIndex);
            playedSongs.add(currentSongIndex);
        } catch (error) {
            console.error(`Error for song at index ${currentSongIndex}:`, error);
            attemptedSongs.add(currentSongIndex);
            if (isShuffleMode) {
                shuffleQueue = shuffleQueue.filter(i => i !== currentSongIndex);
            }
            skipToNextPlayableSong();
        }
    }

    function playAudio(audioSrc) {
        playAudioFromPosition(audioSrc, 0);
    }

    function pauseAudio() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playbackPosition = audioPlayer.currentTime;
        localStorage.setItem('playbackPosition', playbackPosition);
        console.log('Audio paused');
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseAudio();
        } else if (audioPlayer.src) {
            audioPlayer.play()
                .then(() => {
                    isPlaying = true;
                    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    console.log('Playback started');
                })
                .catch(error => {
                    console.error('Error starting playback:', error);
                    showMessage('Error playing song');
                });
        } else if (lastPlayedSong) {
            const songIndex = Array.from(currentSectionButtons).findIndex(button => 
                button.parentElement.getAttribute('data-src') === lastPlayedSong
            );
            if (songIndex !== -1) {
                currentSongIndex = songIndex;
                playAudioFromPosition(lastPlayedSong, playbackPosition);
            } else {
                playCurrentSong();
            }
            hasInteracted = true;
        } else {
            playCurrentSong();
            hasInteracted = true;
        }
    }

    function playCurrentSong() {
        if (currentSectionButtons.length > 0) {
            var currentSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
            console.log(`Playing current song at index ${currentSongIndex}: ${currentSong}`);
            playAudio(currentSong);
        }
    }

    function playPreviousSong() {
        if (isShuffleMode) {
            playRandomSong();
        } else {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = currentSectionButtons.length - 1;
            }
            var previousSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
            playbackPosition = 0;
            playAudio(previousSong);
        }
    }

    function playNextSong() {
        if (isShuffleMode) {
            playRandomSong();
        } else {
            currentSongIndex++;
            if (currentSongIndex >= currentSectionButtons.length) {
                currentSongIndex = 0;
                if (!isRepeating) {
                    pauseAudio();
                    attemptedSongs.clear();
                    console.log('Section playlist ended, no repeat');
                    return;
                }
            }
            var nextSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
            playbackPosition = 0;
            playAudio(nextSong);
        }
    }

    function playRandomSongriceSong() {
        if (currentSectionButtons.length === 0) return;

        if (shuffleQueue.length === 0) {
            resetShuffleQueue();
        }

        currentSongIndex = shuffleQueue.shift();
        var randomSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playbackPosition = 0;
        console.log(`Playing shuffled song at index ${currentSongIndex}: ${randomSong}`);
        playAudio(randomSong);
    }

    function skipToNextPlayableSong() {
        if (attemptedSongs.size >= currentSectionButtons.length) {
            pauseAudio();
            attemptedSongs.clear();
            showMessage('No more playable songs in this section');
            return;
        }

        if (isShuffleMode) {
            playRandomSong();
        } else {
            currentSongIndex++;
            if (currentSongIndex >= currentSectionButtons.length) {
                currentSongIndex = 0;
            }
            while (attemptedSongs.has(currentSongIndex)) {
                currentSongIndex = (currentSongIndex + 1) % currentSectionButtons.length;
            }
            var nextSong = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
            playbackPosition = 0;
            playAudio(nextSong);
        }
    }

    function highlightCurrentSong() {
        var songItems = document.querySelectorAll(`#${currentSection} #song-list li`);
        var currentSongDetails = document.getElementById('current-song-details');

        songItems.forEach(function (item, index) {
            item.classList.remove('playing');
            var songTitle = item.querySelector('.song-title');
            var playIcon = item.querySelector('.play-button');

            if (songTitle) {
                songTitle.classList.remove('highlighted');
                songTitle.style.color = '';
                songTitle.style.fontWeight = '';
                playIcon.className = 'fa-solid fa-play play-button';
            }

            if (index === currentSongIndex && index < currentSectionButtons.length) {
                item.classList.add('playing');
                if (songTitle) {
                    songTitle.classList.add('highlighted');
                    playIcon.className = 'fa-solid fa-chart-simple play-button';
                    if (currentSongDetails) {
                        currentSongDetails.textContent = songTitle.textContent;
                    }
                }
            }
        });
    }

    function toggleRepeat() {
        isRepeating = !isRepeating;
        var repeatIcon = repeatBtn.querySelector('i');

        if (isRepeating) {
            repeatIcon.classList.add('repeat-active');
            repeatBtn.setAttribute('title', 'Repeating this song');
        } else {
            repeatIcon.classList.remove('repeat-active');
            repeatBtn.setAttribute('title', 'Not repeating');
        }
    }

    function handleAudioEnd() {
        if (isRepeating) {
            playAudioFromPosition(audioPlayer.src, 0);
        } else {
            playNextSong();
        }
    }

    playPauseBtn.addEventListener('click', togglePlayPause);

    allPlayButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const sectionElement = button.closest('.page');
            if (!sectionElement) return;
            const newSectionId = sectionElement.id;

            if (newSectionId !== currentSection) {
                updateSectionButtons(newSectionId);
            }

            const sectionIndex = Array.from(currentSectionButtons).indexOf(button);
            if (sectionIndex === -1) return;

            if (isPlaying && currentSongIndex === sectionIndex && newSectionId === currentSection) {
                pauseAudio();
            } else {
                if (isPlaying) {
                    audioPlayer.pause();
                    isPlaying = false;
                }
                currentSongIndex = sectionIndex;
                if (isShuffleMode) {
                    shuffleQueue = shuffleQueue.filter(i => i !== sectionIndex);
                    shuffleQueue.unshift(sectionIndex);
                }
                const songSrc = currentSectionButtons[currentSongIndex].parentElement.getAttribute('data-src');
                playAudio(songSrc);
            }
        });
    });

    previousBtn.addEventListener('click', playPreviousSong);
    nextBtn.addEventListener('click', playNextSong);
    repeatBtn.addEventListener('click', toggleRepeat);

    shuffleBtn.addEventListener('click', function () {
        isShuffleMode = !isShuffleMode;
        shuffleBtn.classList.toggle('active-shuffle');
        console.log('Shuffle mode:', isShuffleMode);
        if (isShuffleMode) {
            resetShuffleQueue();
        }
    });

    audioPlayer.addEventListener('ended', handleAudioEnd);

    volumeBar.addEventListener('input', function () {
        var volumeValue = parseInt(volumeBar.value);
        if (!isVolumeChanged) {
            audioPlayer.volume = initialVolume + volumeValue / 100;
            isVolumeChanged = true;
        } else {
            audioPlayer.volume = volumeValue / 100;
        }
    });

    audioPlayer.addEventListener('timeupdate', function () {
        var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.querySelector('.progress').style.width = progress + '%';
    });

    progressBar.addEventListener('click', function (e) {
        var rect = this.getBoundingClientRect();
        var offsetX = e.clientX - rect.left;
        var width = progressBar.offsetWidth;
        var seekTime = (offsetX / width) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    progressBar.addEventListener('mousedown', function (e) {
        var rect = this.getBoundingClientRect();
        var offsetX = e.clientX - rect.left;
        var width = progressBar.offsetWidth;

        function moveProgress(e) {
            var moveX = e.clientX - rect.left;
            var newWidth = Math.max(0, Math.min(moveX, width));
            var seekTime = (newWidth / width) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
            progressBar.querySelector('.progress').style.width = (newWidth / width) * 100 + '%';
        }

        function stopMove() {
            document.removeEventListener('mousemove', moveProgress);
            document.removeEventListener('mouseup', stopMove);
        }

        document.addEventListener('mousemove', moveProgress);
        document.addEventListener('mouseup', stopMove);
    });

    progressBar.addEventListener('touchstart', function (e) {
        var touch = e.touches[0];
        var rect = this.getBoundingClientRect();
        var offsetX = touch.clientX - rect.left;
        var width = progressBar.offsetWidth;

        function moveProgress(e) {
            var touchMove = e.touches[0];
            var moveX = touchMove.clientX - rect.left;
            var newWidth = Math.max(0, Math.min(moveX, width));
            var seekTime = (newWidth / width) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
            progressBar.querySelector('.progress').style.width = (newWidth / width) * 100 + '%';
        }

        function stopMove() {
            document.removeEventListener('touchmove', moveProgress);
            document.removeEventListener('touchend', stopMove);
        }

        document.addEventListener('touchmove', moveProgress);
        document.addEventListener('touchend', stopMove);
    });
});

function displayText(sectionId) {
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    document.getElementById(sectionId).style.display = "block";
}

window.showPage = function(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    document.querySelector(`button[onclick="showPage('${pageId}')"]`).classList.add('active');
    
    document.dispatchEvent(new CustomEvent('updateSectionButtons', { detail: pageId }));
};

document.addEventListener('updateSectionButtons', function(e) {
    var allPlayButtons = document.querySelectorAll('.play-button');
    var scope = document.querySelector('script').getAttribute('data-scope');
    if (scope) {
        eval(scope + '.updateSectionButtons')(e.detail);
    }
}, false);


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
