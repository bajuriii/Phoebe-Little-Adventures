const booksGrid = document.getElementById("books-grid");
const lastPage = Number(localStorage.getItem("lastPage"));

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}

storyPages.forEach((story, index) => {

    const continueBadge =
        index === lastPage
            ? `<span class="continue-badge">Continue Reading</span>`
            : "";

    const buttonText =
        index === lastPage
            ? "Continue Reading"
            : "Read Story";

    const isFavorite =
        favorites.includes(index);

    const favoriteIcon =
        isFavorite ? "❤️" : "🤍";

    booksGrid.innerHTML += `
<div class="book-card">

    ${continueBadge}

    <button class="favorite-btn" data-id="${index}">
        ${favoriteIcon}
    </button>

    <div class="book-cover">
        <img src="${story.image}" alt="${story.title}">
    </div>

    <div class="book-info">
        <p>${story.chapter}</p>

        <h3>${story.title}</h3>

        <a href="story.html?id=${index}" class="read-btn">
            ${buttonText}
        </a>
    </div>

</div>
`;

});

// Coming Soon Card
booksGrid.innerHTML += `
    <div class="book-card coming-soon">
        <h2>Coming Soon</h2>
        <p>More adventures are on the way!</p>
    </div>
`;

document
    .querySelectorAll(".favorite-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            if (favorites.includes(id)) {

                favorites =
                    favorites.filter(
                        favorite => favorite !== id
                    );

            } else {

                favorites.push(id);

            }

            saveFavorites();

            button.textContent =
                favorites.includes(id)
                    ? "❤️"
                    : "🤍";

        });

    });