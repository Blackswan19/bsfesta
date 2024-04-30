document.addEventListener('DOMContentLoaded', function () {
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
            


    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
        document.getElementById('player-interface').style.display = 'block'; 
    }, 1500);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
        playPauseBtn.textContent = 'Pause';
        highlightCurrentSong();
    }
    
    window.addEventListener('beforeunload', function () {
        if (!isPlaying) {
            localStorage.removeItem('currentSongIndex');
            localStorage.removeItem('playbackPosition');
        } else {
            localStorage.setItem('currentSongIndex', currentSongIndex);
            localStorage.setItem('playbackPosition', playbackPosition);
        }
    });
    
    function playAudio(audioSrc) {
        playAudioFromPosition(audioSrc, 0);
        highlightCurrentSong();
    }

    function pauseAudio() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
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
                    playRandomSong();
                    hasInteracted = true;
                }
            }
        }
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

    // function playNextSong() {
    //     currentSongIndex++;
    //     if (currentSongIndex >= playButtons.length) {
    //         currentSongIndex = 0;
    //     }
    //     var nextSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
    //     playbackPosition = 0;
    //     playAudio(nextSong);
    //     document.getElementById('skip-message').textContent = 'Skipped to next song: ' + playButtons[currentSongIndex].textContent;
    // }

    function playPreviousSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playButtons.length - 1;
        }
        var previousSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        playbackPosition = 0;
        playAudio(previousSong);
        document.getElementById('skip-message').textContent = 'Skipped to previous song: ' + playButtons[currentSongIndex].textContent;
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
        playRandomSong();
    });


    


    audioPlayer.addEventListener('ended', playRandomSong);

    function playRandomSong() {
        currentSongIndex = Math.floor(Math.random() * playButtons.length);
        var randomSong = playButtons[currentSongIndex].parentElement.getAttribute('data-src');
        audioPlayer.src = randomSong;
        audioPlayer.play();
        highlightCurrentSong() 
    }
    



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
        if (!isPlaying) {
            localStorage.removeItem('currentSongIndex');
            localStorage.removeItem('playbackPosition');
        } else {
            localStorage.setItem('currentSongIndex', currentSongIndex);
            localStorage.setItem('playbackPosition', playbackPosition);
        }
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
    var dropdownContent = document.getElementById("myDropdown");
    dropdownContent.classList.toggle("show");
}

function displayText(sectionId) {
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    document.getElementById(sectionId).style.display = "block";
}
window.addEventListener('beforeunload', function (event) {
    var confirmationMessage = "Do you want to refresh the page?";
    event.returnValue = confirmationMessage; 
    return confirmationMessage; 
});


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

document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = document.getElementById('audioPlayer');
    var playButtons = document.querySelectorAll('.play-button');
    var songs = document.querySelectorAll('.songssad li');
    var nowPlaying = document.getElementById('nowPlaying');
    var currentTrackDisplay = document.getElementById('currentTrack');
    var currentTrackIndex = 0;

    function playSong(index) {
        var song = songs[index];
        var songTitle = song.querySelector('.song-title').textContent;
        var songSrc = song.getAttribute('data-src');

        console.log("Playing:", songTitle); // Debug: log current song
        currentTrackDisplay.textContent = songTitle;
        audioPlayer.src = songSrc;
        audioPlayer.play();
        nowPlaying.style.display = 'block'; // Ensure this line executes
    }

    playButtons.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
            playSong(index);
        });
    });

    audioPlayer.addEventListener('ended', function() {
        var nextTrackIndex = (currentTrackIndex + 1) % songs.length;
        playSong(nextTrackIndex);
    });
});
