/**
 * Speech Synthesis Manager for Phoebe Little Adventures
 * Handles text-to-speech narration with simple state management
 * 
 * Architecture prepared for future multilingual support
 */

class SpeechManager {
    constructor(options = {}) {
        // Check browser support
        this.isSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

        if (!this.isSupported) {
            console.warn('Speech Synthesis API not supported in this browser');
            return;
        }

        // State management
        this.isPlaying = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.button = null;
        this.text = '';

        // Configuration
        this.language = options.language || 'en';
        this.rate = options.rate || 1.0; // Speaking speed
        this.pitch = options.pitch || 1.0;
        this.volume = options.volume || 1.0;

        // Language to locale mapping (prepared for future use)
        this.languageMap = {
            en: 'en-US',
            id: 'id-ID',
            es: 'es-ES',
            fr: 'fr-FR',
            de: 'de-DE',
            pt: 'pt-BR',
            ja: 'ja-JP',
            zh: 'zh-CN'
        };

        // Button states
        this.buttonStates = {
            idle: '🔊 Read Aloud',
            playing: '⏸ Pause Narration',
            paused: '▶ Resume Narration'
        };

        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Initialize the Speech Manager with a button element
     * @param {HTMLElement} buttonElement - The button to control speech
     */
    init(buttonElement) {
        if (!this.isSupported || !buttonElement) {
            return;
        }

        this.button = buttonElement;
        this.button.addEventListener('click', () => this.handleButtonClick());

        // Cleanup when user leaves the page
        window.addEventListener('beforeunload', () => this.stop());

        // Also cleanup if page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stop();
            }
        });
    }

    /**
     * Set the text to be read aloud
     * @param {string} text - The text content to narrate
     */
    setText(text) {
        this.text = text || '';
        
        // If currently narrating and text changes, stop
        if (this.isPlaying) {
            this.stop();
        }
    }

    /**
     * Handle button click - manage state transitions
     */
    handleButtonClick() {
        if (!this.isSupported) {
            return;
        }

        if (this.isPlaying) {
            this.pause();
        } else if (this.isPaused) {
            this.resume();
        } else {
            this.play();
        }
    }

    /**
     * Start playing the text
     */
    play() {
        if (!this.text || !this.isSupported) {
            return;
        }

        // Stop any existing speech
        this.stop();

        // Create new utterance
        this.currentUtterance = new SpeechSynthesisUtterance(this.text);

        // Configure utterance
        this.currentUtterance.lang = this.languageMap[this.language] || 'en-US';
        this.currentUtterance.rate = this.rate;
        this.currentUtterance.pitch = this.pitch;
        this.currentUtterance.volume = this.volume;

        // Event handlers
        this.currentUtterance.onstart = () => {
            this.isPlaying = true;
            this.isPaused = false;
            this.updateButton();
        };

        this.currentUtterance.onpause = () => {
            this.isPaused = true;
            this.isPlaying = false;
            this.updateButton();
        };

        this.currentUtterance.onresume = () => {
            this.isPlaying = true;
            this.isPaused = false;
            this.updateButton();
        };

        this.currentUtterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this.currentUtterance = null;
            this.updateButton();
        };

        this.currentUtterance.onerror = (event) => {
            console.warn('Speech synthesis error:', event.error);
            this.stop();
        };

        // Start speaking with error handling
        try {
            window.speechSynthesis.cancel(); // Clear any pending utterances
            const utterancePromise = window.speechSynthesis.speak(this.currentUtterance);
            
            // Handle promise rejection if browser supports it (Safari, Firefox)
            if (utterancePromise && typeof utterancePromise.catch === 'function') {
                utterancePromise.catch((error) => {
                    console.warn('Speech synthesis error (promise):', error);
                    this.stop();
                });
            }
        } catch (error) {
            console.warn('Speech synthesis exception:', error);
            this.stop();
        }
    }

    /**
     * Pause the current narration
     */
    pause() {
        if (this.isSupported && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            this.isPlaying = false;
            this.isPaused = true;
            this.updateButton();
        }
    }

    /**
     * Resume a paused narration
     */
    resume() {
        if (this.isSupported && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            this.isPlaying = true;
            this.isPaused = false;
            this.updateButton();
        }
    }

    /**
     * Stop narration completely and reset state
     */
    stop() {
        if (this.isSupported) {
            window.speechSynthesis.cancel();
        }

        this.isPlaying = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.updateButton();
    }

    /**
     * Reset state and button (called when navigating pages)
     */
    reset() {
        this.stop();
    }

    /**
     * Update button text based on current state
     */
    updateButton() {
        if (!this.button) {
            return;
        }

        if (this.isPlaying) {
            this.button.textContent = this.buttonStates.playing;
        } else if (this.isPaused) {
            this.button.textContent = this.buttonStates.paused;
        } else {
            this.button.textContent = this.buttonStates.idle;
        }
    }

    /**
     * Set speaking rate (0.1 to 10)
     * @param {number} rate - Speech rate multiplier
     */
    setRate(rate) {
        this.rate = Math.max(0.1, Math.min(10, rate));
    }

    /**
     * Check if speech synthesis is currently active
     * @returns {boolean}
     */
    isActive() {
        return this.isPlaying || this.isPaused;
    }

    /**
     * Get current browser support status
     * @returns {boolean}
     */
    getSupported() {
        return this.isSupported;
    }

    /**
     * Get list of available voices (for future UI)
     * @returns {Array}
     */
    getAvailableVoices() {
        if (!this.isSupported) return [];
        return window.speechSynthesis.getVoices();
    }
}

// Create global instance
const speechManager = new SpeechManager();
