"use client";

import { useState } from "react";

// Cloth cost formula:
// Result = Reed + Pick + Reed Parti * Arz / 20 / Count * 1.0936 / Dhaga Rate / 40

type FieldKey = "reed" | "pick" | "reedParti" | "arz" | "count" | "dhagaRate";

const fields: { key: FieldKey; labelUrdu: string; labelEnglish: string }[] = [
  { key: "reed", labelUrdu: "ریڈ", labelEnglish: "Reed" },
  { key: "pick", labelUrdu: "پک", labelEnglish: "Pick" },
  { key: "reedParti", labelUrdu: "ریڈ پرتی", labelEnglish: "Reed Parti" },
  { key: "arz", labelUrdu: "عرض", labelEnglish: "Arz" },
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1
          dir="rtl"
          className="text-2xl font-bold text-center mb-1"
          style={{ fontFamily: "var(--font-urdu)" }}
        >
          ٹیکسٹائل کیلکولیٹر
        </h1>
        <p className="text-center text-sm text-slate-500 mb-8">
          Textile Calculator
        </p>

        <div className="space-y-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label
                dir="rtl"
                htmlFor={field.key}
                className="block text-right text-base mb-1.5"
                style={{ fontFamily: "var(--font-urdu)" }}
              >
                {field.labelUrdu}
                <span
                  dir="ltr"
                  className="text-slate-400 text-xs font-sans ms-2"
                >
                  ({field.labelEnglish})
                </span>
              </label>
              <input
                id={field.key}
                type="number"
                dir="ltr"
                inputMode="decimal"
                value={values[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleCalculate}
          className="mt-7 w-full rounded-lg bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 transition-colors"
        >
          <span dir="rtl" style={{ fontFamily: "var(--font-urdu)" }}>
            حساب کریں
          </span>
          <span className="text-indigo-200 text-sm ms-2">(Calculate)</span>
        </button>

        {result !== null && (
          <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
            <div
              dir="rtl"
              className="text-sm text-slate-500 mb-1"
              style={{ fontFamily: "var(--font-urdu)" }}
            >
              نتیجہ
            </div>
            <div className="text-2xl font-semibold text-slate-900">
              {Number.isFinite(result) ? result.toFixed(2) : "—"}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
