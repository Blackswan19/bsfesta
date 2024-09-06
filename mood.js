window.addEventListener('load', function () {
    var playButtons = document.querySelectorAll('.play-button');
    var audioPlayer = new Audio();
    var volumeBar = document.getElementById('volume-bar');
    var previousBtn = document.getElementById('previous-btn');
    var nextBtn = document.getElementById('next-btn');
    var playPauseBtn = document.getElementById('play-pause-btn');
    var progressBar = document.getElementById('progress-bar');
    var isPlaying = false;
    var currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;
    var playbackPosition = parseFloat(localStorage.getItem('playbackPosition')) || 0;
    var hasInteracted = false;
    var videoElement = document.getElementById('video-background');
    var initialVolume = 0.2;
    var isVolumeChanged = false;
    var popup = document.getElementById('current-song-popup');
    var songDetails = document.getElementById('current-song-details');
    var closePopup = document.querySelector('.close-popup');
    var fullScreenBtn = document.getElementById('fullScreenBtn');
    var isRepeat = false;
    const repeatBtn = document.getElementById('repeat-btn');

    // Hide the loading screen and show the player interface after everything has loaded
    document.querySelector('.loading-screen').style.display = 'none';
    document.getElementById('player-interface').style.display = 'block';

    // Toggle repeat mode
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
        repeatBtn.innerHTML = isRepeat
            ? '<i class="fa-solid fa-repeat" style="color: #004cff;"></i>'
            : '<i class="fa-solid fa-repeat"></i>';
    }

    // When the song ends, check if repeat is on, and if so, replay the song
    audioPlayer.addEventListener('ended', () => {
        if (isRepeat) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            playNextSong();
        }
    });

    // Repeat button click event
    repeatBtn.addEventListener('click', toggleRepeat);

    // Error handling for audio playback
    audioPlayer.addEventListener('error', (e) => {
        console.error('Error with audio playback:', e);
    });

    // Handle screen wake lock
    if ('wakeLock' in navigator) {
        try {
            const wakeLock = navigator.wakeLock.request('screen');
            console.log('Screen Wake Lock is active.');
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Check local storage for saved song index and position
    if (currentSongIndex !== 0 && playbackPosition !== 0) {
        playAudioFromPosition(playButtons[currentSongIndex].parentElement.getAttribute('data-src'), playbackPosition);
        hasInteracted = true;
    }

    function playAudioFromPosition(audioSrc, position) {
        audioPlayer.src = audioSrc;
        audioPlayer.currentTime = position;
        audioPlayer.play();
        isPlaying = true;

        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        highlightCurrentSong();
        showPopup(playButtons[currentSongIndex].parentElement.querySelector('.song-title').textContent.trim());
    }

    window.addEventListener('beforeunload', function () {
        if (!isPlaying) {
            localStorage.removeItem('currentSongIndex');
            localStorage.removeItem('playbackPosition');
        } else {
            localStorage.setItem('currentSongIndex', currentSongIndex);
            localStorage.setItem('playbackPosition', audioPlayer.currentTime);
        }
    });

    function playAudio(audioSrc) {
        playAudioFromPosition(audioSrc, 0);
        highlightCurrentSong();
    }

    function pauseAudio() {
        audioPlayer.pause();
        isPlaying = false;

        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

        playbackPosition = audioPlayer.currentTime;
        localStorage.setItem('playbackPosition', playbackPosition);
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseAudio();
            hidePopup(); // Hide the pop-up when paused
        } else {
            if (hasInteracted && audioPlayer.src) {
                playAudioFromPosition(audioPlayer.src, playbackPosition);
            } else {
                if (playbackPosition > 0 && audioPlayer.src) {
                    playAudioFromPosition(audioPlayer.src, playbackPosition);
                } else {
                    playNextSong();
                    hasInteracted = true;
                }
            }
        }
    }

    function playNextSong() {
        currentSongIndex = Math.floor(Math.random() * playButtons.length); // Select a random song index
        var nextSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playAudio(nextSong);
        showPopup(playButtons[currentSongIndex].parentElement.querySelector('.song-title').textContent.trim()); // Display the song title
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + playButtons.length) % playButtons.length;
        var previousSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playAudio(previousSong);
        showPopup(playButtons[currentSongIndex].parentElement.querySelector('.song-title').textContent.trim()); // Display the song title
    }

    function highlightCurrentSong() {
        var songItems = document.querySelectorAll('#song-list li');
        songItems.forEach(function (item, index) {
            item.classList.remove('playing');
            var songTitle = item.querySelector('.song-title');
            if (songTitle) {
                songTitle.classList.remove('highlighted');
                songTitle.innerHTML = songTitle.textContent.replace('<i class="fa-solid fa-chart-simple"></i>', '<i class="fa-solid fa-music"></i>');
            }
            if (index === currentSongIndex) {
                item.classList.add('playing');
                var currentSongTitle = item.querySelector('.song-title');
                if (currentSongTitle) {
                    currentSongTitle.classList.add('highlighted');
                    currentSongTitle.innerHTML = '<i class="fa-solid fa-chart-simple"></i> ' + currentSongTitle.textContent;
                }
            }
        });
    }

    function showPopup(songTitle) {
        songDetails.textContent = "" + songTitle;
        popup.style.display = "block";  // Show the pop-up
    }

    function hidePopup() {
        popup.style.display = "none";  // Hide the pop-up
    }

    function toggleFullScreen() {
        var elem = document.documentElement;
        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    playPauseBtn.addEventListener('click', function () {
        togglePlayPause();
    });

    playButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            if (isPlaying && currentSongIndex === index) {
                pauseAudio();
                hidePopup();
            } else {
                currentSongIndex = index;
                playAudioFromPosition(button.parentElement.getAttribute('data-src'), 0);
                highlightCurrentSong();
            }
        });
    });

    previousBtn.addEventListener('click', function () {
        playPreviousSong();
    });

    nextBtn.addEventListener('click', function () {
        playNextSong();
    });

    audioPlayer.addEventListener('ended', playNextSong);

    volumeBar.addEventListener('input', function () {
        audioPlayer.volume = volumeBar.value / 100;
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

    closePopup.addEventListener('click', function () {
        hidePopup();
    });

    fullScreenBtn.addEventListener('click', toggleFullScreen);

    audioPlayer.volume = initialVolume;
    volumeBar.value = initialVolume * 100;
});
