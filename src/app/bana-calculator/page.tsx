"use client";

import { useState } from "react";

// Independent from the other calculators — own fields, own formula.
// 2-step chained formula (left-to-right, calculator-style — not BODMAS):
// Step 1: Bana Wazan = ((Pick * Bar * 1.0936) / (20 * Count)) / 40
// Step 2: Bana Rate  = Bana Wazan * Dhaga Rate                    [final answer]

type FieldKey = "pick" | "bar" | "count" | "dhagaRate";

const fields: { key: FieldKey; labelUrdu: string; labelEnglish: string }[] = [
  { key: "pick", labelUrdu: "پک", labelEnglish: "Pick" },
  { key: "bar", labelUrdu: "بر", labelEnglish: "Bar" },
  { key: "count", labelUrdu: "کاؤنٹ", labelEnglish: "Count" },
  { key: "dhagaRate", labelUrdu: "دھاگے کا ریٹ", labelEnglish: "Dhaga Rate" },
];

type CalcResult = {
  banaWazan: number;
  banaRate: number;
};

function calculate(values: Record<FieldKey, number>): CalcResult {
  const { pick, bar, count, dhagaRate } = values;

  const banaWazan = (pick * bar * 1.0936) / (20 * count) / 40;
  const banaRate = banaWazan * dhagaRate;

  return { banaWazan, banaRate };
}

function fmt(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : "—";
}

const initialValues: Record<FieldKey, string> = {
  pick: "",
  bar: "",
  count: "",
  dhagaRate: "",
};

const initialErrors: Record<FieldKey, boolean> = {
  pick: false,
  bar: false,
  count: false,
  dhagaRate: false,
};

export default function BanaCalculatorPage() {
  const [values, setValues] = useState<Record<FieldKey, string>>(initialValues);
  const [errors, setErrors] = useState<Record<FieldKey, boolean>>(initialErrors);
  const [result, setResult] = useState<CalcResult | null>(null);

  function handleChange(key: FieldKey, raw: string) {
    setValues((prev) => ({ ...prev, [key]: raw }));
    if (errors[key] && raw.trim() !== "") {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  }

  function handleClear() {
    setValues(initialValues);
    setErrors(initialErrors);
    setResult(null);
  }

  function handleCalculate() {
    const newErrors = { ...initialErrors };
    let hasError = false;
    for (const field of fields) {
      if (values[field.key].trim() === "") {
        newErrors[field.key] = true;
        hasError = true;
      }
    }
    setErrors(newErrors);

    if (hasError) {
      setResult(null);
      return;
    }

    const numericValues = Object.fromEntries(
      fields.map((f) => [f.key, Number(values[f.key])])
    ) as Record<FieldKey, number>;

    setResult(calculate(numericValues));
  }

  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm">
        <div className="rounded-[28px] bg-white shadow-xl shadow-neutral-900/5 ring-1 ring-neutral-200/80">
          {/* Header */}
          <div className="flex flex-col items-center px-8 pt-9 pb-7">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl ring-1 ring-amber-100">
              🧶
            </div>
            <h1
              dir="rtl"
              className="text-[1.7rem] font-extrabold leading-tight text-neutral-900"
              style={{ fontFamily: "var(--font-urdu)" }}
            >
              بانا کیلکولیٹر
            </h1>
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
                    <span className="ms-1 text-red-500">*</span>
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
                  value={values[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`w-full rounded-2xl border px-4 py-3 text-lg font-bold text-neutral-900 placeholder-neutral-300 outline-none transition-all focus:ring-4 ${
                    errors[field.key]
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/10"
                      : "border-neutral-200 bg-neutral-50 focus:border-amber-500 focus:bg-white focus:ring-amber-500/10"
                  }`}
                  placeholder="0"
                />
                {errors[field.key] && (
                  <p
                    dir="rtl"
                    className="mt-1 text-[10px] font-bold text-red-500"
                    style={{ fontFamily: "var(--font-urdu)" }}
                  >
                    براہ کرم یہ خانہ پُر کریں
                  </p>
                )}
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
                <span
                  dir="rtl"
                  className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400"
                  style={{ fontFamily: "var(--font-urdu)" }}
                >
                  نتائج
                </span>

                {/* Intermediate step — receipt style */}
                <div className="rounded-2xl bg-neutral-50 px-5 py-1 ring-1 ring-neutral-100">
                  <div className="flex items-center justify-between py-3">
                    <span
                      dir="rtl"
                      className="text-sm font-bold text-neutral-500"
                      style={{ fontFamily: "var(--font-urdu)" }}
                    >
                      بانا وزن
                    </span>
                    <span className="text-base font-bold text-neutral-700">
                      {fmt(result.banaWazan)}
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
                    بانا ریٹ
                  </div>
                  <div className="text-4xl font-extrabold tracking-tight text-white">
                    {fmt(result.banaRate)}{" "}
                    <span
                      dir="rtl"
                      className="text-lg font-semibold text-neutral-400"
                      style={{ fontFamily: "var(--font-urdu)" }}
                    >
                      روپے
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleClear}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 py-3 text-sm font-bold text-neutral-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                >
                  <span aria-hidden className="text-base">↺</span>
                  <span dir="rtl" style={{ fontFamily: "var(--font-urdu)" }}>
                    صاف کریں
                  </span>
                  <span className="text-neutral-400">Clear</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
