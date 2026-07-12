const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("searchInput");
const emptyFavorites = document.getElementById("empty-favorites");
const readingStats = document.getElementById("reading-stats");
const isFavoritesPage = document.body.classList.contains("favorites-page");
const lastPage = Number(localStorage.getItem("lastPage"));
const readingProgress =
    JSON.parse(localStorage.getItem("readingProgress")) || {};

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}

function getProgressPercent(storyIndex) {

    return Number(readingProgress[storyIndex] || 0);
}

function getReadingStatus(storyIndex) {

    const progress =
        getProgressPercent(storyIndex);

    if (progress >= 100) {
        return "✅ Finished";
    }

    if (progress > 0) {
        return "📖 Reading";
    }

    return "🆕 New";
}

function getReadingStatusClass(storyIndex) {

    const progress =
        getProgressPercent(storyIndex);

    if (progress >= 100) {
        return "status-finished";
    }

    if (progress > 0) {
        return "status-reading";
    }

    return "status-new";
}

function updateReadingStats() {

    if (!readingStats) {
        return;
    }

    const totalStories =
        storyPages.length;

    const totalFavorites =
        favorites.length;

    const totalReading =
        storyPages.filter((story, index) => {
            const progress = getProgressPercent(index);

            return progress > 0 && progress < 100;
        }).length;

    const totalFinished =
        storyPages.filter((story, index) =>
            getProgressPercent(index) >= 100
        ).length;

    readingStats.innerHTML = `
        <span>📚 ${totalStories} Stories</span>
        <span>❤️ ${totalFavorites} Favorites</span>
        <span>📖 ${totalReading} Reading</span>
        <span>✅ ${totalFinished} Finished</span>
    `;
}

function renderBooks(stories) {

    booksGrid.innerHTML = "";

    if (emptyFavorites) {
        emptyFavorites.style.display =
            stories.length === 0 ? "block" : "none";
    }

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

        const progress =
            getProgressPercent(storyIndex);

        const readingStatus =
            getReadingStatus(storyIndex);

        const readingStatusClass =
            getReadingStatusClass(storyIndex);

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
                <span class="reading-status ${readingStatusClass}">
                    ${readingStatus}
                </span>

                <p>${story.chapter}</p>

                <h3>${story.title}</h3>

                <div class="progress-bar">
                    <div
                        class="progress-fill"
                        style="width:${progress}%">
                    </div>
                </div>

                <p class="progress-text">
                    ${progress}% Read
                </p>

                <a
                    href="story.html?id=${storyIndex}"
                    class="read-btn">
                    ${buttonText}
                </a>
            </div>

        </div>
        `;
    });

    updateReadingStats();
    attachFavoriteEvents();
}

function attachFavoriteEvents() {

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            const id = Number(button.dataset.id);

            button.setAttribute(
                "aria-label",
                favorites.includes(id)
                    ? "Remove from favorites"
                    : "Add to favorites"
            );

            button.addEventListener("click", () => {

                if (favorites.includes(id)) {

                    favorites = favorites.filter(
                        favorite => favorite !== id
                    );

                } else {

                    favorites.push(id);

                }

                saveFavorites();
                updateReadingStats();

                button.textContent =
                    favorites.includes(id)
                        ? "❤️"
                        : "🤍";

                button.setAttribute(
                    "aria-label",
                    favorites.includes(id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                );

                if (isFavoritesPage) {
                    renderFavoriteBooks();
                }

            });

        });

}

function renderFavoriteBooks() {

    const favoriteStories =
        favorites
            .map(id => storyPages[id])
            .filter(story => story);

    renderBooks(favoriteStories);
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

if (searchInput) {
    searchInput.addEventListener("input", searchBooks);
}

if (isFavoritesPage) {
    renderFavoriteBooks();
} else {
    renderBooks(storyPages);
}
