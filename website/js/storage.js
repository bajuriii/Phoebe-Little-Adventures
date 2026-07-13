/**
 * Storage Manager - Centralized localStorage management
 * Handles all data persistence for the Phoebe Little Adventures app
 * Includes error handling and data validation
 */

const StorageManager = {
    // Keys
    KEYS: {
        LAST_PAGE: "lastPage",
        READING_PROGRESS: "readingProgress",
        FAVORITES: "favorites"
    },

    /**
     * Safely parse JSON from localStorage
     * @param {string} key - localStorage key
     * @param {*} defaultValue - Default value if parsing fails
     * @returns {*} Parsed value or default
     */
    safeParse(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.warn(`Storage parse error for key "${key}":`, error);
            return defaultValue;
        }
    },

    /**
     * Safely store JSON to localStorage
     * @param {string} key - localStorage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    safeSet(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn(`Storage write error for key "${key}":`, error);
            return false;
        }
    },

    /**
     * Get the last viewed story ID
     * @returns {number} Story ID
     */
    getLastPage() {
        const value = localStorage.getItem(this.KEYS.LAST_PAGE);
        return Number(value) || 0;
    },

    /**
     * Save the current story ID
     * @param {number} storyId - Story index
     * @returns {boolean} Success status
     */
    setLastPage(storyId) {
        try {
            localStorage.setItem(this.KEYS.LAST_PAGE, String(storyId));
            return true;
        } catch (error) {
            console.warn("Unable to save last page:", error);
            return false;
        }
    },

    /**
     * Get reading progress for all stories
     * @returns {Object} Map of story ID to progress percentage
     */
    getReadingProgress() {
        return this.safeParse(this.KEYS.READING_PROGRESS, {});
    },

    /**
     * Get reading progress for a specific story
     * @param {number} storyId - Story index
     * @returns {number} Progress percentage (0-100)
     */
    getStoryProgress(storyId) {
        const progress = this.getReadingProgress();
        return Number(progress[storyId] || 0);
    },

    /**
     * Save reading progress for a story
     * Updates progress only if the new value is higher
     * @param {number} storyId - Story index
     * @param {number} percent - Progress percentage (0-100)
     * @returns {boolean} Success status
     */
    setStoryProgress(storyId, percent) {
        const progress = this.getReadingProgress();
        const currentProgress = progress[storyId] || 0;
        
        // Only update if progress increases
        if (percent > currentProgress) {
            progress[storyId] = Math.min(Math.max(percent, 0), 100);
            return this.safeSet(this.KEYS.READING_PROGRESS, progress);
        }
        
        return true;
    },

    /**
     * Get array of favorited story IDs
     * @returns {Array<number>} Array of story indices
     */
    getFavorites() {
        const favorites = this.safeParse(this.KEYS.FAVORITES, []);
        // Ensure it's an array
        return Array.isArray(favorites) ? favorites : [];
    },

    /**
     * Check if a story is favorited
     * @param {number} storyId - Story index
     * @returns {boolean} Is favorited
     */
    isFavorited(storyId) {
        return this.getFavorites().includes(storyId);
    },

    /**
     * Add story to favorites
     * @param {number} storyId - Story index
     * @returns {boolean} Success status
     */
    addFavorite(storyId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(storyId)) {
            favorites.push(storyId);
            return this.safeSet(this.KEYS.FAVORITES, favorites);
        }
        return true;
    },

    /**
     * Remove story from favorites
     * @param {number} storyId - Story index
     * @returns {boolean} Success status
     */
    removeFavorite(storyId) {
        const favorites = this.getFavorites();
        const filtered = favorites.filter(id => id !== storyId);
        return this.safeSet(this.KEYS.FAVORITES, filtered);
    },

    /**
     * Toggle favorite status for a story
     * @param {number} storyId - Story index
     * @returns {boolean} New favorite status
     */
    toggleFavorite(storyId) {
        if (this.isFavorited(storyId)) {
            this.removeFavorite(storyId);
            return false;
        } else {
            this.addFavorite(storyId);
            return true;
        }
    },

    /**
     * Clear all reading progress
     * @returns {boolean} Success status
     */
    clearProgress() {
        return this.safeSet(this.KEYS.READING_PROGRESS, {});
    },

    /**
     * Clear all favorites
     * @returns {boolean} Success status
     */
    clearFavorites() {
        return this.safeSet(this.KEYS.FAVORITES, []);
    },

    /**
     * Export all user data (for debugging or export)
     * @returns {Object} All stored data
     */
    exportData() {
        return {
            lastPage: this.getLastPage(),
            readingProgress: this.getReadingProgress(),
            favorites: this.getFavorites()
        };
    },

    /**
     * Import user data (for restore or import)
     * @param {Object} data - Data to restore
     * @returns {boolean} Success status
     */
    importData(data) {
        if (!data || typeof data !== 'object') {
            console.warn("Invalid data format for import");
            return false;
        }

        try {
            if (data.lastPage !== undefined) {
                this.setLastPage(data.lastPage);
            }
            if (data.readingProgress && typeof data.readingProgress === 'object') {
                this.safeSet(this.KEYS.READING_PROGRESS, data.readingProgress);
            }
            if (Array.isArray(data.favorites)) {
                this.safeSet(this.KEYS.FAVORITES, data.favorites);
            }
            return true;
        } catch (error) {
            console.warn("Error importing data:", error);
            return false;
        }
    }
};
