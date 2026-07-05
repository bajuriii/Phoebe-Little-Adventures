const params = new URLSearchParams(
    window.location.search
);

let currentPage =
    Number(params.get("id")) || 0;

if (currentPage >= storyPages.length) {
    currentPage = 0;
}

function renderStory() {

    const page = storyPages[currentPage];
    document.getElementById("chapter").innerText = page.chapter;
    document.getElementById("story-title").innerHTML = page.title;
    document.getElementById("story-image").src = page.image;
    document.getElementById("story-content").innerText = page.content;
    document.getElementById("page-number").innerText =
        `${currentPage + 1} / ${storyPages.length}`;
    document.getElementById("prev-btn").disabled =
        currentPage === 0;
    document.getElementById("next-btn").disabled =
        currentPage === storyPages.length - 1;
}

function nextPage(){

    if(currentPage < storyPages.length - 1){

        const book =
            document.querySelector(".book");
            book.classList.add("flip-next");

        setTimeout(()=>{
            currentPage++;
            renderStory();

        },250);

        setTimeout(()=>{

            book.classList.remove("flip-next");

        },500);

    }

}

function previousPage(){

    if(currentPage > 0){

        const book =
            document.querySelector(".book");

        book.classList.add("flip-prev");

        setTimeout(()=>{

            currentPage--;

            renderStory();

        },250);

        setTimeout(()=>{

            book.classList.remove("flip-prev");

        },500);

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