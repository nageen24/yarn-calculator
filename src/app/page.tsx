"use client";

import { useState } from "react";

// 3-step chained formula:
// Step 1: Taar        = Arz * Reed
// Step 2: Yarn Weight  = (Pick * Arz + Taar * 1.0936) / (20 * Count * 40)   [in Pound]
// Step 3: Dhaga Rate   = Yarn Weight * (1 Pound Dhaga Rate)                 [final answer]

type FieldKey = "arz" | "reed" | "pick" | "count" | "onePoundDhagaRate";

const fields: { key: FieldKey; labelUrdu: string; labelEnglish: string }[] = [
  { key: "arz", labelUrdu: "عرض", labelEnglish: "Width" },
  { key: "reed", labelUrdu: "ریڈ", labelEnglish: "Reed" },
  { key: "pick", labelUrdu: "پک", labelEnglish: "Pick" },
  { key: "count", labelUrdu: "کاؤنٹ", labelEnglish: "Count" },
  { key: "onePoundDhagaRate", labelUrdu: "1 پاؤنڈ دھاگے کا ریٹ", labelEnglish: "1 Pound Dhaga Rate" },
];

type CalcResult = {
  taar: number;
  yarnWeight: number;
  dhagaRate: number;
};

function calculate(values: Record<FieldKey, number>): CalcResult {
  const { arz, reed, pick, count, onePoundDhagaRate } = values;

  const taar = arz * reed;
  const yarnWeight = (pick * arz + taar * 1.0936) / (20 * count * 40);
  const dhagaRate = yarnWeight * onePoundDhagaRate;

  return { taar, yarnWeight, dhagaRate };
}

function fmt(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : "—";
}

const initialValues: Record<FieldKey, number> = {
  arz: 0,
  reed: 0,
  pick: 0,
  count: 0,
  onePoundDhagaRate: 0,
};

export default function Home() {
  const [values, setValues] = useState<Record<FieldKey, number>>(initialValues);
  const [result, setResult] = useState<CalcResult | null>(null);

  function handleChange(key: FieldKey, raw: string) {
    setValues((prev) => ({ ...prev, [key]: Number(raw) }));
  }

  function handleClear() {
    setValues(initialValues);
    setResult(null);
  }

  function handleCalculate() {
    setResult(calculate(values));
  }

  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm">
        <div className="rounded-[28px] bg-white shadow-xl shadow-neutral-900/5 ring-1 ring-neutral-200/80">
          {/* Header */}
          <div className="flex flex-col items-center px-8 pt-9 pb-7">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl ring-1 ring-amber-100">
              🧵
            </div>
            <h1
              dir="rtl"
              className="text-[1.7rem] font-extrabold leading-tight text-neutral-900"
              style={{ fontFamily: "var(--font-urdu)" }}
            >
              دھاگے کا کیلکولیٹر
            </h1>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">
              Yarn Calculator
            </p>
          </div>

          <div className="h-px bg-neutral-100" />

          {/* Form */}
          <div className="px-8 pt-6 pb-8 space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label
                  dir="rtl"
                  htmlFor={field.key}
                  className="mb-1.5 flex items-baseline justify-between"
                >
                  <span
                    className="text-[1.05rem] font-bold text-neutral-900"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    {field.labelUrdu}
                  </span>
                  <span
                    dir="ltr"
                    className="text-[10px] font-bold uppercase tracking-wider text-neutral-400"
                  >
                    {field.labelEnglish}
                  </span>
                </label>
                <input
                  id={field.key}
                  type="number"
                  dir="ltr"
                  inputMode="decimal"
                  value={values[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-lg font-bold text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                  placeholder="0"
                />
              </div>
            ))}

            <button
              onClick={handleCalculate}
              className="!mt-6 w-full rounded-2xl bg-neutral-900 py-4 font-bold text-white shadow-lg shadow-neutral-900/15 transition-all hover:bg-neutral-800 active:scale-[0.98]"
            >
              <span dir="rtl" className="text-lg" style={{ fontFamily: "var(--font-urdu)" }}>
                حساب کریں
              </span>
              <span className="ms-2 text-sm font-semibold text-neutral-400">
                Calculate
              </span>
            </button>

            {result !== null && (
              <div className="!mt-6 space-y-4 animate-[fadeIn_0.25s_ease-out]">
                <div className="flex items-center justify-between">
                  <span
                    dir="rtl"
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    نتائج
                  </span>
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <span aria-hidden>↺</span>
                    <span dir="rtl" style={{ fontFamily: "var(--font-urdu)" }}>
                      صاف کریں
                    </span>
                  </button>
                </div>

                {/* Intermediate steps — receipt style */}
                <div className="rounded-2xl bg-neutral-50 px-5 py-1 ring-1 ring-neutral-100">
                  <div className="flex items-center justify-between border-b border-dashed border-neutral-200 py-3">
                    <span
                      dir="rtl"
                      className="text-sm font-bold text-neutral-500"
                      style={{ fontFamily: "var(--font-urdu)" }}
                    >
                      تار
                    </span>
                    <span className="text-base font-bold text-neutral-700">
                      {fmt(result.taar)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span
                      dir="rtl"
                      className="text-sm font-bold text-neutral-500"
                      style={{ fontFamily: "var(--font-urdu)" }}
                    >
                      دھاگے کا وزن
                    </span>
                    <span className="text-base font-bold text-neutral-700">
                      {fmt(result.yarnWeight)}{" "}
                      <span className="text-xs font-semibold text-neutral-400">Pound</span>
                    </span>
                  </div>
                </div>

                {/* Final answer — hero card */}
                <div className="rounded-2xl bg-neutral-900 px-6 py-5 text-center shadow-lg shadow-neutral-900/20">
                  <div
                    dir="rtl"
                    className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    دھاگے کا ریٹ
                  </div>
                  <div className="text-4xl font-extrabold tracking-tight text-white">
                    {fmt(result.dhagaRate)}{" "}
                    <span
                      dir="rtl"
                      className="text-lg font-semibold text-neutral-400"
                      style={{ fontFamily: "var(--font-urdu)" }}
                    >
                      روپے
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
