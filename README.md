# userscripts

Tampermonkey userscripts for Chrome.

## Structure

```
├── youtube/
│   ├── main.js       # entry point (@require modules)
│   ├── css.js        # hide overlay, hide shorts
│   ├── loop.js       # reliable video loop via timeupdate rewind
│   └── hotkeys.js    # keyboard shortcuts (arrow focus fix, J/L block, cyrillic swap)
├── telegraph/
│   └── main.js       # dark mode
└── aistudio/
    └── main.js       # compact spacing, hide promo
```

Each site is a folder. `main.js` is the Tampermonkey entry point.

For multi-file scripts (youtube), `main.js` uses `@require` to load feature modules.
Each module exports an `initFeatureName()` function called from `main.js`.

## Adding a feature

1. Create `youtube/my-feature.js` with a `function initMyFeature() { ... }`
2. Add `@require` in `youtube/main.js` header
3. Call `initMyFeature()` in the IIFE body
4. Bump `@version` in `main.js`

## Conventions

- Bump `@version` on every change — Tampermonkey uses it for auto-update
- One feature per file for youtube, single file for css-only scripts
- `@run-at document-start` for scripts that intercept native APIs
