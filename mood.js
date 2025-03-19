document.addEventListener('DOMContentLoaded', function () {
    var playButtons = document.querySelectorAll('.play-button');
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

    console.log('currentSongIndex from localStorage:', currentSongIndex);
    console.log('playbackPosition from localStorage:', playbackPosition);

    if (currentSongIndex !== 0 && playbackPosition !== 0) {
        playAudioFromPosition(playButtons[currentSongIndex].parentElement.getAttribute('data-src'), playbackPosition);
        hasInteracted = true;
    }

    function showMessage(text) {
        console.log('Showing message:', text);
        const message = document.createElement('div');
        message.textContent = text;
        message.className = 'skip-message';
        document.body.appendChild(message);
        
        // Force a reflow to enable the transition
        message.offsetHeight;
        
        // Add the show class to trigger the fade-in
        message.classList.add('show');
        
        setTimeout(() => {
            console.log('Removing message:', text);
            // Fade out before removing
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300); // Match this to transition duration
        }, 2000);
    }

    async function playAudioFromPosition(audioSrc, position) {
        console.log(`Playing song at index ${currentSongIndex}: ${audioSrc}`);
        attemptedSongs.add(currentSongIndex);
        audioPlayer.src = audioSrc;
        audioPlayer.currentTime = position;

        let hasStartedPlaying = false;

        const onPlaying = () => {
            hasStartedPlaying = true;
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            highlightCurrentSong();
            localStorage.setItem('currentSongIndex', currentSongIndex);
            localStorage.setItem('playbackPosition', audioPlayer.currentTime);
            console.log(`Song at index ${currentSongIndex} started playing`);
            attemptedSongs.clear();
        };

        audioPlayer.addEventListener('playing', onPlaying, { once: true });

        try {
            const playPromise = audioPlayer.play();
            await Promise.race([
                playPromise,
                new Promise((_, reject) => setTimeout(() => reject(new Error('Initial timeout')), 500))
            ]);

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (hasStartedPlaying) {
                        resolve();
                    } else {
                        console.log(`Song at index ${currentSongIndex} did not start within 1 second`);
                        showMessage('Song skipped');
                        reject(new Error('Playback timeout'));
                    }
                }, 1000);
            });
        } catch (error) {
            console.error(`Error for song at index ${currentSongIndex}:`, error);
            audioPlayer.removeEventListener('playing', onPlaying);
            showMessage('Song skipped');
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
        console.log(`Toggle play/pause. Current state: isPlaying=${isPlaying}, src=${audioPlayer.src}`);
        if (isPlaying) {
            pauseAudio();
        } else {
            if (audioPlayer.src) {
                audioPlayer.play()
                    .then(() => {
                        isPlaying = true;
                        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                        console.log('Playback resumed');
                    })
                    .catch(error => {
                        console.error('Error resuming playback:', error);
                        showMessage('Error resuming song');
                    });
            } else {
                playCurrentSong();
                hasInteracted = true;
                console.log('Starting new song');
            }
        }
    }

    function playCurrentSong() {
        var currentSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        console.log(`Playing current song at index ${currentSongIndex}: ${currentSong}`);
        playAudio(currentSong);
    }

    function playPreviousSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playButtons.length - 1;
        }
        var previousSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playbackPosition = 0;
        playAudio(previousSong);
    }

    function playNextSong() {
        console.log(`Next button clicked. Current index: ${currentSongIndex}`);
        if (isShuffleMode) {
            playRandomSong();
        } else {
            currentSongIndex++;
            if (currentSongIndex >= playButtons.length) {
                currentSongIndex = 0;
                if (!isRepeating) {
                    pauseAudio();
                    attemptedSongs.clear();
                    console.log('Playlist ended, no repeat');
                    return;
                }
            }
            var nextSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
            playbackPosition = 0;
            console.log(`Attempting next song at index ${currentSongIndex}: ${nextSong}`);
            playAudio(nextSong);
        }
    }

    function playRandomSong() {
        currentSongIndex = Math.floor(Math.random() * playButtons.length);
        var randomSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playbackPosition = 0;
        playAudio(randomSong);
    }

    function skipToNextPlayableSong() {
        console.log(`Skipping to next playable song. Attempted: ${attemptedSongs.size}/${playButtons.length}`);
        if (attemptedSongs.size >= playButtons.length) {
            console.log('No playable songs found in the playlist.');
            pauseAudio();
            attemptedSongs.clear();
            showMessage('No more playable songs');
            return;
        }

        if (isShuffleMode) {
            playRandomSong();
        } else {
            currentSongIndex++;
            if (currentSongIndex >= playButtons.length) {
                currentSongIndex = 0;
            }
            var nextSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
            playbackPosition = 0;
            console.log(`Skipping to song at index ${currentSongIndex}: ${nextSong}`);
            playAudio(nextSong); // Immediately try the next song
        }
    }

    function highlightCurrentSong() {
        var songItems = document.querySelectorAll('#song-list li');
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

            if (index === currentSongIndex) {
                item.classList.add('playing');
                if (songTitle) {
                    songTitle.classList.add('highlighted');
                    playIcon.className = 'fa-solid fa-chart-simple play-button';
                    currentSongDetails.textContent = '' + songTitle.textContent;
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
        console.log(`Song at index ${currentSongIndex} ended`);
        if (isRepeating) {
            playAudioFromPosition(audioPlayer.src, 0);
        } else {
            playNextSong();
        }
    }

    playPauseBtn.addEventListener('click', function () {
        togglePlayPause();
    });

    playButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            console.log(`Clicked song at index ${index}`);
            if (isPlaying && currentSongIndex === index) {
                pauseAudio();
            } else {
                if (isPlaying) {
                    audioPlayer.pause();
                    isPlaying = false;
                }
                currentSongIndex = index;
                const songSrc = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
                console.log(`Selected song at index ${currentSongIndex}: ${songSrc}`);
                playAudio(songSrc);
            }
        });
    });

    previousBtn.addEventListener('click', function () {
        playPreviousSong();
    });

    nextBtn.addEventListener('click', function () {
        playNextSong();
    });

    repeatBtn.addEventListener('click', function () {
        toggleRepeat();
    });

    shuffleBtn.addEventListener('click', function () {
        isShuffleMode = !isShuffleMode;
        shuffleBtn.classList.toggle('active-shuffle');
        console.log('Shuffle mode:', isShuffleMode);
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
