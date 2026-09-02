import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KecamatanDetailPage } from "./KecamatanDetailPage";
import { kecamatanDetailById } from "@/lib/kecamatan-detail";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const k = kecamatanDetailById(id);
  if (!k) return { title: "Kecamatan Tidak Ditemukan" };
  return {
    title: `DPAC PKB ${k.nama} — Grobogan`,
    description: `Struktur kepengurusan DPAC PKB Kecamatan ${k.nama}, Kabupaten Grobogan. Ketua: ${k.ketua}.`,
    openGraph: {
      title: `DPAC PKB Kecamatan ${k.nama}`,
      description: `Struktur kepengurusan DPAC PKB Kecamatan ${k.nama}, Kabupaten Grobogan.`,
      images: [`/kecamatan/${id}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: `DPAC PKB Kecamatan ${k.nama}`,
      description: `Struktur kepengurusan DPAC PKB Kecamatan ${k.nama}, Kabupaten Grobogan.`,
      images: [`/kecamatan/${id}/opengraph-image`],
    },
  };
}

export default async function KecamatanDetailLayout({ params }: Props) {
  const { id } = await params;
  const k = kecamatanDetailById(id);
  if (!k) notFound();
  return <KecamatanDetailPage data={k} />;
}
