     // Toggle display of the upload options
     function toggleUploadOptions() {
        const uploadOptions = document.getElementById('uploadOptions');
        if (uploadOptions.style.display === 'none' || uploadOptions.style.display === '') {
          uploadOptions.style.display = 'block';
          // Add a click listener to close the upload options if clicked outside
          document.addEventListener('click', closeUploadOptionsOnClickOutside);
        } else {
          uploadOptions.style.display = 'none';
          // Remove the event listener when the options are closed
          document.removeEventListener('click', closeUploadOptionsOnClickOutside);
        }
      }
      
      // Close the upload options when clicking outside the dialog
      function closeUploadOptionsOnClickOutside(event) {
        const uploadOptions = document.getElementById('uploadOptions');
        if (!uploadOptions.contains(event.target) && event.target.tagName !== 'BUTTON') {
          uploadOptions.style.display = 'none';
          document.removeEventListener('click', closeUploadOptionsOnClickOutside);
        }
      }
      
      function setImageUrl() {
        const imageUrl = document.getElementById('imageUrlInput').value;
        if (imageUrl) {
          // Set the background image using the provided URL
          document.body.style.backgroundImage = `url(${imageUrl})`;
          document.body.style.backgroundSize = "105%";
          document.body.style.backgroundRepeat = "no-repeat";
      
          // Remove video background if exists
          const videoElement = document.getElementById('bgVideo');
          if (videoElement) {
            videoElement.remove();
          }
      
          // Store the image URL in localStorage
          localStorage.setItem('backgroundMedia', JSON.stringify({ type: 'image', src: imageUrl }));
      
          // Hide the upload options dialog
          document.getElementById('uploadOptions').style.display = 'none';
        } else {
        }
      }
      
      function setBackground(event) {
        const file = event.target.files[0];
        if (file) {
          const fileType = file.type.split('/')[0]; // Get whether the file is an 'image' or 'video'
          const reader = new FileReader();
      
          reader.onload = function (e) {
            const mediaUrl = e.target.result;
      
            if (fileType === 'image') {
              // Set the background image
              document.body.style.backgroundImage = `url(${mediaUrl})`;
              document.body.style.backgroundSize = "105%";
              document.body.style.backgroundRepeat = "no-repeat";
      
              // Remove video background if exists
              const videoElement = document.getElementById('bgVideo');
              if (videoElement) {
                videoElement.remove();
              }
      
              // Store the image URL in localStorage
              localStorage.setItem('backgroundMedia', JSON.stringify({ type: 'image', src: mediaUrl }));
            } else if (fileType === 'video') {
              // Remove image background
              document.body.style.backgroundImage = '';
      
              // Create and set the background video
              let videoElement = document.getElementById('bgVideo');
              if (!videoElement) {
                videoElement = document.createElement('video');
                videoElement.id = 'bgVideo';
                videoElement.setAttribute('autoplay', 'true');
                videoElement.setAttribute('loop', 'true');
                videoElement.setAttribute('muted', 'true');
                videoElement.style.position = 'fixed';
                videoElement.style.top = '0';
                videoElement.style.left = '0';
                videoElement.style.width = '105%';
                videoElement.style.height = '105%';
                videoElement.style.objectFit = '105%';
                videoElement.style.zIndex = '-1'; // Ensures it stays behind the content
                document.body.appendChild(videoElement);
              }
              videoElement.src = mediaUrl;
      
              // Store the video URL in localStorage
              localStorage.setItem('backgroundMedia', JSON.stringify({ type: 'video', src: mediaUrl }));
            }
      
            // Hide the upload options dialog
            document.getElementById('uploadOptions').style.display = 'none';
            document.removeEventListener('click', closeUploadOptionsOnClickOutside);
          };
      
          reader.readAsDataURL(file);
        }
      }
 // Function to toggle the search bar visibility
 function toggleSearchBar() {
    const searchBar = document.getElementById("searchBar");
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
  }

  

  // Function to load either the stored image or video as background
  function loadStoredBackground() {
    const storedMedia = localStorage.getItem('backgroundMedia');
    const defaultImageUrl = 'https://images.unsplash.com/photo-1714779573220-39c843a7daa3?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    
    if (storedMedia) {
      const { type, src } = JSON.parse(storedMedia);

      if (type === 'image') {
        // Set the stored image as the background
        document.body.style.backgroundImage = `url(${src})`;
        document.body.style.backgroundSize = "105%";
        document.body.style.backgroundRepeat = "no-repeat";
      } else if (type === 'video') {
        // Create and set the stored video as the background
        let videoElement = document.getElementById('bgVideo');
        if (!videoElement) {
          videoElement = document.createElement('video');
          videoElement.id = 'bgVideo';
          videoElement.setAttribute('autoplay', 'true');
          videoElement.setAttribute('loop', 'true');
          videoElement.setAttribute('muted', 'true');
          videoElement.style.position = 'fixed';
          videoElement.style.top = '0';
          videoElement.style.left = '0';
          videoElement.style.width = '100%';
          videoElement.style.height = '100%';
          videoElement.style.objectFit = 'cover';
          videoElement.style.zIndex = '-1';
          document.body.appendChild(videoElement);
        }
        videoElement.src = src;
      }
    } else {
      // If no stored media, set default background image
      document.body.style.backgroundImage = `url(${defaultImageUrl})`;
      document.body.style.backgroundSize = "105%";
      document.body.style.backgroundRepeat = "no-repeat";
    }
  }

  // Load the background (image or video) when the page loads
  window.onload = loadStoredBackground;      
  let player;

