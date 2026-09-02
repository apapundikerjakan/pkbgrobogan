"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";
import {
  ArrowRightIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "./icons";

export function ContactSection() {
  return (
    <section
      id="kontak"
      className="scroll-mt-20 border-t border-leaf-100 bg-gradient-to-b from-leaf-50/70 to-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-honey-600">
              Sekretariat
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Mari Terhubung dengan Sarang Kita
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-leaf-800/70 sm:text-base">
              Punya aspirasi, ingin bergabung menjadi lebah muda, atau sekadar
              bertanya? Pintu sarang kami selalu terbuka.
            </p>

            <ul className="mt-7 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-700/10 text-leaf-700">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Alamat Sekretariat</p>
                  <p className="text-leaf-800/70">
                    Jl. Raya Purwodadi No. 19, Purwodadi, Kab. Grobogan, Jawa Tengah{" "}
                    <span className="italic">(contoh alamat)</span>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-700/10 text-leaf-700">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Telepon / WhatsApp</p>
                  <p className="text-leaf-800/70">+62 812-3456-7890</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-700/10 text-leaf-700">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Email</p>
                  <p className="text-leaf-800/70">dpacpkb.grobogan@email.com</p>
                </div>
              </li>
            </ul>

            <div className="mt-7 flex gap-3">
              {[
                { icon: InstagramIcon, label: "Instagram", href: "#" },
                { icon: YoutubeIcon, label: "YouTube", href: "#" },
                { icon: WhatsappIcon, label: "WhatsApp", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-leaf-200 text-leaf-700 transition hover:border-leaf-700 hover:bg-leaf-700 hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-leaf-800 to-leaf-950 p-7 text-white sm:p-9"
          >
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-honey-500/15 blur-3xl" />
            <Logo size={44} />
            <h3 className="mt-5 text-2xl font-extrabold tracking-tight">
              Gabung Jadi Lebah Muda
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-leaf-100/80">
              Anak muda Grobogan, ayo masuk sarang! Kaderisasi terbuka untuk siapa pun
              yang ingin belajar politik yang bersih dan berkah.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Assalamualaikum%2C%20saya%20ingin%20bergabung%20dengan%20DPAC%20PKB%20Grobogan."
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-honey-400 px-6 py-3.5 text-sm font-extrabold text-leaf-950 shadow-lg shadow-honey-500/25 transition hover:bg-honey-300"
            >
              Daftar via WhatsApp
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs text-leaf-200/70">
              Sekretariat buka Senin – Jumat, 08.00 – 16.00 WIB
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-leaf-950 text-leaf-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="leading-tight">
                <span className="block text-sm font-extrabold text-white">DPAC PKB</span>
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-leaf-300">
                  Kab. Grobogan
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-leaf-300/75">
              Sarang perjuangan Partai Kebangkitan Bangsa untuk 19 kecamatan di
              Kabupaten Grobogan, Jawa Tengah.
            </p>
          </div>
          <nav aria-label="Tautan situs">
            <p className="text-xs font-extrabold uppercase tracking-widest text-honey-400">
              Tautan
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px] font-semibold">
              {[
                ["#kecamatan", "Kecamatan"],
                ["#tentang", "Tentang"],
                ["#kontak", "Kontak"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="transition hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-honey-400">
              DPC PKB Jateng
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-leaf-300/75">
              Jl. Raya Purwodadi No. 19, Purwodadi, Kab. Grobogan, Jawa Tengah 58112
            </p>
            <p className="mt-2 text-[13px] text-leaf-300/75">+62 812-3456-7890</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-leaf-400/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DPAC PKB Kabupaten Grobogan. Hak cipta dilindungi.</p>
          <p>Satu sarang, satu madu, satu Grobogan.</p>
        </div>
      </div>
    </footer>
  );
}
