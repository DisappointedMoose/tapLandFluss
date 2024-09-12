function tlf_players() {
    return {
        colors: [
            'bg-vonCount',
            'bg-buffy',
            'bg-vanHelsing',
            'bg-nosferatu',
            'bg-blade',
            'bg-marcelin',
            'bg-cullen',
            'bg-aro',
            'bg-morbius',
            'bg-dracula',
            'bg-lincoln',
        ],
        players: [],
        activePlayer: 0,

        init: function () {
            if (this.players.length === 0) {
                this.addPlayer('1st Player');
                this.addPlayer('2nd Player');
                this.addPlayer('3rd Player');
            }
        },

        addPlayer: function (name) {
            this.players.push({
                name: (name === undefined ? '' : name),
                color: this.getNextPlayerColor(),
                alive: true,
            });
        },

        removePlayer: function (index) {
            if (this.players.length > 1) {
                if (index === undefined) {
                    this.players.pop();
                } else {
                    this.players.splice(index, 1);
                }
            }
        },

        getRandomPlayerColor: function () {
            return this.colors[Math.floor(Math.random() * this.colors.length)];
        },

        getNextPlayerColor: function () {
            return this.colors[(this.players.length % this.colors.length)];
        },

        activateNextPlayer: function () {
            let nextPlayer = this.activePlayer;
            do {
                nextPlayer++;
                if (nextPlayer > this.players.length - 1) {
                    nextPlayer = 0;
                }
            } while (!this.players[nextPlayer].alive);

            this.activePlayer = nextPlayer;
        },

        eliminateCurrentPlayer: function () {
            this.players[this.activePlayer].alive = false;
        },

        getAlivePlayerCount: function () {
            let aliveCount = 0;
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].alive) {
                    aliveCount++;
                }
            }

            return aliveCount;
        },

        revivePlayer: function (playerIndex) {
            this.players[playerIndex].alive = true;
        },

        reviveAllPlayers: function () {
            for (let i = 0; i < this.players.length; i++) {
                this.revivePlayer(i);
            }
        },

        reset: function () {
            this.reviveAllPlayers();
            this.activePlayer = 0;
        }
    }
}

window.tlf_players = tlf_players;