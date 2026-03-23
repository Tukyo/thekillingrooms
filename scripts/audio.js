console.log("[Audio] Script loaded");

// CONFIG
const AUDIO_PATH = "assets/audio/";
const AUDIO_FILE = "Web_Ambience.ogg";
const AUDIO_SRC = AUDIO_PATH + AUDIO_FILE;

const AUDIO_TARGET_VOLUME = 0.15;
const AUDIO_LOOP = true;

const FADE_IN_DURATION = 10.0; // seconds
const FADE_IN_INTERVAL = 50;  // ms

// STATE
let audioElement = null;
let hasStarted = false;
let fadeInterval = null;

function createAudioElement() {
    const audio = document.createElement("audio");
    audio.src = AUDIO_SRC;
    audio.loop = AUDIO_LOOP;
    audio.volume = 0;
    audio.preload = "auto";

    return audio;
}

function startFadeIn() {
    if (!audioElement) return;

    if (fadeInterval !== null) {
        clearInterval(fadeInterval);
    }

    const totalSteps = (FADE_IN_DURATION * 1000) / FADE_IN_INTERVAL;
    const volumeStep = AUDIO_TARGET_VOLUME / totalSteps;

    fadeInterval = setInterval(function () {
        if (!audioElement) return;

        let newVolume = audioElement.volume + volumeStep;

        if (newVolume >= AUDIO_TARGET_VOLUME) {
            audioElement.volume = AUDIO_TARGET_VOLUME;

            clearInterval(fadeInterval);
            fadeInterval = null;
        } else {
            audioElement.volume = newVolume;
        }
    }, FADE_IN_INTERVAL);
}

function startAudio() {
    if (hasStarted) { return; }

    console.log("[Audio] Starting audio");

    if (!audioElement) {
        audioElement = createAudioElement();
    }

    audioElement.play().then(function () {
        hasStarted = true;

        startFadeIn();
    }).catch(function (error) {
        console.error("[Audio] Playback failed:", error);
    });
}

function handleUserInteraction() {
    startAudio();

    window.removeEventListener("click", handleUserInteraction);
    window.removeEventListener("keydown", handleUserInteraction);
}

// INIT
window.addEventListener("click", handleUserInteraction);
window.addEventListener("keydown", handleUserInteraction);