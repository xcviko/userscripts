function initCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .ytp-overlay-bottom-right { display: none !important; }
        ytd-reel-shelf-renderer { display: none !important; }
    `;
    document.documentElement.appendChild(style);
}
