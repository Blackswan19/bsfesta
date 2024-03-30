document.addEventListener('DOMContentLoaded', function () {
    var playButtons = document.querySelectorAll('.play-button');
    var audioPlayer = new Audio();
    var volumeBar = document.getElementById('volume-bar');
    var backBtn = document.getElementById('back-btn');
    var forwardBtn = document.getElementById('forward-btn');
    var nextBtn = document.getElementById('next-btn');
    var playPauseBtn = document.getElementById('play-pause-btn');
    var isPlaying = false;
    var currentSongIndex = localStorage.getItem('currentSongIndex') || 0;
    var playbackPosition = localStorage.getItem('playbackPosition') || 0;
    var hasInteracted = false;

    function playAudio(audioSrc) {
        audioPlayer.src = audioSrc;
        audioPlayer.currentTime = 0; // Reset playback position to start
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.textContent = 'Pause';
        highlightCurrentSong();
    }

    function pauseAudio() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
        playbackPosition = audioPlayer.currentTime;
        localStorage.setItem('playbackPosition', playbackPosition);
    }

    function playRandomSong() {
        currentSongIndex = Math.floor(Math.random() * playButtons.length);
        var randomSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playAudio(randomSong);
    }

    function playCurrentSong() {
        var currentSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playAudio(currentSong);
        highlightCurrentSong();
    }

    function playNextSong() {
        var randomIndex = Math.floor(Math.random() * playButtons.length);
        currentSongIndex = randomIndex;
        var nextSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playbackPosition = 0;
        playAudio(nextSong);
        document.getElementById('skip-message').textContent = 'Skipped to next song: ' + playButtons[currentSongIndex].textContent;
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
      

    playPauseBtn.addEventListener('click', function () {
        if (isPlaying) {
            pauseAudio();
        } else {
            if (hasInteracted && audioPlayer.src) {
                audioPlayer.play();
                isPlaying = true;
                playPauseBtn.textContent = 'Pause';
            } else {
                if (playbackPosition > 0 && audioPlayer.src) {
                    audioPlayer.currentTime = playbackPosition;
                    audioPlayer.play();
                    isPlaying = true;
                    playPauseBtn.textContent = 'Pause';
                } else {
                    playRandomSong();
                    hasInteracted = true;
                }
            }
        }
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

    backBtn.addEventListener('click', function () {
        audioPlayer.currentTime -= 5;
    });

    forwardBtn.addEventListener('click', function () {
        audioPlayer.currentTime += 5;
    });

    nextBtn.addEventListener('click', function () {
        playNextSong();
    });

    audioPlayer.addEventListener('ended', function () {
        playNextSong();
    });

    volumeBar.addEventListener('input', function () {
        audioPlayer.volume = volumeBar.value;
    });

    window.addEventListener('beforeunload', function () {
        localStorage.setItem('currentSongIndex', currentSongIndex);
        localStorage.setItem('playbackPosition', playbackPosition);
    });
});
// const timeDelay = 5000; // 5 seconds (in milliseconds)

// setTimeout(function() {
//   window.close();
// }, timeDelay);

