console.log("[Gallery] Script loaded");

const galleryThumbs = Array.from(document.querySelectorAll("#gallery li button"));
const galleryImages = galleryThumbs.map(function (thumb) {
    return thumb.querySelector("img");
});

const featuredButton = document.getElementById("gallery-featured");
const featuredImage = featuredButton ? featuredButton.querySelector("img") : null;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxClose = document.getElementById("lightbox-close");

if (!lightbox || !featuredImage || galleryThumbs.length === 0) {
    console.error("[Gallery] Required gallery elements not found");
}

// CONFIG
const SELECTED_CLASS = "is-selected";

// STATE
let currentGalleryIndex = 0;
let lastFocusedElement = null;

// FLOW
function selectImage(index) {
    const image = galleryImages[index];

    if (!image) { return; }

    currentGalleryIndex = index;

    featuredImage.src = image.src;
    featuredImage.alt = image.alt;

    galleryThumbs.forEach(function (thumb, thumbIndex) {
        thumb.classList.toggle(SELECTED_CLASS, thumbIndex === index);
    });

    console.log("[Gallery] Selected image:", index);
}

function showInLightbox(index) {
    const image = galleryImages[index];

    if (!image) { return; }

    currentGalleryIndex = index;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
}

function openLightbox() {
    lastFocusedElement = document.activeElement;

    showInLightbox(currentGalleryIndex);

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";

    lightboxClose.focus();

    console.log("[Gallery] Lightbox opened");
}

function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";

    // KEEP THE RAIL IN SYNC WITH WHATEVER THE LIGHTBOX LANDED ON
    selectImage(currentGalleryIndex);

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }

    console.log("[Gallery] Lightbox closed");
}

function step(offset) {
    const total = galleryImages.length;
    const nextIndex = (currentGalleryIndex + offset + total) % total;

    showInLightbox(nextIndex);
}

function handleKeydown(event) {
    if (lightbox.hidden) { return; }

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        step(-1);
    } else if (event.key === "ArrowRight") {
        step(1);
    }
}

// INIT
galleryThumbs.forEach(function (thumb, index) {
    thumb.addEventListener("click", function () {
        selectImage(index);
    });
});

featuredButton.addEventListener("click", openLightbox);

lightboxPrev.addEventListener("click", function () {
    step(-1);
});

lightboxNext.addEventListener("click", function () {
    step(1);
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

window.addEventListener("keydown", handleKeydown);

selectImage(0);
