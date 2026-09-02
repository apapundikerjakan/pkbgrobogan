import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image({ params }: { params?: { id: string } }) {
  const id = params?.id ?? "";
  // Map id to kecamatan name
  const names: Record<string, string> = {
    purwodadi: "Purwodadi",
    geyer: "Geyer",
    toroh: "Toroh",
    grobogan: "Grobogan",
    wirosari: "Wirosari",
    tawangharjo: "Tawangharjo",
    ngaringan: "Ngaringan",
    klambu: "Klambu",
    kradenan: "Kradenan",
    pulokulon: "Pulokulon",
    gabus: "Gabus",
    tegowanu: "Tegowanu",
    kedungjati: "Kedungjati",
    gubug: "Gubug",
    tanggungharjo: "Tanggungharjo",
    penawaran: "Penawangan",
    karangrayung: "Karangrayung",
    brati: "Brati",
    godong: "Godong",
  };
  const name = names[id] ?? "Grobogan";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#194e36",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 800, color: "#194e36" }}>PKB</span>
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          DPAC PKB Kecamatan {name}
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "#bbe4cb",
            textAlign: "center",
          }}
        >
          Kabupaten Grobogan, Jawa Tengah
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: "#f9a208",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
