document.addEventListener("DOMContentLoaded", function() {
    // Get current date
    const currentDate = new Date();
    // Define the expiration date (10 days from now)
    const expirationDate = new Date();
    expirationDate.setDate(currentDate.getDate() + 10);

    // Check if the current date is less than the expiration date
    if (currentDate <= expirationDate) {
        // Select only the specific song list items by their titles
        const songTitles = ["In My Bed","Style"];
        const songs = document.querySelectorAll("#song-list li");
        
        songs.forEach(song => {
            const title = song.querySelector(".song-title").innerText;
            if (songTitles.includes(title)) {
                // Append "(New)" to the song title
                const newTag = document.createElement("span");
                newTag.className = "new-tag"; // Optional: Add a class for styling
                newTag.innerText = "New";
                song.querySelector(".song-title").appendChild(newTag);
            }
        });
    }
});
