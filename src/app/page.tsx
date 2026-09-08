"use client";

import { useState } from "react";

// Cloth cost formula:
// Result = Reed + Pick + Reed Parti * Arz / 20 / Count * 1.0936 / Dhaga Rate / 40

type FieldKey = "reed" | "pick" | "reedParti" | "arz" | "count" | "dhagaRate";

const fields: { key: FieldKey; labelUrdu: string; labelEnglish: string }[] = [
  { key: "reed", labelUrdu: "ریڈ", labelEnglish: "Reed" },
  { key: "pick", labelUrdu: "پک", labelEnglish: "Pick" },
  { key: "reedParti", labelUrdu: "ریڈ پرتی", labelEnglish: "Reed Parti" },
  { key: "arz", labelUrdu: "عرض", labelEnglish: "Width" },
  { key: "count", labelUrdu: "کاؤنٹ", labelEnglish: "Count" },
  { key: "dhagaRate", labelUrdu: "دھاگے کا ریٹ", labelEnglish: "Dhaga Rate" },
];

function calculate(values: Record<FieldKey, number>): number {
  const { reed, pick, reedParti, arz, count, dhagaRate } = values;
  return (
    reed +
    pick +
    (reedParti * arz) / 20 / count * 1.0936 / dhagaRate / 40
  );
}

export default function Home() {
  const [values, setValues] = useState<Record<FieldKey, number>>({
    reed: 0,
    pick: 0,
    reedParti: 0,
    arz: 0,
    count: 0,
    dhagaRate: 0,
  });
  const [result, setResult] = useState<number | null>(null);

  function handleChange(key: FieldKey, raw: string) {
    setValues((prev) => ({ ...prev, [key]: Number(raw) }));
  }

  function handleCalculate() {
    setResult(calculate(values));
  }

  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 ring-1 ring-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 pt-8 pb-6 text-center">
            <div className="text-3xl mb-2">🧵</div>
            <h1
              dir="rtl"
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-urdu)" }}
            >
              دھاگے کا کیلکولیٹر
            </h1>
            <p className="text-sm font-semibold tracking-wide text-indigo-100 uppercase">
              Yarn Calculator
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-7 space-y-5">
            {fields.map((field) => (
              <div key={field.key}>
                <label
                  dir="rtl"
                  htmlFor={field.key}
                  className="flex items-baseline justify-between mb-1.5"
                >
                  <span
                    className="text-lg font-bold text-black"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    {field.labelUrdu}
                  </span>
                  <span
                    dir="ltr"
                    className="text-xs font-semibold uppercase tracking-wide text-slate-400"
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
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold text-black placeholder-slate-400 outline-none transition-colors focus:border-indigo-500 focus:bg-white"
                  placeholder="0"
                />
              </div>
            ))}

            <button
              onClick={handleCalculate}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-[1.02] hover:shadow-indigo-300 active:scale-[0.99]"
            >
              <span dir="rtl" className="text-lg" style={{ fontFamily: "var(--font-urdu)" }}>
                حساب کریں
              </span>
              <span className="ms-2 text-sm font-semibold text-indigo-100">
                Calculate
              </span>
            </button>

            {result !== null && (
              <div className="relative mt-2 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600 p-6 text-center shadow-lg shadow-indigo-200">
                <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/10" />

                <div
                  dir="rtl"
                  className="relative mb-2 text-sm font-bold uppercase tracking-wide text-indigo-100"
                  style={{ fontFamily: "var(--font-urdu)" }}
                >
                  نتیجہ
                </div>
                <div className="relative text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                  {Number.isFinite(result) ? result.toFixed(2) : "—"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
