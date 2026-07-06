// ===========================
// URL PARAMETER
// ===========================

const params = new URLSearchParams(window.location.search);
const savedPage = localStorage.getItem("lastPage");
let currentPage = Number(params.get("id"));
if (isNaN(currentPage)) {
    currentPage = savedPage ? Number(savedPage) : 0;
}

if (currentPage < 0 || currentPage >= storyPages.length) {
    currentPage = 0;
}

// ===========================
// DOM ELEMENTS
// ===========================

const book = document.querySelector(".book");

const chapterElement = document.getElementById("chapter");
const titleElement = document.getElementById("story-title");
const imageElement = document.getElementById("story-image");
const contentElement = document.getElementById("story-content");
const pageNumberElement = document.getElementById("page-number");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

// ===========================
// CONFIG
// ===========================

const ANIMATION_TIME = 250;

function renderStory() {
    const page = storyPages[currentPage];
    chapterElement.textContent = page.chapter;
    titleElement.textContent = page.title;
    imageElement.src = page.image;
    contentElement.textContent = page.content;
    pageNumberElement.textContent =
        `${currentPage + 1} / ${storyPages.length}`;
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === storyPages.length - 1;
    saveProgress();
}

function saveProgress() {
    localStorage.setItem(
        "lastPage",
        currentPage
    );

}

function nextPage() {
    if (currentPage < storyPages.length - 1) {
        animateBook("flip-next", () => {
            currentPage++;
        });
    }
}

function previousPage() {
    if (currentPage > 0) {
        animateBook("flip-prev", () => {
            currentPage--;
        });
    }
}

function animateBook(className, callback) {
    book.classList.add(className);
    setTimeout(() => {
        callback();
        renderStory();
    }, ANIMATION_TIME);
    setTimeout(() => {
        book.classList.remove(className);
    }, ANIMATION_TIME * 2);
}

function saveProgress() {
    try {
        localStorage.setItem("lastPage", currentPage);
    } catch (error) {
        console.warn("Unable to save reading progress.", error);
    }
}

nextButton.addEventListener(
    "click",
    nextPage
);

prevButton.addEventListener(
    "click",
    previousPage
);

renderStory();