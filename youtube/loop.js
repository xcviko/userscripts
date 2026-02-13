function initLoop() {
    // intercept native loop property
    const nativeLoop = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'loop');
    let loopOn = false;

    Object.defineProperty(HTMLMediaElement.prototype, 'loop', {
        get() { return loopOn; },
        set(v) {
            loopOn = !!v;
            nativeLoop.set.call(this, false);
        },
        configurable: true,
        enumerable: true
    });

    // reliable timeupdate-based repeat
    let curVideo = null;

    function onTimeUpdate(e) {
        const v = e.target;
        if (!loopOn) return;
        if (!isFinite(v.duration) || v.duration < 1) return;
        const player = document.getElementById('movie_player');
        if (player && player.classList.contains('ad-showing')) return;
        if (v.duration - v.currentTime < 1.5) {
            v.currentTime = 0;
        }
    }

    function bindVideo() {
        const v = document.querySelector('#movie_player video');
        if (v && v !== curVideo) {
            if (curVideo) curVideo.removeEventListener('timeupdate', onTimeUpdate);
            curVideo = v;
            v.addEventListener('timeupdate', onTimeUpdate);
        }
    }

    new MutationObserver(bindVideo).observe(document.documentElement, {
        childList: true, subtree: true
    });

    document.addEventListener('yt-navigate-finish', bindVideo);
}
