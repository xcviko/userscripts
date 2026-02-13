// ==UserScript==
// @name         youtube.js
// @version      1.1
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

// @updateURL    https://raw.githubusercontent.com/xcviko/userscripts/main/youtube.js
// @downloadURL  https://raw.githubusercontent.com/xcviko/userscripts/main/youtube.js

(function() {
    'use strict';

    // css overrides
    const style = document.createElement('style');
    style.textContent = `
        .ytp-overlay-bottom-right { display: none !important; }
    `;
    document.documentElement.appendChild(style);

    // loop: intercept native loop property
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

    // loop: reliable timeupdate-based repeat
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

    // Эмуляция событий
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

    // Слушаем события
    ['keydown', 'keyup', 'keypress'].forEach(eventType => {
        document.addEventListener(eventType, function(e) {

            // 0. Пропускаем наши же сгенерированные события
            if (e.isSimulated) return;

            const target = e.target;
            // 1. Игнор ввода текста
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return;
            }

            const code = e.code;
            const video = document.querySelector('video');

            // --- ПРОБЕЛ (SPACE) ---
            // Мы его удалили. Работает как задумано Ютубом.

            // Вся остальная логика только на нажатие (keydown)
            if (eventType !== 'keydown') return;
            if (!video) return;

            // --- БЛОКИРОВКА J и L ---
            if (code === 'KeyJ' || code === 'KeyL') {
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }

            // --- СТРЕЛКИ (Фикс фокуса + Option Seek) ---
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(code)) {

                // Сценарий 1: OPTION + Стрелка -> эмуляция J/L (10 сек)
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

                // Сценарий 2: ПРОСТЫЕ СТРЕЛКИ -> ФИКС ФОКУСА
                // Если случайно кликнул на громкость, стрелки вернут фокус на плеер и сработают нормально
                if (!e.ctrlKey && !e.shiftKey && !e.metaKey) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    focusPlayer();
                    const keyMap = {'ArrowLeft': 37, 'ArrowUp': 38, 'ArrowRight': 39, 'ArrowDown': 40};
                    simulateKey(code, keyMap[code], code, false);
                    return;
                }
            }

            // --- Б / Ю (Смена местами) ---
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

})();
