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

    function renderBooks(stories) {

    booksGrid.innerHTML = "";

    stories.forEach((story, index) => {

        const continueBadge = "";

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

            <button
                class="favorite-btn"
                data-id="${index}">
                ${favoriteIcon}
            </button>

            <div class="book-cover">
                <img src="${story.image}" alt="${story.title}">
            </div>

            <div class="book-info">
                <p>${story.chapter}</p>

                <h3>${story.title}</h3>

                <a
                    href="story.html?id=${index}"
                    class="read-btn">
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

    booksGrid.insertAdjacentHTML("afterend", `
    <div class="coming-soon">
    <h2>✨ More Adventures Coming Soon ✨</h2>
    <p>We're creating more exciting stories for Phoebe.</p>
    </div>
    `);

    attachFavoriteEvents();
}

function attachFavoriteEvents() {

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                if (favorites.includes(id)) {

                    favorites = favorites.filter(
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

}

renderBooks(storyPages);