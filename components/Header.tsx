"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

const NAV = [
  { href: "#beranda", label: "Beranda" },
  { href: "#kecamatan", label: "Kecamatan" },
  { href: "#tentang", label: "Tentang" },
  { href: "#kontak", label: "Kontak" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-leaf-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#beranda" className="flex items-center gap-2">
          <Logo size={34} />
          <span className="leading-tight">
            <span className="block text-[13px] font-extrabold tracking-tight text-leaf-900">
              DPAC PKB
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-leaf-600">
              Kab. Grobogan
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-leaf-800 transition hover:bg-leaf-50 hover:text-leaf-950"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="ml-2 rounded-full bg-leaf-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-leaf-800"
          >
            Gabung
          </a>
        </nav>

        {/* Mobile nav — horizontal scroll, no hamburger */}
        <nav className="flex md:hidden">
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-leaf-800 transition hover:bg-leaf-50"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontak"
              className="whitespace-nowrap rounded-full bg-leaf-700 px-3 py-1.5 text-xs font-bold text-white"
            >
              Gabung
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
