"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { KECAMATAN, type Kecamatan } from "@/lib/data";
import { FilterChips } from "./FilterChips";
import { KecamatanSheet } from "./KecamatanSheet";

const S = 26;
const W = Math.sqrt(3) * S;

function hexPoints(cx: number, cy: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((60 * i - 30) * Math.PI) / 180;
    return `${(cx + S * Math.cos(a)).toFixed(2)},${(cy + S * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

function HexCell({
  k,
  dimmed,
  shown,
  onSelect,
}: {
  k: Kecamatan;
  dimmed: boolean;
  shown: boolean;
  onSelect: (k: Kecamatan) => void;
}) {
  const cx = W * (k.q + k.r / 2);
  const cy = 1.5 * S * k.r;
  const fill = k.ibukota ? "url(#hex-honey)" : "url(#hex-green)";
  const dist = Math.abs(k.q) + Math.abs(k.r);

  return (
    <motion.g
      onClick={() => onSelect(k)}
      initial={{ opacity: 0, scale: 0 }}
      animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
        delay: 0.15 + dist * 0.12,
      }}
      whileHover={{ scale: dimmed ? 1 : 1.09 }}
      whileTap={{ scale: dimmed ? 1 : 0.96 }}
      style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
      role="button"
      aria-label={`Kecamatan ${k.nama}, dapil ${k.dapil}`}
    >
      <polygon
        points={hexPoints(cx, cy)}
        fill={dimmed ? "#dcf2e4" : fill}
        stroke={k.ibukota && !dimmed ? "#f9a208" : "#ffffff"}
        strokeWidth={1.6}
        opacity={dimmed ? 0.45 : 1}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        className="select-none"
        fontSize={7.4}
        fontWeight={800}
        letterSpacing={0.2}
        fill={dimmed ? "#8ccfaa" : k.ibukota ? "#5a3a00" : "#ffffff"}
      >
        {k.lines.length === 1 ? (
          <tspan x={cx} dy={2.6}>
            {k.lines[0]}
          </tspan>
        ) : (
          <>
            <tspan x={cx} dy={-1.6}>
              {k.lines[0]}
            </tspan>
            <tspan x={cx} dy={9.4}>
              {k.lines[1]}
            </tspan>
          </>
        )}
      </text>
      <text
        x={cx}
        y={cy + (k.lines.length === 1 ? 12 : 18)}
        textAnchor="middle"
        fontSize={5.4}
        fontWeight={700}
        letterSpacing={0.6}
        fill={dimmed ? "#55b183" : k.ibukota ? "#8a5c00" : "#bbe4cb"}
        opacity={dimmed ? 0.5 : 0.95}
        className="select-none"
      >
        {`DPIL ${k.dapil}`}
      </text>
    </motion.g>
  );
}

export function HoneycombMap({
  dapil,
  onDapilChange,
}: {
  dapil: number | null;
  onDapilChange: (v: number | null) => void;
}) {
  const [selected, setSelected] = useState<Kecamatan | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });

  const cells = useMemo(() => [...KECAMATAN].sort((a, b) => a.r - b.r || a.q - b.q), []);

  return (
    <section id="kecamatan" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-honey-600">
          Sarang Kita
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Pengurus DPAC Grobogan
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-leaf-800/70 sm:text-base">
          Setiap kecamatan punya sarangnya sendiri. Saring berdasarkan dapil untuk
          melihat pengurus DPAC di wilayah tersebut.
        </p>
      </div>

      <div className="mt-8">
        <FilterChips value={dapil} onChange={onDapilChange} />
      </div>

      <motion.div
        ref={wrapRef}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-10 max-w-xl"
      >
        <svg
          viewBox="-118 -110 236 220"
          className="w-full drop-shadow-sm"
          role="img"
          aria-label="Peta honeycomb 19 kecamatan Kabupaten Grobogan"
        >
          <defs>
            <linearGradient id="hex-green" x1="0" y1="-26" x2="0" y2="26">
              <stop stopColor="#34a06b" />
              <stop offset="1" stopColor="#155e3f" />
            </linearGradient>
            <linearGradient id="hex-honey" x1="0" y1="-26" x2="0" y2="26">
              <stop stopColor="#ffd45c" />
              <stop offset="1" stopColor="#f9a208" />
            </linearGradient>
          </defs>
          {cells.map((k) => (
            <HexCell
              key={k.id}
              k={k}
              shown={inView}
              dimmed={dapil !== null && k.dapil !== dapil}
              onSelect={setSelected}
            />
          ))}
        </svg>
      </motion.div>

      <p className="mt-6 text-center text-xs font-semibold text-leaf-600">
        Sel kuning = Purwodadi, ibu kota kabupaten · Sentuh sel untuk detail DPAC
      </p>

      <KecamatanSheet item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
