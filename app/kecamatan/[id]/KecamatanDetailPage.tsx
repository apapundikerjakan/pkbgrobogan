"use client";

import { useRouter } from "next/navigation";
import { motion, useMotionValue, useVelocity, animate, useIsomorphicLayoutEffect } from "framer-motion";
import {
  MapPinIcon,
  UsersIcon,
  ExternalLinkIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
} from "@/components/icons";
import type { KecamatanDetail } from "@/lib/kecamatan-detail";
import { useEffect } from "react";

/* ─── swipe-left-back hook ───────────────────────────────────── */
function useSwipeLeftBack(onSwipeLeft: () => void) {
  const x = useMotionValue(0);
  const velocity = useVelocity(x);

  useEffect(() => {
    const unsub = x.on("change", () => {
      const vel = Math.abs(velocity.get());
      const offset = x.get();
      if (offset < -80 || vel > 700) {
        x.set(window.innerWidth);
        onSwipeLeft();
      }
    });
    return unsub;
  }, [x, velocity, onSwipeLeft]);

  return x;
}

function PersonRow({ label, name, accent = false }: { label: string; name: string; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg px-3 py-2 ${accent ? "bg-leaf-600 text-white shadow-sm" : "bg-white shadow-sm border border-leaf-100"}`}>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${accent ? "bg-white/20 text-white" : "bg-leaf-100 text-leaf-700"}`}>
        {label}
      </span>
      <span className={`text-sm font-semibold ${accent ? "text-white" : "text-ink"}`}>{name}</span>
    </div>
  );
}

function PersonChip({ name, index }: { name: string; index: number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm border border-leaf-100">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-[10px] font-extrabold text-leaf-700">
        {index + 1}
      </span>
      <span className="text-sm text-ink">{name}</span>
    </div>
  );
}

