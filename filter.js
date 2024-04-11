var currentSongIndex = 0;
var songs = [];
var isShuffled = false;
var shuffledSongs = [];

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

document.addEventListener('DOMContentLoaded', function () {
    var albumLinksContainer = document.getElementById('album-links');
    var albumLinks = albumLinksContainer.querySelectorAll('.album');
    var albumsContainer = document.getElementById('albums');
    var modal = document.getElementById("myModal");
    var modalTitle = modal.querySelector('.modal-album-title');
    var modalImage = modal.querySelector('.modal-album-image');
    var modalSongList = modal.querySelector('.modal-song-list');
    var span = document.getElementsByClassName("close")[0];

    albumLinks.forEach(function(albumLink) {
        var album = albumLink.cloneNode(true);

        album.addEventListener('click', function () {
            modalTitle.textContent = album.dataset.title;
            modalImage.src = album.querySelector('img').src;
            modalSongList.innerHTML = '';

            songs = album.querySelectorAll('.song-list li');
            songs.forEach(function(song, index) {
                var songCopy = song.cloneNode(true);
                songCopy.dataset.index = index;
                songCopy.addEventListener('click', function() {
                    currentSongIndex = index;
                    playSong(song.dataset.src);
                });
                modalSongList.appendChild(songCopy);
            });

            modal.style.display = "block";
        });

        albumsContainer.appendChild(album);
    });

    modalImage.addEventListener('click', function() {
        if (modalTitle.textContent === '' && modalSongList.innerHTML === '') {
            modalTitle.textContent = albumLinks[0].dataset.title;
            modalSongList.innerHTML = '';
            songs = albumLinks[0].querySelectorAll('.song-list li');
            songs.forEach(function(song, index) {
                var songCopy = song.cloneNode(true);
                songCopy.dataset.index = index;
                songCopy.addEventListener('click', function() {
                    currentSongIndex = index;
                    playSong(song.dataset.src);
                });
                modalSongList.appendChild(songCopy);
            });
        } else {
            modalTitle.textContent = '';
            modalSongList.innerHTML = '';
        }
    });

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

function playSong(src) {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = src;
    audioPlayer.play();
    document.getElementById('play-pause-btn').textContent = 'Pause';
}

function pauseSong() {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
    document.getElementById('play-pause-btn').textContent = 'Play';
}

function togglePlayPause() {
    var audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('play-pause-btn').textContent = 'Pause';
    } else {
        audioPlayer.pause();
        document.getElementById('play-pause-btn').textContent = 'Play';
    }
}

function previousSong() {
    var audioPlayer = document.getElementById('audioPlayer');
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audioPlayer.src = songs[currentSongIndex].dataset.src;
    audioPlayer.play();
    document.getElementById('play-pause-btn').textContent = 'Pause';
}


var volumeBar = document.getElementById('volume-bar');
var audioPlayer = document.getElementById('audioPlayer');

volumeBar.addEventListener('input', function() {
    var volumeValue = parseFloat(volumeBar.value);
    audioPlayer.volume = volumeValue;
});

function nextSong() {
    var audioPlayer = document.getElementById('audioPlayer');
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
    } else {
        var nextAlbumIndex = Array.from(albumLinksContainer.children).indexOf(modal.previousElementSibling) + 1;
        if (nextAlbumIndex < albumLinksContainer.children.length) {
            var nextAlbum = albumLinksContainer.children[nextAlbumIndex];
            nextAlbum.click();
            return;
        }
    }
    audioPlayer.src = songs[currentSongIndex].dataset.src;
    audioPlayer.play();
    document.getElementById('play-pause-btn').textContent = 'Pause';
}

playSong(songs[currentSongIndex].dataset.src);

function toggleDropdown() {
    var dropdownContent = document.getElementById("myDropdown");
    dropdownContent.classList.toggle("show");
  }
  
  function displayText(sectionId) {
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.display = "none"; // Hide all sections
    }
    document.getElementById(sectionId).style.display = "block"; // Show selected section
}



