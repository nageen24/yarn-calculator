# Yarn Calculator (دھاگے کا کیلکولیٹر)

A yarn/cloth cost calculator with an Urdu-labeled input form. Built with Next.js, deployed on Vercel.

## Formula

A 3-step chained calculation — each step's result feeds into the next.
Evaluated **left-to-right, calculator-style (not BODMAS)**:

```
Step 1 — Taar        = Reed × Arz + Reed Taar Parti

Step 2 — Yarn Weight = (Pick × Arz + Taar) × 1.0936 / (20 × Count × 40)
                        → in Pound

Step 3 — Dhaga Rate  = Yarn Weight × (1 Pound Dhaga Rate)
                        → final answer
```

### Inputs (shown on the UI in this order, all required)

| Field | Urdu Label |
|---|---|
| Arz (Width) | عرض |
| Reed | ریڈ |
| Reed Taar Parti | ریڈ تار پرتی |
| Pick | پک |
| Count | کاؤنٹ |
| 1 Pound Dhaga Rate | 1 پاؤنڈ دھاگے کا ریٹ |

Every field is marked required (red asterisk). Clicking Calculate with any field
empty highlights it in red with an Urdu message ("براہ کرم یہ خانہ پُر کریں")
instead of running the calculation.

### Outputs (all 3 shown on the UI)

| Result | Urdu Label |
|---|---|
| Taar | تار |
| Yarn Weight (Pound) | دھاگے کا وزن |
| Dhaga Rate (final) | دھاگے کا ریٹ |

The Urdu text is display-only — internally, each field/result is stored under a plain English key (`arz`, `reed`, `pick`, `count`, `onePoundDhagaRate`, `taar`, `yarnWeight`, `dhagaRate`) that the formula operates on directly, regardless of the language shown on screen.

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