function modifyLink() {
    const e = document.getElementById("userLink").value;
    let t = e;

    if (e.toLowerCase().includes("youtu.be")) {
        t = `https://www.youtube.com/watch?v=${e.split("youtu.be/")[1].split("?")[0]}`;
    } else if (e.toLowerCase().includes("youtube.com")) {
        t = e;
    }

    if (t.includes("youtube.com/watch?v=")) {
        playAudio(t);
        document.getElementById("userLink").value = ""; // Clear input after modification
    } else {
        document.getElementById("result").innerHTML = "Invalid URL";
    }
}

function playAudio(url) {
    // Extract the video ID from the YouTube URL
    const videoId = url.split("v=")[1].split("&")[0];

    if (player) {
        player.loadVideoById(videoId); // Load the new video ID if player already exists
    } else {
        // Initialize the player if it doesn't exist
        player = new YT.Player('audioPlayer', {
            height: '0',  // Hide the video by setting height to 0
            width: '0',   // Hide the video by setting width to 0
            videoId: videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    // Show the play/pause button when audio is ready to be played
    document.getElementById("playPauseButton").style.display = "block";
    document.getElementById("playPauseButton").textContent = "Play";
}

function onPlayerReady(event) {
    event.target.playVideo();
    document.getElementById("playPauseButton").textContent = "Stop";
}

function togglePlayPause() {
    if (player) {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            document.getElementById("playPauseButton").textContent = "Play";
        } else {
            player.playVideo();
            document.getElementById("playPauseButton").textContent = "Stop";
        }
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
    document.getElementById("playPauseButton").textContent = "Stop";
}

// Load the YouTube IFrame API asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


 // Get the play button and the audio element
 const playButton = document.getElementById('playButton');
 const audioPlayer = document.getElementById('audioPlayer');

 // Play the audio when the button is clicked
 playButton.addEventListener('click', function() {
   if (audioPlayer.paused) {
     audioPlayer.play();
   
   } else {
     audioPlayer.pause();
   }
 });
 
    // Load the YouTube IFrame API asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Get the input element
    const inputField = document.getElementById('userInput');

    // Check if there is already a stored input and set it as the value
    if(localStorage.getItem('userText')) {
        inputField.value = localStorage.getItem('userText');
    }

    // Save input on keyup (user typing)
    inputField.addEventListener('keyup', function() {
        localStorage.setItem('userText', inputField.value);
    });