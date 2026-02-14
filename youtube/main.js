// ==UserScript==
// @name         youtube
// @version      2.2
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/xcviko/userscripts/main/youtube/main.js
// @downloadURL  https://raw.githubusercontent.com/xcviko/userscripts/main/youtube/main.js
// @require      https://raw.githubusercontent.com/xcviko/userscripts/main/youtube/css.js
// @require      https://raw.githubusercontent.com/xcviko/userscripts/main/youtube/loop.js
// @require      https://raw.githubusercontent.com/xcviko/userscripts/main/youtube/hotkeys.js
// ==/UserScript==

(function() {
    'use strict';
    initCSS();
    initLoop();
    initHotkeys();
})();
