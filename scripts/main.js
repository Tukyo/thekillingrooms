console.log("[Main] Script loaded");

const scrollCue = document.getElementById("scroll-cue");
const siteHeader = document.querySelector("header");

if (!scrollCue || !siteHeader) {
    console.error("[Main] #scroll-cue or header not found");
}

// CONFIG
const SCROLL_THRESHOLD = 0;

// STATE
let isScrolled = false;

// FLOW
function updateOnScroll() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;

    if (scrolled === isScrolled) { return; }

    isScrolled = scrolled;

    if (scrollCue) {
        scrollCue.classList.toggle("is-hidden", scrolled);
    }

    if (siteHeader) {
        siteHeader.classList.toggle("is-scrolled", scrolled);
    }

    console.log("[Main] Scrolled:", scrolled);
}

// INIT
window.addEventListener("scroll", updateOnScroll, { passive: true });

updateOnScroll();
