// ===========================
// URL PARAMETER & VALIDATION
// ===========================

const params = new URLSearchParams(window.location.search);
let currentStory = Number(params.get("id"));
let currentPage = Number(params.get("page"));

// Validate story data exists
if (!Array.isArray(storyPages) || storyPages.length === 0) {
    console.error("Story data not loaded properly");
    currentStory = 0;
    currentPage = 0;
} else {
    // Get last viewed story or default to first
    const savedPage = StorageManager.getLastPage();
    if (isNaN(currentStory)) {
        currentStory = (savedPage >= 0 && savedPage < storyPages.length) ? savedPage : 0;
    }

    // Validate current page
    if (isNaN(currentPage)) {
        currentPage = 0;
    }

    // Clamp story index to valid range
    if (currentStory < 0 || currentStory >= storyPages.length) {
        console.warn(`Invalid story ID: ${currentStory}, defaulting to 0`);
        currentStory = 0;
    }

    // Clamp page index to valid range
    if (currentPage < 0 || currentPage >= getCurrentStoryPages().length) {
        console.warn(`Invalid page ID: ${currentPage}, defaulting to 0`);
        currentPage = 0;
    }
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
const readAloudButton = document.getElementById("read-aloud-btn");

// Validate all required DOM elements exist
const requiredElements = {
    book,
    titleElement,
    imageElement,
    contentElement,
    pageNumberElement,
    readerProgressFill,
    prevButton,
    nextButton,
    readAloudButton
};

const missingElements = Object.entries(requiredElements)
    .filter(([name, el]) => !el)
    .map(([name]) => name);

if (missingElements.length > 0) {
    const error = `Cannot initialize story page: Missing elements [${missingElements.join(', ')}]`;
    console.error("Missing required DOM elements:", missingElements);
    throw new Error(error);
}

// ===========================
// CONFIG
// ===========================

const ANIMATION_TIME = 520;
const PROGRESS_KEY = "readingProgress";
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let isAnimating = false;

/**
 * Preload an image to cache for smoother page turns
 * @param {string} src - Image source URL
 */
function preloadImage(src) {
    if (!src) return;
    const img = new Image();
    img.src = src;
}

function getCurrentStoryPages() {
    try {
        const story = storyPages[currentStory];
        
        if (!story) {
            console.error(`Story at index ${currentStory} not found`);
            return [];
        }

        // Return pages array if it exists, otherwise wrap the story as a single page
        return story.pages || [story];
    } catch (error) {
        console.error("Error getting story pages:", error);
        return [];
    }
}

function getPageImage(story, page) {
    try {
        if (!page || !page.image) {
            console.warn("Page or image data missing");
            return "images/placeholder.png"; // Fallback image
        }

        if (story.metadata && story.metadata.assetPath) {
            return `${story.metadata.assetPath}/${page.image}`;
        }

        return page.image;
    } catch (error) {
        console.error("Error getting page image:", error);
        return "images/placeholder.png";
    }
}

function renderStory() {
    try {
        const story = storyPages[currentStory];
        
        if (!story) {
            console.error(`Story ${currentStory} not found`);
            return;
        }

        const storyPagesList = getCurrentStoryPages();
        
        if (storyPagesList.length === 0) {
            console.error("No pages available for story");
            return;
        }

        // Ensure currentPage is within bounds
        if (currentPage >= storyPagesList.length) {
            currentPage = storyPagesList.length - 1;
        }

        const page = storyPagesList[currentPage];
        
        if (!page) {
            console.error(`Page ${currentPage} not found in story`);
            return;
        }

        const readingPercent = ((currentPage + 1) / storyPagesList.length) * 100;

        window.scrollTo(0, 0);

        // Update DOM elements safely
        if (titleElement) titleElement.textContent = story.title || "Untitled";
        if (titleElement) titleElement.hidden = currentPage !== 0;
        
        if (imageElement) {
            imageElement.src = getPageImage(story, page);
            imageElement.alt = `${story.title} page ${currentPage + 1}`;
            // Add error handling for missing images
            imageElement.onerror = () => {
                imageElement.src = "images/placeholder.png";
            };
        }
        
        if (contentElement) contentElement.textContent = page.content || "";
        if (pageNumberElement) pageNumberElement.textContent = `${currentPage + 1} / ${storyPagesList.length}`;
        if (readerProgressFill) readerProgressFill.style.width = `${readingPercent}%`;

        // Update speech synthesis text for read-aloud feature
        if (speechManager && contentElement) {
            speechManager.setText(contentElement.textContent);
            speechManager.reset(); // Reset any ongoing narration
        }

        // Update progress bar ARIA attributes
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', Math.round(readingPercent));
        }

        // Update buttons
        if (prevButton) prevButton.disabled = currentPage === 0;
        if (nextButton) nextButton.disabled = currentPage === storyPagesList.length - 1;

        // Preload next page image for smoother navigation
        if (currentPage < storyPagesList.length - 1) {
            const nextPageImage = getPageImage(story, storyPagesList[currentPage + 1]);
            preloadImage(nextPageImage);
        }

        saveProgress();
        updateReadingProgress();
    } catch (error) {
        console.error("Error rendering story:", error);
    }
}

function saveProgress() {
    try {
        StorageManager.setLastPage(currentStory);
    } catch (error) {
        console.warn("Unable to save reading progress.", error);
    }
}

function getReadingProgress() {
    return StorageManager.getReadingProgress();
}

function saveReadingProgress(percent) {
    try {
        const validPercent = Math.min(Math.max(percent, 0), 100);
        StorageManager.setStoryProgress(currentStory, validPercent);
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
    // Stop any ongoing narration when navigating
    if (speechManager) {
        speechManager.stop();
    }

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
    // Stop any ongoing narration when navigating
    if (speechManager) {
        speechManager.stop();
    }

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

// ===========================
// SPEECH SYNTHESIS INTEGRATION
// ===========================

// Initialize speech manager with the read-aloud button
if (speechManager && readAloudButton) {
    speechManager.init(readAloudButton);
}

// Only render if we have valid data
if (storyPages && storyPages.length > 0) {
    renderStory();
} else {
    console.error("Story pages data not loaded. Make sure story-data.js is loaded before story.js");
}
