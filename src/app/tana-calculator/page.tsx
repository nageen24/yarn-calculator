// Placeholder page for "Tana Calculator" (تانا کیلکولیٹر).
// Fields and formula to be added — this page just establishes the route
// and matches the visual style of the other calculator.

export default function TanaCalculatorPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm">
        <div className="rounded-[28px] bg-white shadow-xl shadow-neutral-900/5 ring-1 ring-neutral-200/80 px-8 py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl ring-1 ring-amber-100">
            🧮
          </div>
          <h1
            dir="rtl"
            className="mb-2 text-[1.7rem] font-extrabold leading-tight text-neutral-900"
            style={{ fontFamily: "var(--font-urdu)" }}
          >
            تانا کیلکولیٹر
          </h1>
          <p
            dir="rtl"
            className="text-sm font-semibold text-neutral-400"
            style={{ fontFamily: "var(--font-urdu)" }}
          >
            جلد شامل کیا جائے گا
          </p>
        </div>
      </div>
    </main>
  );
}
