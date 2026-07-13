/**
 * Touch Gestures for Mobile Devices
 * Enables swipe navigation for story reading
 */

class TouchGestureHandler {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            minSwipeDistance: options.minSwipeDistance || 50,
            maxSwipeTime: options.maxSwipeTime || 600
        };

        this.touchStart = { x: 0, y: 0, time: 0 };
        this.touchEnd = { x: 0, y: 0, time: 0 };

        // Store bound methods for cleanup
        this.boundTouchStart = (e) => this.handleTouchStart(e);
        this.boundTouchEnd = (e) => this.handleTouchEnd(e);

        this.init();
    }

    init() {
        if (!this.element) return;

        this.element.addEventListener('touchstart', this.boundTouchStart, false);
        this.element.addEventListener('touchend', this.boundTouchEnd, false);
    }

    destroy() {
        if (!this.element) return;
        this.element.removeEventListener('touchstart', this.boundTouchStart, false);
        this.element.removeEventListener('touchend', this.boundTouchEnd, false);
    }

    handleTouchStart(e) {
        if (e.touches.length > 1) return; // Ignore multi-touch

        this.touchStart = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        };
    }

    handleTouchEnd(e) {
        if (e.changedTouches.length > 1) return;

        this.touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
            time: Date.now()
        };

        this.detectSwipe();
    }

    detectSwipe() {
        const { x: startX, y: startY, time: startTime } = this.touchStart;
        const { x: endX, y: endY, time: endTime } = this.touchEnd;

        const distanceX = startX - endX;
        const distanceY = startY - endY;
        const timeTaken = endTime - startTime;

        // Check if swipe is horizontal (not vertical)
        if (Math.abs(distanceX) > Math.abs(distanceY)) {
            // Check if swipe meets distance and time requirements
            if (
                Math.abs(distanceX) > this.options.minSwipeDistance &&
                timeTaken < this.options.maxSwipeTime
            ) {
                if (distanceX > 0) {
                    // Swiped left (show next)
                    this.onSwipeLeft();
                } else {
                    // Swiped right (show previous)
                    this.onSwipeRight();
                }
            }
        }
    }

    onSwipeLeft() {
        if (typeof nextPage === 'function') {
            nextPage();
        }
    }

    onSwipeRight() {
        if (typeof previousPage === 'function') {
            previousPage();
        }
    }
}

/**
 * Store gesture handler reference for cleanup
 */
let touchHandler = null;

/**
 * Initialize touch gestures for story reader
 */
function initTouchGestures() {
    const book = document.querySelector('.book');
    const storyPage = document.querySelector('.story-page');
    const target = book || storyPage;

    if (target && typeof nextPage === 'function' && typeof previousPage === 'function') {
        // Clean up old handler if it exists
        if (touchHandler) {
            touchHandler.destroy();
        }
        
        touchHandler = new TouchGestureHandler(target, {
            minSwipeDistance: 50,
            maxSwipeTime: 600
        });

        // Add visual feedback for swipe intent
        addSwipeFeedback(target);
    }
}

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
    if (touchHandler) {
        touchHandler.destroy();
        touchHandler = null;
    }
});

/**
 * Add visual feedback for swipe actions
 * Shows a hint that swiping is available
 */
function addSwipeFeedback(element) {
    // Add touch-action to allow swipe
    element.style.touchAction = 'pan-y';

    // Add swipe hint for first-time users
    if (!localStorage.getItem('swipeHintShown')) {
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(74, 74, 74, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 24px;
            z-index: 1000;
            font-family: Nunito, sans-serif;
            font-size: 14px;
            text-align: center;
            animation: slideUp 0.3s ease;
            pointer-events: none;
        `;
        hint.textContent = '👆 Swipe left or right to navigate';
        document.body.appendChild(hint);

        setTimeout(() => {
            hint.style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => hint.remove(), 300);
        }, 3000);

        localStorage.setItem('swipeHintShown', 'true');
    }
}

/**
 * Initialize when page loads
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Delay slightly to ensure other scripts loaded
        setTimeout(initTouchGestures, 100);
    });
} else {
    initTouchGestures();
}
