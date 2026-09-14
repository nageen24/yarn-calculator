"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/", labelUrdu: "تانا بانا کیلکولیٹر" },
  { href: "/tana-calculator", labelUrdu: "تانا کیلکولیٹر" },
  { href: "/bana-calculator", labelUrdu: "بانا کیلکولیٹر" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        aria-expanded={open}
        className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-700 shadow-md ring-1 ring-neutral-200 transition-colors hover:bg-neutral-50"
      >
        <span className="text-xl leading-none" aria-hidden>
          {open ? "✕" : "☰"}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-16 right-4 z-50 w-60 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200">
            {pages.map((page) => {
              const active = pathname === page.href;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setOpen(false)}
                  dir="rtl"
                  className={`block px-4 py-3.5 text-right text-base font-bold transition-colors ${
                    active
                      ? "bg-amber-50 text-amber-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                  style={{ fontFamily: "var(--font-urdu)" }}
                >
                  {page.labelUrdu}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
