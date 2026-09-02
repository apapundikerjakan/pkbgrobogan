import { KecamatanDetailPage } from "./KecamatanDetailPage";
import { kecamatanDetailById, KECAMATAN_DETAIL } from "@/lib/kecamatan-detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 0;

export function generateStaticParams() {
  return KECAMATAN_DETAIL.map((k) => ({ id: k.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const k = kecamatanDetailById(id);
  if (!k) return { title: "Kecamatan Tidak Ditemukan" };
  return {
    title: `DPAC PKB ${k.nama} — Grobogan`,
    description: `Struktur kepengurusan DPAC PKB Kecamatan ${k.nama}, Kabupaten Grobogan.`,
  };
}

export default async function KecamatanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const k = kecamatanDetailById(id);
  if (!k) notFound();
  return <KecamatanDetailPage data={k} />;
}
