console.log("[Main] Script loaded");

const scrollCue = document.getElementById("scroll-cue");

if (!scrollCue) {
    console.error("[Main] #scroll-cue element not found");
}

// CONFIG
const SCROLL_CUE_HIDDEN_CLASS = "is-hidden";
const SCROLL_CUE_THRESHOLD = 0;

// STATE
let isScrollCueHidden = false;

// FLOW
function updateScrollCue() {
    if (!scrollCue) { return; }

    const shouldHide = window.scrollY > SCROLL_CUE_THRESHOLD;

    if (shouldHide === isScrollCueHidden) { return; }

    isScrollCueHidden = shouldHide;

    if (shouldHide) {
        scrollCue.classList.add(SCROLL_CUE_HIDDEN_CLASS);
    } else {
        scrollCue.classList.remove(SCROLL_CUE_HIDDEN_CLASS);
    }

    console.log("[Main] Scroll cue hidden:", shouldHide);
}

// INIT
window.addEventListener("scroll", updateScrollCue, { passive: true });

updateScrollCue();
