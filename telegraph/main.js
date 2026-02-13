// ==UserScript==
// @name         telegraph
// @version      1.0
// @match        https://telegra.ph/*
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/xcviko/userscripts/main/telegraph/main.js
// @downloadURL  https://raw.githubusercontent.com/xcviko/userscripts/main/telegraph/main.js
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        html, body {
            background: #1a1a1a !important;
        }

        * {
            color: #e0e0e0 !important;
        }

        ::selection {
            background: #3d4a5c !important;
            color: #fff !important;
        }

        /* Tooltip button icons */
        .tl_tooltip button::before,
        .tl_tooltip button::after {
            filter: brightness(0) invert(1) !important;
        }

        /* Inline editor buttons */
        figure button::before,
        figure button::after {
            filter: brightness(0) invert(1) !important;
        }

        /* Placeholders */
        [data-placeholder]::before,
        [data-placeholder]::after {
            color: #888 !important;
            border-color: #555 !important;
            filter: none !important;
        }

        /* Publish button */
        aside button {
            background: #333 !important;
            color: #fff !important;
        }

        /* Links */
        a {
            color: #8ab4f8 !important;
        }

        /* Image caption */
        figcaption,
        figcaption input,
        figcaption .editable_input,
        figure figcaption {
            background: #1a1a1a !important;
            color: #888 !important;
        }

        /* Report footer */
        .tl_page_footer,
        .tl_footer,
        footer,
        .report,
        [class*="report"],
        .tl_article + div {
            background: #1a1a1a !important;
            color: #666 !important;
        }

        /* Popup */
        .tl_popup_body,
        .tl_popup main,
        .tl_popup section,
        .tl_popup form {
            background: #2a2a2a !important;
        }

        .tl_popup input,
        .tl_popup textarea,
        input,
        textarea {
            background: transparent !important;
            color: #e0e0e0 !important;
            border-color: #444 !important;
        }

        input::placeholder,
        textarea::placeholder {
            color: #666 !important;
        }
    `);
})();
