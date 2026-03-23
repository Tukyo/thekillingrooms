console.log("[Hero] Script loaded");

const heroContainer = document.getElementById("hero");

if (!heroContainer) {
    console.error("[Hero] #hero container not found");
}

// CONFIG
const TOTAL_VIDEOS = 6;
const VIDEO_PATH = "assets/video/";
const VIDEO_PREFIX = "Hero_";
const VIDEO_EXT = ".mp4";

let currentHeroIndex = 0;

const videoElement = document.createElement("video");
videoElement.autoplay = true;
videoElement.muted = true;
videoElement.playsInline = true;
videoElement.preload = "auto";

videoElement.style.width = "100%";
videoElement.style.height = "100%";
videoElement.style.objectFit = "cover";

heroContainer.appendChild(videoElement);

function getVideoSrc(index) {
    const paddedIndex = index.toString().padStart(2, "0");
    const src = VIDEO_PATH + VIDEO_PREFIX + paddedIndex + VIDEO_EXT;

    return src;
}

function loadVideo(index) {
    console.log("[Hero] Loading video:", index);

    const src = getVideoSrc(index);

    videoElement.src = src;
    videoElement.load();
}

videoElement.onended = function () {
    console.log("[Hero] Video ended:", currentHeroIndex);

    currentHeroIndex++;

    if (currentHeroIndex >= TOTAL_VIDEOS) {
        console.log("[Hero] Looping back to start");
        currentHeroIndex = 0;
    }

    loadVideo(currentHeroIndex);
};

// START
loadVideo(currentHeroIndex);