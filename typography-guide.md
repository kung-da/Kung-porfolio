# Typography Guide — Kung Portfolio
> Khi nào dùng font nào. Không được dùng tùy tiện.

## Font Roles

| Font | Tailwind class | Dùng khi nào |
|---|---|---|
| **Orbitron** | `font-display` | H1 hero, section decorative labels lớn, logo |
| **Rajdhani** | `font-title` | H2, H3, nav links, card titles, buttons, badges |
| **Inter** | `font-sans` | Body text, descriptions, bio, paragraphs, form labels |
| **JetBrains Mono** | `font-mono` | Tech stack tags, code snippets, data values, timestamps, system labels |
| **Noto Serif JP** | `font-jp` | Kanji/JP decorative accent text only — dùng rất ít |

## Quick Reference

```tsx
// ✅ Đúng — prose dùng font-sans (Inter)
<p className="font-sans text-base text-stone">Description text...</p>

// ✅ Đúng — heading dùng font-title (Rajdhani)
<h2 className="font-title text-2xl font-bold">SECTION TITLE</h2>

// ✅ Đúng — hero H1 dùng font-display (Orbitron)
<h1 className="font-display text-5xl font-black">CUNG-MASTER</h1>

// ✅ Đúng — tech tag dùng font-mono (JetBrains Mono)
<span className="font-mono text-xs tag-mono">Python</span>

// ❌ Sai — prose không dùng mono
<p className="font-mono text-base">Description...</p>

// ❌ Sai — button không dùng display font
<button className="font-display text-sm">Click me</button>
```

## Letter Spacing Rules

- `font-display` (Orbitron): `tracking-tight` hoặc default
- `font-title` (Rajdhani): `tracking-wide` cho uppercase labels
- `font-sans` (Inter): default (0)
- `font-mono` (JetBrains): `tracking-wider` cho tags, `tracking-widest` cho system labels