/* ─── section wrapper ─────────────────────────────────────────── */
function Panel({ title, icon, children, accent = false }: { title: string; icon: React.ReactNode; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? "bg-leaf-700 text-white" : "bg-white border border-leaf-100 shadow-sm"}`}>
      <h3 className={`mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider ${accent ? "text-leaf-200" : "text-leaf-700"}`}>
        <span className={accent ? "text-leaf-300" : "text-leaf-500"}>{icon}</span>
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/* ─── main page ───────────────────────────────────────────────── */
export function KecamatanDetailPage({ data }: { data: KecamatanDetail }) {
  const router = useRouter();
  const totalWilayah = data.jumlahDesa + data.jumlahKelurahan;
  const desaItems = data.desa.filter((d) => d.tipe === "desa");
  const kelurahanItems = data.desa.filter((d) => d.tipe === "kelurahan");
  const p = data.pengurusLengkap;
  const swipeX = useSwipeLeftBack(() => router.back());

  /* count total pengurus */
  const totalPengurus = (() => {
    if (!p) return 0;
    return p.mustasyar.length + (p.syura?.ketua ? 1 : 0) + (p.syura?.wakilKetua?.length ?? 0) + (p.syura?.sekretaris ? 1 : 0) + (p.syura?.wakilSekretaris?.length ?? 0) + (p.syura?.bendahara ? 1 : 0)
      + (p.tanfidz?.ketua ? 1 : 0) + (p.tanfidz?.wakilKetua?.length ?? 0) + (p.tanfidz?.sekretaris ? 1 : 0) + (p.tanfidz?.wakilSekretaris?.length ?? 0) + (p.tanfidz?.bendahara ? 1 : 0) + (p.tanfidz?.wakilBendahara?.length ?? 0);
  })();

  return (
    <motion.div
      style={{ x: swipeX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fbfdf9]"
    >
      {/* sticky header */}
      <header className="sticky top-0 z-50 border-b border-leaf-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700 hover:text-leaf-900">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <span className="text-xs font-bold uppercase tracking-widest text-leaf-500">DPAC {data.nama}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">

        {/* ── Hero ───────────────────────────────────────────── */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold text-white bg-gradient-to-br from-leaf-500 to-leaf-800">
            {data.nama.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              {data.nama}
            </h1>
            <p className="mt-1 text-sm text-leaf-700">Kabupaten Grobogan, Jawa Tengah</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-bold text-leaf-800">Kode Kemendagri {data.kodeKemendagri}</span>
              <span className="rounded-full bg-honey-100 px-2.5 py-0.5 text-xs font-bold text-honey-700">{totalWilayah} desa/kelurahan</span>
              <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">2021–2026</span>
            </div>
          </div>
        </div>

        {/* ── Kepengurusan ringkas ───────────────────────────── */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-ink">
            <UsersIcon className="h-5 w-5 text-leaf-600" />
            Kepengurusan
          </h2>
          <div className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoBox label="Ketua" value={data.ketua} />
              <InfoBox label="Sekretaris" value={data.sekretaris} />
              <InfoBox label="Bendahara" value={data.bendahara} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-leaf-100 pt-4 text-xs">
              <InfoRow icon={<ClipboardDocumentIcon className="h-4 w-4 text-leaf-500" />} label="No. SK" value={data.noSK} />
              <InfoRow icon={<CalendarIcon className="h-4 w-4 text-leaf-500" />} label="Tgl SK" value={data.tanggalSK} />
              <InfoRow icon={<BuildingOfficeIcon className="h-4 w-4 text-leaf-500" />} label="Periode" value="2021–2026" />
              <InfoRow icon={<UsersIcon className="h-4 w-4 text-leaf-500" />} label="Total Pengurus" value={`${totalPengurus} orang`} />
              <InfoRow icon={<UsersIcon className="h-4 w-4 text-leaf-500" />} label="Keterwakilan P" value={data.keterwakilanPerempuan} />
            </div>
          </div>
        </section>

        {/* ── Struktur lengkap ───────────────────────────────── */}
        {p && (
          <section className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-ink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-leaf-600" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Susunan Lengkap
            </h2>
            <div className="space-y-4">

              {/* Mustasyar */}
              {p.mustasyar.length > 0 && (
                <Panel
                  title="Dewan Pertimbangan (Mustasyar)"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  }
                >
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {p.mustasyar.map((n, i) => <PersonChip key={n} name={n} index={i} />)}
                  </div>
                </Panel>
              )}

              {/* Syura */}
              {p.syura && p.syura.ketua && (
                <Panel
                  title="Dewan Syura"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  }
                >
                  <PersonRow label="Ketua" name={p.syura.ketua} accent />
                  {p.syura.wakilKetua.map((n) => <PersonRow key={n} label="Wakil Ketua" name={n} />)}
                  {p.syura.sekretaris && <PersonRow label="Sekretaris" name={p.syura.sekretaris} />}
                  {p.syura.wakilSekretaris?.map((n) => <PersonRow key={n} label="Wakil Sekretaris" name={n} />)}
                  {p.syura.bendahara && <PersonRow label="Bendahara" name={p.syura.bendahara} />}
                </Panel>
              )}

              {/* Tanfidz */}
              {p.tanfidz && (
                <Panel
                  title="Dewan Tanfidz"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  }
                  accent
                >
                  <PersonRow label="Ketua" name={p.tanfidz.ketua} accent />
                  {p.tanfidz.wakilKetua.map((n) => <PersonRow key={n} label="Wakil Ketua" name={n} />)}
                  <PersonRow label="Sekretaris" name={p.tanfidz.sekretaris} />
                  {p.tanfidz.wakilSekretaris.map((n) => <PersonRow key={n} label="Wakil Sekretaris" name={n} />)}
                  <PersonRow label="Bendahara" name={p.tanfidz.bendahara} />
                  {p.tanfidz.wakilBendahara.map((n) => <PersonRow key={n} label="Wakil Bendahara" name={n} />)}
                </Panel>
              )}
            </div>
          </section>
        )}

        {/* ── Keanggotaan ────────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-ink">
            <UsersIcon className="h-5 w-5 text-leaf-600" />
            Keanggotaan
          </h2>
          <div className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-leaf-700">
                {data.jumlahAnggota > 0 ? data.jumlahAnggota.toLocaleString("id-ID") : "—"}
              </span>
              <span className="text-sm text-leaf-600">kader terdaftar</span>
            </div>
            <p className="mt-2 text-xs text-leaf-500">
              Sumber: KPU RI — Pemutakhiran Partai Politik 2021–2026
              {data.jumlahAnggota === 0 && " (data belum tersedia di sumber publik)"}
            </p>
          </div>
        </section>

        {/* ── Wilayah Administrasi ───────────────────────────── */}
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-ink">
            <MapPinIcon className="h-5 w-5 text-leaf-600" />
            Wilayah Administrasi
          </h2>
          <div className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-800">{data.jumlahDesa} Desa</span>
              {data.jumlahKelurahan > 0 && (
                <span className="rounded-full bg-honey-100 px-3 py-1 text-xs font-bold text-honey-700">{data.jumlahKelurahan} Kelurahan</span>
              )}
              <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-800">Kodepos {data.kodepos}</span>
            </div>
            {desaItems.length > 0 && (
              <div className="mb-3">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-leaf-500">Desa ({desaItems.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {desaItems.map((d) => (
                    <span key={d.nama} className="rounded-md border border-leaf-200 bg-leaf-50 px-2 py-0.5 text-xs font-medium text-leaf-700">
                      {d.nama}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {kelurahanItems.length > 0 && (
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-honey-600">Kelurahan ({kelurahanItems.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {kelurahanItems.map((k) => (
                    <span key={k.nama} className="rounded-md border border-honey-200 bg-honey-50 px-2 py-0.5 text-xs font-medium text-honey-700">
                      {k.nama}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Sumber ─────────────────────────────────────────── */}
        <div className="mb-8 rounded-2xl border border-leaf-100 bg-white p-4 shadow-sm text-xs text-leaf-600">
          <p className="font-semibold text-leaf-700">Sumber data</p>
          <ul className="mt-1 space-y-0.5">
            <li>• Struktur kepengurusan: SK DPW PKB Jawa Tengah {data.noSK}</li>
            <li>• Wilayah desa/kelurahan: Wikipedia — Daftar kecamatan Grobogan</li>
            <li>• Keanggotaan: KPU RI (infopemilu.kpu.go.id)</li>
          </ul>
        </div>

        {/* ── Actions ────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 pb-12 sm:flex-row">
          <a href={data.urlKPU} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-leaf-800">
            <ExternalLinkIcon className="h-4 w-4" />
            Lihat di KPU RI
          </a>
          <button type="button" onClick={() => router.back()} className="rounded-full border border-leaf-200 px-6 py-3 text-sm font-bold text-leaf-800 transition hover:bg-leaf-50">
            Kembali ke Peta
          </button>
        </div>
      </main>
    </motion.div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-leaf-50/60 p-4">
      <dt className="text-[11px] font-bold uppercase tracking-wider text-leaf-500">{label}</dt>
      <dd className="mt-1 text-sm font-extrabold text-ink leading-snug">{value}</dd>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 text-leaf-700">
      {icon}
      <span className="font-semibold">{label}:</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
