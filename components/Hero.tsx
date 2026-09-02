"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, HexIcon } from "./icons";
import { Globe3D } from "./Globe3D";
import { DAPIL, KECAMATAN, TOTAL_DESA } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function FloatingHex({ className, delay, dur }: { className: string; delay: number; dur: number }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute text-white/[0.07] ${className}`}
      animate={{ y: [-10, 12, -10], rotate: [8, -6, 8] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <HexIcon className="h-full w-full" />
    </motion.div>
  );
}

function LogoWatermark() {
  return (
    <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] sm:h-[680px] sm:w-[680px]">
      {/* Rotating 3D globe */}
      <div className="absolute inset-0">
        <Globe3D className="h-full w-full" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden border-b border-leaf-100 bg-gradient-to-b from-leaf-950 via-leaf-900 to-leaf-800 text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-leaf-500/25 blur-3xl" />
        <div className="absolute bottom-0 right-[-60px] h-[300px] w-[300px] rounded-full bg-honey-500/15 blur-3xl" />
      </div>
      <LogoWatermark />
      <FloatingHex className="left-[6%] top-16 h-16 w-16 sm:h-24 sm:w-24" delay={0} dur={7} />
      <FloatingHex className="right-[8%] top-40 h-10 w-10 sm:h-16 sm:w-16" delay={1.2} dur={9} />
      <FloatingHex className="bottom-14 left-[18%] h-8 w-8 sm:h-12 sm:w-12" delay={2} dur={6} />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-honey-400/40 bg-honey-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-honey-300">
            <span className="h-1.5 w-1.5 rounded-full bg-honey-400" />
            Dewan Pengurus Anak Cabang
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          DPAC PKB{" "}
          <span className="bg-gradient-to-r from-honey-300 to-honey-500 bg-clip-text text-transparent">
            Grobogan
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5 max-w-xl text-base leading-relaxed text-leaf-100/85 sm:text-lg"
        >
          Satu sarang, sembilan belas kecamatan. Seperti lebah yang mengambil
          madu tanpa merusak bunga, kami bekerja untuk rakyat tanpa meninggalkan
          siapa pun.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#kecamatan"
            className="group inline-flex items-center gap-2 rounded-full bg-honey-400 px-6 py-3.5 text-sm font-extrabold text-leaf-950 shadow-lg shadow-honey-500/25 transition hover:bg-honey-300"
          >
            Jelajahi Sarang Kita
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Hubungi Kami
          </a>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-12 grid max-w-lg grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { n: String(KECAMATAN.length), l: "Kecamatan" },
            { n: String(DAPIL.length), l: "Dapil" },
            { n: `${TOTAL_DESA}`, l: "Desa & Kelurahan" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-4 backdrop-blur-sm sm:px-5"
            >
              <dt className="order-last mt-1 block text-[11px] font-semibold uppercase tracking-wider text-leaf-200/80 sm:text-xs">
                {s.l}
              </dt>
              <dd className="text-2xl font-extrabold text-honey-300 sm:text-3xl">{s.n}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
