import './timer';
import tlf_categories from './categories.json';
import tlf_adult_categories from './adult_categories.json';

function tapLandFluss() {
    return {
        displayCategoryPicker: false,
        roundInProgress: false,
        usedLetters: [],
        letters: [],
        includeAdultCategories: false,
        timer: null,
        category: '',

        init: function () {
            this.initLetters();
            this.timer = tlf_timer();

            this.registerEvents();
        },

        registerEvents: function () {
            window.addEventListener('tlf-timer-end', this.observerTimerEnd.bind(this));
        },

        initLetters: function () {
            for (let i = 97; i <= 122; i++) {
                this.letters.push(String.fromCharCode(i));
            }
        },

        useLetter: function (letter) {
            if (this.canUseLetter(letter)) {
                this.usedLetters.push(letter);
                this.timer.reset();
            }
        },

        canUseLetter: function (letter) {
            return !this.usedLetters.includes(letter);
        },

        startRound: function () {
            this.usedLetters = [];
            this.timer.startTimer();
            this.roundInProgress = true;
            this.displayCategoryPicker = false;
        },

        endRound: function () {
            this.timer.stopTimer();
            this.timer.reset();
            this.roundInProgress = false;
        },

        openCategoryPicker: function () {
            this.displayCategoryPicker = true;
            this.pickCategory();
        },

        pickCategory: function () {
            let categories = tlf_categories;
            if(this.includeAdultCategories) {
                categories = categories.concat(tlf_adult_categories);
            }

            let randomIndex = Math.floor(Math.random() * categories.length);
            this.category = categories[randomIndex];
        },

        observerTimerEnd: function () {
            this.endRound();
        }
    }
}

window.tapLandFluss = tapLandFluss;