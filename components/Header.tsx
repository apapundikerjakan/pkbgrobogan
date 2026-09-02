"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon } from "./icons";

const NAV = [
  { href: "#beranda", label: "Beranda" },
  { href: "#kecamatan", label: "Kecamatan" },
  { href: "#tentang", label: "Tentang" },
  { href: "#kontak", label: "Kontak" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#beranda" className="flex items-center gap-2.5">
          <Logo size={38} />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-leaf-900">
              DPAC PKB
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-leaf-600">
              Kab. Grobogan
            </span>
          </span>
        </a>

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

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl p-2 text-leaf-900 transition hover:bg-leaf-50 md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-leaf-100 bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-[15px] font-semibold text-leaf-900 transition hover:bg-leaf-50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#kontak"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-xl bg-leaf-700 px-3 py-2.5 text-center text-[15px] font-bold text-white"
              >
                Gabung Kader
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
