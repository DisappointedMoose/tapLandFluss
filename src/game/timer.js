function tlf_timer() {
    return {
        maxSeconds: 10,
        secondsLeft: 0,
        interval: null,

        reset: function () {
            this.secondsLeft = this.maxSeconds;
        },

        stopTimer: function () {
            this.reset();
            clearInterval(this.interval);
        },

        startTimer: function () {
            this.stopTimer();

            this.interval = setInterval(() => {
                if(this.secondsLeft > 0) {
                    this.secondsLeft -= 1;
                } else {
                    window.dispatchEvent(new Event('tlf-timer-end'));
                }
            }, 1000);
        }
    }
}

window.tlf_timer = tlf_timer;