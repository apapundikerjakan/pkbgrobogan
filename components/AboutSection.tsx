"use client";

import { motion } from "framer-motion";
import { HandHeartIcon, HexIcon, MegaphoneIcon, QuoteIcon, UsersIcon } from "./icons";

const MISI = [
  {
    icon: HexIcon,
    title: "Memperkuat Sarang",
    desc: "Membangun DPAC yang solid di 19 kecamatan dengan kaderisasi berkelanjutan.",
  },
  {
    icon: HandHeartIcon,
    title: "Mengabdi ke Rakyat",
    desc: "Seperti lebah mengambil madu tanpa merusak bunga — berjuang tanpa membebani rakyat.",
  },
  {
    icon: UsersIcon,
    title: "Menghidupkan NU & Buruh",
    desc: "Menjaga amanat wong cilik, nahiyah, dan buruh sebagai basis perjuangan PKB.",
  },
  {
    icon: MegaphoneIcon,
    title: "Menyuarakan Kebijakan",
    desc: "Mendorong kebijakan pro-rakyat dari desa hingga DPRD Kabupaten Grobogan.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function AboutSection() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-leaf-900 to-leaf-950 p-7 text-white sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-honey-500/15 blur-2xl" />
          <QuoteIcon className="h-9 w-9 text-honey-400" />
          <blockquote className="mt-5 text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
            &ldquo;Ambillah madunya, jangan patahkan tangkainya. Jadilah seperti
            lebah — bekerja keras, menghasilkan manfaat, dan tidak merugikan siapa
            pun.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm font-semibold text-leaf-200/85">
            Filosofi lebah PKB — Gus Dur, diteruskan oleh Cak Imin
          </p>
          <p className="mt-4 text-sm leading-relaxed text-leaf-100/70">
            Nama Partai Kebangkitan Bangsa lahir dari semangat kebangkitan kembali:
            satuan organisasi disebut &ldquo;sarang&rdquo;, kader disebut
            &ldquo;lebah&rdquo;, dan hasil perjuangan adalah &ldquo;madu&rdquo; untuk
            rakyat.
          </p>
        </motion.div>

        <div>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-honey-600">
              Tentang Kami
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Visi &amp; Misi
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-leaf-800/70 sm:text-base">
              DPAC PKB Kabupaten Grobogan adalah sarang perjuangan untuk 19 kecamatan —
              menghadirkan politik yang berkah, jujur, dan dekat dengan wong cilik.
            </p>
          </motion.div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {MISI.map((m, i) => (
              <motion.li
                key={m.title}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={2 + i}
                className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-700/10 text-leaf-700">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-extrabold tracking-tight text-ink">{m.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-leaf-800/70">{m.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
