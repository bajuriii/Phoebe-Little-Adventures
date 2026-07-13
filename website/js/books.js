const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("searchInput");
const emptyFavorites = document.getElementById("empty-favorites");
const readingStats = document.getElementById("reading-stats");
const isFavoritesPage = document.body.classList.contains("favorites-page");

// Validate story data is loaded
if (!Array.isArray(storyPages) || storyPages.length === 0) {
    console.error("Story data not loaded properly");
}

function saveFavorites() {
    try {
        const favorites = StorageManager.getFavorites();
        StorageManager.safeSet(StorageManager.KEYS.FAVORITES, favorites);
    } catch (error) {
        console.warn("Unable to save favorites.", error);
    }
}

function getProgressPercent(storyIndex) {
    try {
        if (storyIndex < 0 || storyIndex >= storyPages.length) {
            return 0;
        }
        return StorageManager.getStoryProgress(storyIndex);
    } catch (error) {
        console.warn(`Error getting progress for story ${storyIndex}:`, error);
        return 0;
    }
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
    try {
        if (!readingStats || !storyPages || storyPages.length === 0) {
            return;
        }

        const totalStories = storyPages.length;
        const favorites = StorageManager.getFavorites();
        const totalFavorites = favorites.length;

        const totalReading = storyPages.filter((story, index) => {
            const progress = getProgressPercent(index);
            return progress > 0 && progress < 100;
        }).length;

        const totalFinished = storyPages.filter((story, index) =>
            getProgressPercent(index) >= 100
        ).length;

        readingStats.innerHTML = `
        <span title="Total stories">📚 ${totalStories} Stories</span>
        <span title="Favorite stories">❤️ ${totalFavorites} Favorites</span>
        <span title="Stories being read">📖 ${totalReading} Reading</span>
        <span title="Completed stories">✅ ${totalFinished} Finished</span>
        `;
    } catch (error) {
        console.error("Error updating reading stats:", error);
    }
}

function renderBooks(stories) {
    try {
        if (!booksGrid) {
            console.error("Books grid element not found");
            return;
        }

        booksGrid.innerHTML = "";

        if (emptyFavorites) {
            emptyFavorites.style.display =
                stories.length === 0 ? "block" : "none";
        }

        const lastPage = StorageManager.getLastPage();
        const favorites = StorageManager.getFavorites();

        stories.forEach((story, renderIndex) => {
            try {
                if (!story) {
                    console.warn("Story is undefined or null");
                    return;
                }

                const storyIndex = storyPages.indexOf(story);
                
                if (storyIndex === -1) {
                    console.warn("Story not found in storyPages");
                    return;
                }

                const buttonText =
                    storyIndex === lastPage
                        ? "Continue Reading"
                        : "Read Story";

                const isFavorite = favorites.includes(storyIndex);
                const favoriteIcon = isFavorite ? "❤️" : "🤍";
                const progress = getProgressPercent(storyIndex);
                const readingStatus = getReadingStatus(storyIndex);
                const readingStatusClass = getReadingStatusClass(storyIndex);

                // Validate required story properties
                const title = story.title || "Untitled";
                const chapter = story.chapter || "";
                const image = story.image || "images/placeholder.png";

                booksGrid.innerHTML += `
        <div class="book-card">

            <button
                class="favorite-btn"
                data-id="${storyIndex}"
                aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                ${favoriteIcon}
            </button>

            <div class="book-cover">
                <img 
                    src="${image}" 
                    alt="${title}" 
                    loading="lazy"
                    onerror="this.src='images/placeholder.png'">
            </div>

            <div class="book-info">
                <span class="reading-status ${readingStatusClass}">
                    ${readingStatus}
                </span>

                <p>${chapter}</p>

                <h3>${title}</h3>

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
            } catch (error) {
                console.error("Error rendering book card:", error);
            }
        });

        updateReadingStats();
        attachFavoriteEvents();
    } catch (error) {
        console.error("Error rendering books:", error);
    }
}

function attachFavoriteEvents() {
    try {
        const favoriteButtons = document.querySelectorAll(".favorite-btn");
        
        if (favoriteButtons.length === 0) {
            return;
        }

        favoriteButtons.forEach(button => {
            try {
                const id = Number(button.dataset.id);

                if (isNaN(id) || id < 0 || id >= storyPages.length) {
                    console.warn("Invalid story ID in favorite button:", id);
                    return;
                }

                const isFavorited = StorageManager.isFavorited(id);
                button.setAttribute(
                    "aria-label",
                    isFavorited
                        ? "Remove from favorites"
                        : "Add to favorites"
                );

                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    
                    const newFavoriteStatus = StorageManager.toggleFavorite(id);
                    const newIcon = newFavoriteStatus ? "❤️" : "🤍";
                    
                    button.textContent = newIcon;
                    button.setAttribute(
                        "aria-label",
                        newFavoriteStatus
                            ? "Remove from favorites"
                            : "Add to favorites"
                    );

                    updateReadingStats();

                    if (isFavoritesPage) {
                        renderFavoriteBooks();
                    }
                });

            } catch (error) {
                console.error("Error attaching favorite event:", error);
            }
        });
    } catch (error) {
        console.error("Error attaching favorite events:", error);
    }
}

function renderFavoriteBooks() {
    try {
        const favorites = StorageManager.getFavorites();
        const favoriteStories = favorites
            .map(id => {
                if (id >= 0 && id < storyPages.length) {
                    return storyPages[id];
                }
                return null;
            })
            .filter(story => story !== null);

        renderBooks(favoriteStories);
    } catch (error) {
        console.error("Error rendering favorite books:", error);
    }
}

function searchBooks() {
    try {
        if (!searchInput || !storyPages) {
            return;
        }

        const searchText = searchInput.value.toLowerCase().trim();

        const filteredStories = storyPages.filter(story => {
            if (!story) return false;
            
            const title = (story.title || "").toLowerCase();
            const chapter = (story.chapter || "").toLowerCase();
            const subtitle = (story.subtitle || "").toLowerCase();
            
            return title.includes(searchText) || 
                   chapter.includes(searchText) ||
                   subtitle.includes(searchText);
        });

        renderBooks(filteredStories);
    } catch (error) {
        console.error("Error searching books:", error);
    }
}

if (searchInput) {
    searchInput.addEventListener("input", searchBooks);
}

// Only render if we have valid data
if (storyPages && storyPages.length > 0) {
    if (isFavoritesPage) {
        renderFavoriteBooks();
    } else {
        renderBooks(storyPages);
    }
} else {
    console.error("Story pages data not loaded. Make sure story-data.js is loaded before books.js");
}
