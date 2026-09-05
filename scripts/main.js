console.log("[Main] Script loaded");

const scrollCue = document.getElementById("scroll-cue");
const siteHeader = document.querySelector("header");
const siteFooter = document.querySelector("footer");

if (!scrollCue || !siteHeader || !siteFooter) {
    console.error("[Main] #scroll-cue, header or footer not found");
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

    if (siteFooter) {
        siteFooter.classList.toggle("is-visible", scrolled);
    }

    console.log("[Main] Scrolled:", scrolled);
}

// INIT
window.addEventListener("scroll", updateOnScroll, { passive: true });

updateOnScroll();
