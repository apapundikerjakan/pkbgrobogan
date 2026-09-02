"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useVelocity, animate } from "framer-motion";
import { DAPIL, type Kecamatan } from "@/lib/data";
import { MapPinIcon, UsersIcon, CloseIcon } from "./icons";

export function KecamatanSheet({
  item,
  onClose,
}: {
  item: Kecamatan | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const x = useMotionValue(0);
  const velocity = useVelocity(x);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-leaf-950/50 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            key={item.id}
            style={{ x }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            drag="x"
            dragConstraints={{ left: -window.innerWidth * 0.8, right: 0 }}
            dragElastic={{ left: 0.2, right: 0 }}
            onDragStart={() => animate(x, 0, { duration: 0 })}
            onDragEnd={(_, info) => {
              const absVel = Math.abs(velocity.get());
              const offset = info.offset.x;
              // Swipe left: offset negative and > threshold, or fast swipe
              if (offset < -100 || absVel > 500) {
                animate(x, -window.innerWidth, { type: "tween", duration: 0.2, ease: "easeIn" })
                  .then(onClose);
              } else {
                animate(x, 0, { type: "tween", duration: 0.2, ease: "easeOut" });
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-leaf-200 sm:hidden" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 rounded-full p-1.5 text-leaf-500 transition hover:bg-leaf-50 hover:text-leaf-800"
            >
              <CloseIcon />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold text-white ${
                  item.ibukota
                    ? "bg-gradient-to-br from-honey-400 to-honey-600"
                    : "bg-gradient-to-br from-leaf-500 to-leaf-800"
                }`}
              >
                {item.nama.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink">
                  DPAC {item.nama}
                  {item.ibukota && (
                    <span className="ml-2 rounded-full bg-honey-100 px-2 py-0.5 align-middle text-[10px] font-extrabold uppercase tracking-wider text-honey-600">
                      Ibu Kota
                    </span>
                  )}
                </h3>
                <span className="mt-1 inline-block rounded-full bg-leaf-700 px-2.5 py-0.5 text-xs font-bold text-white">
                  {DAPIL.find((d) => d.id === item.dapil)?.label} · {" "}
                  {DAPIL.find((d) => d.id === item.dapil)?.kursi} kursi
                </span>
              </div>
            </div>

            <dl className="mt-5 space-y-3 rounded-2xl border border-leaf-100 bg-leaf-50/60 p-4 text-sm">
              <div className="flex items-start gap-3">
                <UsersIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-leaf-500">
                    Ketua
                  </dt>
                  <dd className="font-bold text-ink">{item.ketua}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UsersIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-leaf-500">
                    Sekretaris
                  </dt>
                  <dd className="font-bold text-ink">{item.sekretaris}</dd>
                </div>
              </div>
              {item.bendahara && (
                <div className="flex items-start gap-3">
                  <UsersIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-leaf-500">
                      Bendahara
                    </dt>
                    <dd className="font-bold text-ink">{item.bendahara}</dd>
                  </div>
                </div>
              )}
              {item.noSK && (
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-leaf-500">
                      SK & Periode
                    </dt>
                    <dd className="font-bold text-ink">{item.noSK}</dd>
                    <dd className="text-xs text-leaf-600">{item.tanggalSK}</dd>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" />
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-leaf-500">
                    Wilayah
                  </dt>
                  <dd className="font-bold text-ink">{item.desa} desa / kelurahan</dd>
                </div>
              </div>
            </dl>

            <p className="mt-3 text-[11px] italic text-leaf-500">
              *Data dari KPU RI — pemutakhiran parpol 2021-2026.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => router.push(`/kecamatan/${item.id}`)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-leaf-800"
              >
                Detail Kepengurusan
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-leaf-200 px-4 py-3 text-sm font-bold text-leaf-800 transition hover:bg-leaf-50"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
