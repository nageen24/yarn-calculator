# Yarn Calculator (دھاگے کا کیلکولیٹر)

A yarn/cloth cost calculator with an Urdu-labeled input form. Built with Next.js, deployed on Vercel.

## Formula

```
Result = Reed + Pick + Reed Parti × Arz ÷ 20 ÷ Count × 1.0936 × Dhaga Rate ÷ 40
```

Standard math order of operations applies (× and ÷ before +, evaluated left to right).

### Inputs

| Field | Urdu Label |
|---|---|
| Reed | ریڈ |
| Pick | پک |
| Reed Parti | ریڈ پرتی |
| Arz (Width) | عرض |
| Count | کاؤنٹ |
| Dhaga Rate | دھاگے کا ریٹ |

The Urdu text is display-only — internally, each field is stored under a plain English key (`reed`, `pick`, `reedParti`, `arz`, `count`, `dhagaRate`) that the formula operates on directly, regardless of the language shown on screen.

## Tech Stack

- **[Next.js](https://nextjs.org/)** (App Router) — React framework, deployed on Vercel with zero-config
- **TypeScript** — type-safe form state and calculation logic
- **Tailwind CSS** — styling
- **[Noto Nastaliq Urdu](https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu)** (Google Fonts) — Urdu label rendering
- All calculation runs **client-side** in the browser — no backend/API required

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```
