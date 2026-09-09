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

export default function Home() {
  const [values, setValues] = useState<Record<FieldKey, number>>({
    arz: 0,
    reed: 0,
    pick: 0,
    count: 0,
    onePoundDhagaRate: 0,
  });
  const [result, setResult] = useState<CalcResult | null>(null);

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
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-white ring-2 ring-slate-200 px-6 py-4">
                  <span
                    dir="rtl"
                    className="text-lg font-bold text-black"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    تار
                  </span>
                  <span className="text-2xl font-extrabold text-black">
                    {fmt(result.taar)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white ring-2 ring-slate-200 px-6 py-4">
                  <span
                    dir="rtl"
                    className="text-lg font-bold text-black"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    دھاگے کا وزن
                  </span>
                  <span className="text-2xl font-extrabold text-black">
                    {fmt(result.yarnWeight)}{" "}
                    <span className="text-base font-semibold text-slate-500">Pound</span>
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white ring-2 ring-indigo-100 px-6 py-4">
                  <span
                    dir="rtl"
                    className="text-lg font-bold text-black"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    دھاگے کا ریٹ
                  </span>
                  <span className="text-3xl font-extrabold text-black">
                    {fmt(result.dhagaRate)}{" "}
                    <span
                      dir="rtl"
                      className="text-base font-semibold text-slate-500"
                      style={{ fontFamily: "var(--font-urdu)" }}
                    >
                      روپے
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
