const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("searchInput");
const lastPage = Number(localStorage.getItem("lastPage"));

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}

function renderBooks(stories) {

    booksGrid.innerHTML = "";

    stories.forEach(story => {

        const storyIndex =
            storyPages.indexOf(story);

        const buttonText =
            storyIndex === lastPage
                ? "Continue Reading"
                : "Read Story";

        const isFavorite =
            favorites.includes(storyIndex);

        const favoriteIcon =
            isFavorite ? "❤️" : "🤍";

        booksGrid.innerHTML += `
        <div class="book-card">

            <button
                class="favorite-btn"
                data-id="${storyIndex}">
                ${favoriteIcon}
            </button>

            <div class="book-cover">
                <img src="${story.image}" alt="${story.title}">
            </div>

            <div class="book-info">
                <p>${story.chapter}</p>

                <h3>${story.title}</h3>

                <a
                    href="story.html?id=${storyIndex}"
                    class="read-btn">
                    ${buttonText}
                </a>
            </div>

        </div>
        `;
    });

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

function searchBooks() {

    const searchText =
        searchInput.value.toLowerCase();

    const filteredStories =
        storyPages.filter(story =>
            story.title.toLowerCase().includes(searchText) ||
            story.chapter.toLowerCase().includes(searchText)
        );

    renderBooks(filteredStories);
}

searchInput.addEventListener("input", searchBooks);

renderBooks(storyPages);
