/**
 * Keyboard Navigation & Shortcuts
 * Makes the app more accessible with keyboard controls
 */

/**
 * Initialize keyboard shortcuts for story reader
 * Arrow Left/Right: Navigate pages
 * F: Toggle favorite
 * Home: Go to first page
 * End: Go to last page
 */
function initStoryKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't interfere with input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        // GUARD: Only run on story page - check if story functions/variables exist
        if (typeof currentPage === 'undefined' || typeof getCurrentStoryPages === 'undefined' || typeof renderStory === 'undefined') {
            return;  // Exit early if not on story page
        }

        switch (e.key) {
            case 'ArrowRight':
            case ' ':
                // Next page
                if (typeof nextPage === 'function') {
                    e.preventDefault();
                    nextPage();
                }
                break;

            case 'ArrowLeft':
            case 'Backspace':
                // Previous page
                if (typeof previousPage === 'function') {
                    e.preventDefault();
                    previousPage();
                }
                break;

            case 'Home':
                // Go to first page
                e.preventDefault();
                currentPage = 0;
                if (typeof renderStory === 'function') {
                    renderStory();
                }
                break;

            case 'End':
                // Go to last page
                e.preventDefault();
                const storyPagesList = getCurrentStoryPages();
                currentPage = storyPagesList.length - 1;
                if (typeof renderStory === 'function') {
                    renderStory();
                }
                break;

            case 'f':
            case 'F':
                // Toggle favorite
                if (e.ctrlKey || e.metaKey) {
                    // Let browser handle Ctrl+F for find
                    return;
                }
                e.preventDefault();
                toggleCurrentStoryFavorite();
                break;
        }
    });
}

/**
 * Toggle favorite for current story
 */
function toggleCurrentStoryFavorite() {
    if (typeof StorageManager === 'undefined') {
        console.warn('StorageManager not available');
        return;
    }

    const isFavorited = StorageManager.toggleFavorite(currentStory);
    const icon = isFavorited ? '❤️' : '🤍';
    
    // Show feedback
    showKeyboardFeedback(`${icon} Story ${isFavorited ? 'added to' : 'removed from'} favorites`);
}

/**
 * Show temporary feedback for keyboard actions
 * @param {string} message - Message to display
 */
function showKeyboardFeedback(message) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary, #FFD66B);
        color: var(--text, #4A4A4A);
        padding: 12px 24px;
        border-radius: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        font-family: Nunito, sans-serif;
        font-weight: bold;
        animation: slideUp 0.3s ease forwards;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

/**
 * Initialize keyboard shortcuts for bookshelf
 * / : Focus search
 * H : Go home
 * ? : Show help
 */
function initBooksKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't interfere with input fields
        if (e.target.tagName === 'INPUT' && e.target.id !== 'searchInput') {
            return;
        }

        switch (e.key) {
            case '/':
                // Focus search
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
                break;

            case 'h':
            case 'H':
                if (e.ctrlKey || e.metaKey) return;
                // Go home
                e.preventDefault();
                window.location.href = '/';
                break;

            case '?':
                // Show help
                e.preventDefault();
                showKeyboardHelp();
                break;
        }
    });
}

/**
 * Show keyboard shortcuts help modal
 */
function showKeyboardHelp() {
    const help = document.createElement('div');
    help.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;

    const shortcuts = [
        { key: '→ or Space', action: 'Next page' },
        { key: '← or Backspace', action: 'Previous page' },
        { key: 'Home', action: 'First page' },
        { key: 'End', action: 'Last page' },
        { key: 'F', action: 'Toggle favorite' },
        { key: '/', action: 'Search stories' },
        { key: 'H', action: 'Go home' },
        { key: '? or Esc', action: 'Show/hide help' }
    ];

    let html = `
        <h2 style="margin-top: 0; color: var(--text, #4A4A4A);">⌨️ Keyboard Shortcuts</h2>
        <table style="width: 100%; border-collapse: collapse;">
    `;

    shortcuts.forEach(({ key, action }) => {
        html += `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px; text-align: left;">
                    <kbd style="background: var(--primary, #FFD66B); padding: 4px 8px; border-radius: 4px; font-weight: bold;">
                        ${key}
                    </kbd>
                </td>
                <td style="padding: 12px; text-align: left; color: var(--muted, #666);">
                    ${action}
                </td>
            </tr>
        `;
    });

    html += `
        </table>
        <button id="closeHelp" style="
            margin-top: 20px;
            padding: 12px 24px;
            background: var(--primary, #FFD66B);
            color: var(--text, #4A4A4A);
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
        ">Close</button>
    `;

    content.innerHTML = html;
    help.appendChild(content);
    document.body.appendChild(help);

    const closeBtn = document.getElementById('closeHelp');
    closeBtn.addEventListener('click', () => help.remove());

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            help.remove();
        }
    });
}

/**
 * Add keyboard navigation hints to DOM
 * Shows key hints for buttons
 */
function addKeyboardHints() {
    // Hint for next/prev buttons in story
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (nextBtn) {
        nextBtn.title = 'Next page (→ or Space)';
        nextBtn.setAttribute('aria-label', 'Next page (→ or Space)');
    }

    if (prevBtn) {
        prevBtn.title = 'Previous page (← or Backspace)';
        prevBtn.setAttribute('aria-label', 'Previous page (← or Backspace)');
    }

    // Hint for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.title = 'Search (or press /)';
    }

    // Add help hint
    document.addEventListener('keydown', (e) => {
        if (e.key === '?') {
            showKeyboardHelp();
        }
    });
}

/**
 * Initialize all keyboard features
 */
function initKeyboardFeatures() {
    // Determine which page we're on
    const isStoryPage = typeof currentPage !== 'undefined' && typeof nextPage === 'function';
    const isBooksPage = document.getElementById('books-grid') !== null;

    if (isStoryPage) {
        initStoryKeyboardShortcuts();
    }

    if (isBooksPage) {
        initBooksKeyboardShortcuts();
    }

    addKeyboardHints();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKeyboardFeatures);
} else {
    initKeyboardFeatures();
}
