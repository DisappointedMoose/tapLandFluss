import './timer';
import './players';
import './categories';

function tapLandFluss() {
    return {
        currentScreen: 'gameboard',
        roundInProgress: false,
        usedLetters: [],
        letters: [],
        timer: null,
        players: null,
        categories: null,
        activeCategory: '',
        isFullscreen: false,

        init: function () {
            this.initLetters();

            this.timer = tlf_timer();
            this.categories = tlf_categories();

            this.players = tlf_players();
            this.players.init();

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

                if(this.usedLetters.length === this.letters.length) {
                    this.usedLetters = [];
                }

                this.timer.reset();
                this.players.activateNextPlayer();
            }
        },

        canUseLetter: function (letter) {
            return !this.usedLetters.includes(letter);
        },

        startRound: function () {
            this.usedLetters = [];
            this.players.reviveAllPlayers();
            this.timer.startTimer();
            this.roundInProgress = true;
            this.currentScreen = 'gameboard';
        },

        endRound: function () {
            this.timer.stopTimer();
            this.timer.reset();
            this.roundInProgress = false;
            this.currentScreen = 'winner';
        },

        cancelRound: function () {
            this.timer.stopTimer();
            this.timer.reset();
            this.roundInProgress = false;
            this.currentScreen = 'gameboard';
        },

        openCategoryPicker: function () {
            this.currentScreen = 'categoryPicker';
            this.pickCategory();
        },

        pickCategory: function () {
            let categories = this.categories.getList();

            let randomIndex = Math.floor(Math.random() * categories.length);
            this.activeCategory = categories[randomIndex];
        },

        observerTimerEnd: function () {
            this.players.eliminateCurrentPlayer();
            this.players.activateNextPlayer();
            if (this.players.getAlivePlayerCount() > 1) {
                this.timer.reset();
            } else {
                this.endRound();
            }
        },

        showSettings: function () {
            this.currentScreen = 'settings';
        },

        hideSettings: function () {
            this.currentScreen = 'gameboard';
        },

        toggleFullscreen: function () {
            if(!this.isFullscreen) {
                document.documentElement.requestFullscreen()
            } else {
                document.exitFullscreen()
            }

            this.isFullscreen = !this.isFullscreen;
        }
    }
}

window.tapLandFluss = tapLandFluss;