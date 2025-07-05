document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById("hamburger")
    const favbtn = document.getElementById("favbtn")
    const favicon = document.getElementById("favicon")
    const sidebar = document.getElementById("sidebar")
    const backicon = document.getElementById("backicon")
    const songlist = document.getElementById("songlist")
    const prevbtn = document.getElementById("prevbtn")
    const playbtn = document.getElementById("playbtn")
    const playicon = playbtn.querySelector("i")
    const nextbtn = document.getElementById("nextbtn")
    const volumectrl = document.getElementById("volumectrl")
    const shufflebtn = document.getElementById("shufflebtn")
    const repeatbtn = document.getElementById("repeatbtn")
    const queuebtn = document.getElementById("queuebtn")
    const display = document.getElementById("display")
    const progressbar = document.getElementById("progressbar")
    const discIcon = display.querySelector("i")
    const audioElement = document.createElement('audio');
    let currentSongIndex = 0
    let isPlaying = false;
    audioElement.volume = volumectrl.value / 100;


    hamburger.addEventListener('click', function opensidebar() {
        sidebar.classList.add("active");
    });

    backicon.addEventListener('click', function closesidebar() {
        sidebar.classList.remove("active");
    });
    favbtn.addEventListener('click', function favorite() {
        if (favicon.classList.contains("far")) {
            favicon.classList.remove("far")
            favicon.classList.add("fas")
        } else {
            favicon.classList.remove("fas")
            favicon.classList.add("far")
        }
    })
    const songs = Array.from(songlist.getElementsByTagName('li'));
    
    function playSong(index) {
        const songItem = songs[index];
        const songSrc = songItem.getAttribute('data-src');
        if (audioElement.src !== songSrc) {
            audioElement.src = songSrc;
        }
        audioElement.play()
        isPlaying = true
        updatePlayBtn()
        discIcon.classList.add("fa-spin-pulse")
    }
    function pauseSong() {
        audioElement.pause()
        isPlaying = false
        updatePlayBtn()
        discIcon.classList.remove("fa-spin-pulse")
    }

    function updatePlayBtn() {
        if (isPlaying) {
            playicon.classList.remove("fa-circle-play")
            playicon.classList.add("fa-circle-pause")
        } else {
            playicon.classList.remove("fa-circle-pause")
            playicon.classList.add("fa-circle-play")
        }
    }
    playbtn.addEventListener("click", function() {
        if (isPlaying) {
            pauseSong()
        } else {
            playSong(currentSongIndex)
        }
    })
    prevbtn.addEventListener("click",
        function previousSong() {
            if (currentSongIndex > 0) {
                currentSongIndex--
            } else {
                currentSongIndex = songs.length - 1
            }
            playSong(currentSongIndex)
        })
    nextbtn.addEventListener("click",
        function nextSong() {
            if (currentSongIndex < songs.length - 1) {
                currentSongIndex++
            } else {
                currentSongIndex = 0
            }
            playSong(currentSongIndex)
        })


    function updateProgress() {
        if (audioElement.duration) {
            const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
            progressbar.value = progressPercent;
        }
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioElement.duration;
        audioElement.currentTime = (clickX / width) * duration;
    }
    progressbar.addEventListener('input', function() {
        const seekTime = (progressbar.value / 100) * audioElement.duration;
        audioElement.currentTime = seekTime;
    });
    audioElement.addEventListener('timeupdate', updateProgress);
    volumectrl.addEventListener('input', function() {
        audioElement.volume = volumectrl.value / 100;
        console.log(audioElement.volume)
    });
});