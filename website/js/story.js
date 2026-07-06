const params = new URLSearchParams(
    window.location.search
);

let currentPage =
    Number(params.get("id")) || 0;

if (currentPage >= storyPages.length) {
    currentPage = 0;
}

const book = document.querySelector(".book");

const ANIMATION_TIME = 250;
setTimeout(() => {
    currentPage++;
    renderStory();
}, ANIMATION_TIME);
setTimeout(() => {
    book.classList.remove("flip-next");
}, ANIMATION_TIME * 2);

function renderStory() {

    const page = storyPages[currentPage];
    document.getElementById("chapter").textContent  = page.chapter;
    document.getElementById("story-title").textContent = page.title;
    document.getElementById("story-image").src = page.image;
    document.getElementById("story-content").textContent = page.content;
    document.getElementById("page-number").innerText =
        `${currentPage + 1} / ${storyPages.length}`;
    document.getElementById("prev-btn").disabled =
        currentPage === 0;
    document.getElementById("next-btn").disabled =
        currentPage === storyPages.length - 1;
}

function nextPage(){

    if(currentPage < storyPages.length - 1){
            book.classList.add("flip-next");
        setTimeout(() => {
            currentPage++;
            renderStory();
        }, ANIMATION_TIME);

        setTimeout(() => {
            book.classList.remove("flip-next");
        }, ANIMATION_TIME * 2);
    }
}

function previousPage(){

    if(currentPage > 0){
        book.classList.add("flip-prev");

        setTimeout(() => {
            currentPage--;
            renderStory();
        }, ANIMATION_TIME);

        setTimeout(() => {
            book.classList.remove("flip-prev");
        }, ANIMATION_TIME * 2);
    }

}

document
    .getElementById("next-btn")
    .addEventListener(
        "click",
        nextPage
    );

document
    .getElementById("prev-btn")
    .addEventListener(
        "click",
        previousPage
    );

    renderStory();