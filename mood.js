document.addEventListener('DOMContentLoaded', function () {
    var playButtons = document.querySelectorAll('.play-button');
    var audioPlayer = new Audio();
    var volumeBar = document.getElementById('volume-bar');
    var previousBtn = document.getElementById('previous-btn');
    var nextBtn = document.getElementById('next-btn');
    var playPauseBtn = document.getElementById('play-pause-btn');
    var progressBar = document.getElementById('progress-bar');
    var repeatBtn = document.getElementById('repeat-btn'); // Repeat button
    var isPlaying = false;
    var currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;
    var playbackPosition = parseFloat(localStorage.getItem('playbackPosition')) || 0;
    var hasInteracted = false;
    var videoElement = document.getElementById('video-background');
    var initialVolume = 0.2;
    var isVolumeChanged = false;
    var isRepeating = false; // Single repeat mode

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

    function playAudioFromPosition(audioSrc, position) {
        audioPlayer.src = audioSrc;
        audioPlayer.currentTime = position;
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        highlightCurrentSong();
    }

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
        } else {
            if (hasInteracted && audioPlayer.src) {
                playAudioFromPosition(audioPlayer.src, playbackPosition);
            } else {
                if (playbackPosition > 0 && audioPlayer.src) {
                    playAudioFromPosition(audioPlayer.src, playbackPosition);
                } else {
                    playCurrentSong();
                    hasInteracted = true;
                }
            }
        }
    }

    function playCurrentSong() {
        var currentSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playAudio(currentSong);
        highlightCurrentSong();
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
        currentSongIndex++;
        if (currentSongIndex >= playButtons.length) {
            currentSongIndex = 0;
        }
        var nextSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playbackPosition = 0;
        playAudio(nextSong);
    }

    function playRandomSong() {
        currentSongIndex = Math.floor(Math.random() * playButtons.length);
        var randomSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playbackPosition = 0;
        playAudio(randomSong);
    }

    function highlightCurrentSong() {
        var songItems = document.querySelectorAll('#song-list li');
        var currentSongDetails = document.getElementById('current-song-details');
        
        songItems.forEach(function (item, index) {
            // Remove highlighting from all songs
            item.classList.remove('playing');
            var songTitle = item.querySelector('.song-title');
            var playIcon = item.querySelector('.play-button');
            
            if (songTitle) {
                songTitle.classList.remove('highlighted');
                songTitle.style.color = ''; // Reset to default color
                songTitle.style.fontWeight = ''; // Reset to default font weight
                playIcon.className = 'fa-solid fa-play play-button'; // Reset all to play icon
            }
            
            // Highlight the current song
            if (index === currentSongIndex) {
                item.classList.add('playing');
                if (songTitle) {
                    songTitle.classList.add('highlighted');
                    playIcon.className = 'fa-solid fa-chart-simple play-button'; // Update icon for current song
                    
                    // Update the current song details in the paragraph element
                    currentSongDetails.textContent = '' + songTitle.textContent;
                }
            }
        });
    }

    function toggleRepeat() {
        isRepeating = !isRepeating; // Toggle repeat mode
    
        var repeatIcon = repeatBtn.querySelector('i'); // Get the <i> element inside the repeat button
    
        if (isRepeating) {
            repeatIcon.classList.add('repeat-active'); // Add class for active state
            repeatBtn.setAttribute('title', 'Repeating this song'); // Update tooltip
        } else {
            repeatIcon.classList.remove('repeat-active'); // Remove class for inactive state
            repeatBtn.setAttribute('title', 'Not repeating'); // Update tooltip
        }
    }
    

    function handleAudioEnd() {
        if (isRepeating) {
            // Repeat the current song
            playAudioFromPosition(audioPlayer.src, 0);
        } else {
            // Play a random song
            playRandomSong();
        }
    }

    playPauseBtn.addEventListener('click', function () {
        togglePlayPause();
    });

    playButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            if (isPlaying && currentSongIndex === index) {
                pauseAudio();
            } else {
                currentSongIndex = index;
                playCurrentSong();
            }
        });
    });

    previousBtn.addEventListener('click', function () {
        playPreviousSong();
    });

    nextBtn.addEventListener('click', function () {
        playNextSong(); // Play the next song when "Next" button is clicked
    });

    repeatBtn.addEventListener('click', function () {
        toggleRepeat();
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
        var seekTime = (offsetX / width) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;

        function moveProgress(e) {
            var touch = e.touches[0];
            var moveX = touch.clientX - rect.left;
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

    progressBar.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });

    window.addEventListener('beforeunload', function () {
        localStorage.removeItem('currentSongIndex');
        localStorage.removeItem('playbackPosition');
        audioPlayer.pause();
    });

    audioPlayer.addEventListener('ended', function () {
        pauseVideo();
    });

    function pauseVideo() {
        videoElement.pause();
        videoElement.currentTime = 0;
    }
});

function toggleDropdown() {
    var dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function (event) {
    if (!event.target.matches('.dropdown-toggle')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};
