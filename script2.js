// Playlist with song details
const songs = [
    {
        title: "Free Song 1",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Free Song 2",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Free Song 3",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];


let songIndex = 0;

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

let isPlaying = false;

// Load a song into the player
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
}

// Play the song
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = "Pause";
}

// Pause the song
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = "Play";
}

// Play or pause toggle
playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

// Next song
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar
audio.addEventListener("timeupdate", (e) => {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
});

// Seek song by clicking progress bar
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Auto-play next song when current ends
audio.addEventListener("ended", nextSong);

// Load the first song on page load
loadSong(songs[songIndex]);
