# userscripts

Tampermonkey userscripts for Chrome.

## Current structure

Flat — one file per service:

```
├── youtube.js
├── telegraph.css
└── aistudio.css
```

Naming: `service.js` for logic scripts, `service.css` for style-only scripts.

## TODO: modular structure

When a script grows large enough to split, move it into a directory with `@require`:

```
├── youtube/
│   ├── main.js              # entry point with @require for each module
│   ├── block-shorts.js
│   └── watch-hotkeys.js
├── telegraph.css
└── aistudio.css
```

`main.js` uses raw GitHub URLs to load modules:

```js
// @require https://raw.githubusercontent.com/xcviko/userscripts/main/youtube/block-shorts.js
// @require https://raw.githubusercontent.com/xcviko/userscripts/main/youtube/watch-hotkeys.js
```

When this happens, update this README to reflect the new structure.

## Rules for future Claude sessions

- **Bump `@version`** in the userscript header on every change. Tampermonkey uses this to detect updates.
