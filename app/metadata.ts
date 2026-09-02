import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DPAC PKB Kabupaten Grobogan — Satu Sarang, 19 Kecamatan",
  description: "Situs resmi Dewan Pengurus Anak Cabang Partai Kebangkitan Bangsa Kabupaten Grobogan. Honeycomb 19 kecamatan, struktur pengurus per dapil, dan filosofi lebah PKB.",
  icons: {
    icon: "/pkb-logo.png",
    apple: "/pkb-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://dpacpkbgrobogan.id",
    siteName: "DPAC PKB Kabupaten Grobogan",
    title: "DPAC PKB Kabupaten Grobogan — Satu Sarang, 19 Kecamatan",
    description: "Situs resmi struktur kepengurusan DPAC PKB Kabupaten Grobogan periode 2021–2026.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DPAC PKB Kabupaten Grobogan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DPAC PKB Kabupaten Grobogan",
    description: "Struktur kepengurusan DPAC PKB 19 kecamatan Kabupaten Grobogan.",
    images: ["/opengraph-image"],
  },
  metadataBase: new URL("https://dpacpkbgrobogan.id"),
};
