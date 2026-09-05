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
    <div aria-hidden className="pointer-events-none absolute right-0 top-4 h-[250px] w-[250px] sm:top-0 sm:h-[680px] sm:w-[680px]">
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

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-32 pt-32 sm:px-8 sm:pb-40 sm:pt-60">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-5 text-4xl font-extrabold leading-snug tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]"
        >
          <span className="block sm:inline">DPAC PKB </span>
          <span className="block bg-gradient-to-r from-honey-300 to-honey-500 bg-clip-text text-transparent sm:inline">
            Grobogan
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5 max-w-xl text-sm leading-relaxed text-leaf-100/85 sm:text-base"
        >
          Satu sarang, sembilan belas kecamatan. Seperti lebah yang mengambil
          madu tanpa merusak bunga, kami bekerja untuk rakyat tanpa meninggalkan
          siapa pun.
        </motion.p>

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
