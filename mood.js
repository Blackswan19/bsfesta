document.addEventListener('DOMContentLoaded', function () {
    var playButtons = document.querySelectorAll('.play-button');
    var audioPlayer = new Audio();
    var volumeBar = document.getElementById('volume-bar');
    var backBtn = document.getElementById('back-btn');
    var forwardBtn = document.getElementById('forward-btn');
    var nextBtn = document.getElementById('next-btn');
    var playPauseBtn = document.getElementById('play-pause-btn');
    var isPlaying = false;
    var currentSongIndex = 0;
    var playbackPosition = 0; 
    var hasInteracted = false;

    function playAudio(audioSrc) {
       audioPlayer.src = audioSrc;
       audioPlayer.currentTime = playbackPosition;
       audioPlayer.play();
       isPlaying = true;
       playPauseBtn.textContent = 'Pause';
       playbackPosition = 0;
       highlightCurrentSong();
    }

    function pauseAudio() {
       audioPlayer.pause();
       isPlaying = false;
       playPauseBtn.textContent = 'Play';
       playbackPosition = audioPlayer.currentTime;
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
       playButtons.forEach(function (button) {
          button.classList.remove('playing');
          var songTitle = button.parentElement.querySelector('.song-title');
          if (songTitle) {
             songTitle.classList.remove('highlighted'); // Remove any existing highlighting class
             songTitle.innerHTML = songTitle.textContent.replace('<i class="fa-solid fa-chart-simple"></i>', '<i class="fa-solid fa-music"></i>'); // Replace the icon class
          }
       });

       playButtons[currentSongIndex].classList.add('playing');
       var currentSongTitle = playButtons[currentSongIndex].parentElement.querySelector('.song-title');
       if (currentSongTitle) {
          currentSongTitle.classList.add('highlighted'); // Add highlighting class
          currentSongTitle.innerHTML = '<i class="fa-solid fa-chart-simple"></i> ' + currentSongTitle.textContent;
       }
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
             playRandomSong();
             hasInteracted = true;
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
 });