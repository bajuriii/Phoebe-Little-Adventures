// ===========================
// URL PARAMETER
// ===========================

const params = new URLSearchParams(window.location.search);
const savedPage = localStorage.getItem("lastPage");
let currentStory = Number(params.get("id"));
let currentPage = Number(params.get("page"));

if (isNaN(currentStory)) {
    currentStory = savedPage ? Number(savedPage) : 0;
}

if (isNaN(currentPage)) {
    currentPage = 0;
}

if (currentStory < 0 || currentStory >= storyPages.length) {
    currentStory = 0;
}

if (currentPage < 0 || currentPage >= getCurrentStoryPages().length) {
    currentPage = 0;
}

// ===========================
// DOM ELEMENTS
// ===========================

const book = document.querySelector(".book");

const titleElement = document.getElementById("story-title");
const imageElement = document.getElementById("story-image");
const contentElement = document.getElementById("story-content");
const pageNumberElement = document.getElementById("page-number");
const readerProgressFill = document.getElementById("reader-progress-fill");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

// ===========================
// CONFIG
// ===========================

const ANIMATION_TIME = 520;
const PROGRESS_KEY = "readingProgress";
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let isAnimating = false;

function getCurrentStoryPages() {
    const story = storyPages[currentStory];

    return story.pages || [story];
}

function getPageImage(story, page) {
    if (story.metadata) {
        return `${story.metadata.assetPath}/${page.image}`;
    }

    return page.image;
}

function renderStory() {
    const story = storyPages[currentStory];
    const storyPagesList = getCurrentStoryPages();
    const page = storyPagesList[currentPage];
    const readingPercent =
        ((currentPage + 1) / storyPagesList.length) * 100;

    window.scrollTo(0, 0);
    titleElement.textContent = story.title;
    titleElement.hidden = currentPage !== 0;
    imageElement.src = getPageImage(story, page);
    imageElement.alt =
        `${story.title} page ${currentPage + 1}`;
    contentElement.textContent = page.content;
    pageNumberElement.textContent =
        `${currentPage + 1} / ${storyPagesList.length}`;
    readerProgressFill.style.width =
        `${readingPercent}%`;
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === storyPagesList.length - 1;
    saveProgress();
    updateReadingProgress();
}

function saveProgress() {
    try {
        localStorage.setItem("lastPage", currentStory);
    } catch (error) {
        console.warn("Unable to save reading progress.", error);
    }
}

function getReadingProgress() {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
}

function saveReadingProgress(percent) {
    try {
        const readingProgress = getReadingProgress();
        const savedProgress = readingProgress[currentStory] || 0;

        readingProgress[currentStory] =
            Math.max(savedProgress, percent);

        localStorage.setItem(
            PROGRESS_KEY,
            JSON.stringify(readingProgress)
        );
    } catch (error) {
        console.warn("Unable to save reading progress.", error);
    }
}

function getScrollProgress() {
    const storyPagesList = getCurrentStoryPages();

    if (storyPagesList.length > 1) {
        return Math.round(
            ((currentPage + 1) / storyPagesList.length) * 100
        );
    }

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (pageHeight <= 0) {
        return 100;
    }

    const progress =
        Math.round((window.scrollY / pageHeight) * 100);

    return Math.min(progress, 100);
}

function updateReadingProgress() {
    saveReadingProgress(getScrollProgress());
}

function nextPage() {
    const storyPagesList = getCurrentStoryPages();

    if (isAnimating) {
        return;
    }

    if (currentPage < storyPagesList.length - 1) {
        turnPage("page-turn-next", () => {
            currentPage++;
        });
    } else {
        saveReadingProgress(100);
    }
}

function previousPage() {
    if (isAnimating) {
        return;
    }

    if (currentPage > 0) {
        turnPage("page-turn-prev", () => {
            currentPage--;
        });
    }
}

function setNavigationDisabled(isDisabled) {
    prevButton.disabled = isDisabled || currentPage === 0;
    nextButton.disabled =
        isDisabled || currentPage === getCurrentStoryPages().length - 1;
}

function turnPage(className, callback) {
    if (reducedMotion.matches) {
        callback();
        renderStory();
        return;
    }

    isAnimating = true;
    setNavigationDisabled(true);
    book.classList.add(className);

    setTimeout(() => {
        callback();
        renderStory();
        setNavigationDisabled(true);
    }, ANIMATION_TIME / 2);

    setTimeout(() => {
        book.classList.remove(className);
        isAnimating = false;
        setNavigationDisabled(false);
    }, ANIMATION_TIME);
}

nextButton.addEventListener(
    "click",
    nextPage
);

prevButton.addEventListener(
    "click",
    previousPage
);

window.addEventListener(
    "scroll",
    updateReadingProgress
);

renderStory();
