"use client";

import { motion } from "framer-motion";
import { DAPIL } from "@/lib/data";

export function FilterChips({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  const chips: { id: number | null; label: string }[] = [
    { id: null, label: "Semua" },
    ...DAPIL.map((d) => ({ id: d.id as number | null, label: `${d.label} · ${d.kursi} kursi` })),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {chips.map((chip) => {
        const active = chip.id === value;
        return (
          <button
            key={String(chip.id)}
            type="button"
            onClick={() => onChange(chip.id)}
            className={`relative rounded-full px-4 py-2 text-[13px] font-bold transition ${
              active ? "text-white" : "bg-white text-leaf-800 ring-1 ring-leaf-200 hover:bg-leaf-50"
            }`}
          >
            {active && (
              <motion.span
                layoutId="chip-pill"
                className="absolute inset-0 rounded-full bg-leaf-700 shadow-md shadow-leaf-700/25"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className={`relative ${active ? "" : ""}`}>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
}
