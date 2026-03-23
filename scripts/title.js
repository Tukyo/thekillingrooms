console.log("[Title] Script loaded");

const titleElement = document.getElementById("title");

if (!titleElement) {
    console.error("[Title] #title element not found");
}

// CONFIG
const TITLE_TEXTS = [
    "The Killing Rooms",
    "Coming Soon To PC"
];

const DISPLAY_DURATION = 10000;
const FADE_DURATION = 1000;
const INITIAL_FADE_DURATION = 5000;

// STATE
let currentTitleIndex = 0;

// INIT
titleElement.textContent = TITLE_TEXTS[currentTitleIndex];
titleElement.classList.add("fade-out");

console.log("[Title] Initial text set:", TITLE_TEXTS[currentTitleIndex]);

// FORCE INITIAL FADE WITH CUSTOM DURATION
titleElement.style.transition = `opacity ${INITIAL_FADE_DURATION}ms ease`;

requestAnimationFrame(() => {
    titleElement.classList.remove("fade-out");
    titleElement.classList.add("fade-in");

    console.log("[Title] Initial fade-in triggered with duration:", INITIAL_FADE_DURATION);

    // RESET BACK TO DEFAULT AFTER FIRST FADE
    setTimeout(() => {
        titleElement.style.transition = "";
        console.log("[Title] Transition reset to CSS default");

        startTitleLoop();
    }, INITIAL_FADE_DURATION);
});

// FLOW
function startTitleLoop() {
    console.log("[Title] Starting title loop");

    setTimeout(() => {
        cycleText();
    }, DISPLAY_DURATION);
}

function cycleText() {
    console.log("[Title] Cycling text index:", currentTitleIndex);

    // FADE OUT
    titleElement.classList.remove("fade-in");
    titleElement.classList.add("fade-out");

    console.log("[Title] Fade out triggered");

    setTimeout(() => {
        // ADVANCE INDEX IN ORDER
        currentTitleIndex = (currentTitleIndex + 1) % TITLE_TEXTS.length;

        const nextText = TITLE_TEXTS[currentTitleIndex];
        titleElement.textContent = nextText;

        console.log("[Title] Text updated to:", nextText);

        // FADE IN
        titleElement.classList.remove("fade-out");
        titleElement.classList.add("fade-in");

        console.log("[Title] Fade in triggered");

        setTimeout(() => {
            cycleText();
        }, DISPLAY_DURATION);

    }, FADE_DURATION);
}