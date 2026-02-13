function initHotkeys() {
    function simulateKey(keyChar, keyCode, code, shiftKey) {
        const target = document.body;
        const eventObj = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            view: window,
            key: keyChar,
            code: code,
            keyCode: keyCode,
            which: keyCode,
            shiftKey: shiftKey,
            altKey: false,
            ctrlKey: false,
            metaKey: false
        });
        eventObj.isSimulated = true;
        target.dispatchEvent(eventObj);
    }

    function focusPlayer() {
        const player = document.getElementById('movie_player');
        if (player) {
            player.focus();
        } else if (document.activeElement) {
            document.activeElement.blur();
        }
    }

    ['keydown', 'keyup', 'keypress'].forEach(eventType => {
        document.addEventListener(eventType, function(e) {

            // skip our own simulated events
            if (e.isSimulated) return;

            const target = e.target;
            // ignore text inputs
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return;
            }

            const code = e.code;
            const video = document.querySelector('video');

            // all key logic is keydown only
            if (eventType !== 'keydown') return;
            if (!video) return;

            // block J and L
            if (code === 'KeyJ' || code === 'KeyL') {
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }

            // arrows: focus fix + option seek
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(code)) {

                // option + arrow -> emulate J/L (10 sec seek)
                if (e.altKey) {
                    if (code === 'ArrowLeft' || code === 'ArrowRight') {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        focusPlayer();
                        if (code === 'ArrowLeft') simulateKey('j', 74, 'KeyJ', false);
                        if (code === 'ArrowRight') simulateKey('l', 76, 'KeyL', false);
                        return;
                    }
                    return;
                }

                // plain arrows -> fix focus then forward to player
                if (!e.ctrlKey && !e.shiftKey && !e.metaKey) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    focusPlayer();
                    const keyMap = {'ArrowLeft': 37, 'ArrowUp': 38, 'ArrowRight': 39, 'ArrowDown': 40};
                    simulateKey(code, keyMap[code], code, false);
                    return;
                }
            }

            // swap , and < (cyrillic Б/Ю layout fix)
            if (code === 'Comma') {
                e.preventDefault();
                e.stopImmediatePropagation();
                if (e.shiftKey) simulateKey(',', 188, 'Comma', false);
                else simulateKey('<', 188, 'Comma', true);
                return;
            }

            if (code === 'Period') {
                e.preventDefault();
                e.stopImmediatePropagation();
                if (e.shiftKey) simulateKey('.', 190, 'Period', false);
                else simulateKey('>', 190, 'Period', true);
                return;
            }

        }, true);
    });
}
