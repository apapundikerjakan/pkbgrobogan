export type Dapil = {
  id: number;
  label: string;
  wilayah: string[];
  kursi: number;
};

export type Kecamatan = {
  id: string;
  nama: string;
  lines: string[];
  dapil: number;
  ketua: string;
  sekretaris: string;
  bendahara?: string;
  noSK?: string;
  tanggalSK?: string;
  detailUrl?: string;
  desa: number;
  ibukota?: boolean;
  q: number;
  r: number;
};

// DATA REAL dari KPU (SK DPW Jateng 2021-2026)
// Sumber: https://infopemilu.kpu.go.id/Pemilu/Kabko_pemutakhiran_parpol/kabko_parpol/8/3315
export const DAPIL: Dapil[] = [
  { id: 1, label: "Dapil 1", wilayah: ["Geyer", "Purwodadi", "Toroh"], kursi: 11 },
  { id: 2, label: "Dapil 2", wilayah: ["Grobogan", "Ngaringan", "Tawangharjo", "Wirosari"], kursi: 10 },
  { id: 3, label: "Dapil 3", wilayah: ["Gabus", "Kradenan", "Pulokulon"], kursi: 9 },
  { id: 4, label: "Dapil 4", wilayah: ["Gubug", "Kedungjati", "Tanggungharjo", "Tegowanu"], kursi: 8 },
  { id: 5, label: "Dapil 5", wilayah: ["Brati", "Godong", "Karangrayung", "Klambu", "Penawangan"], kursi: 12 },
];

export const KECAMATAN: Kecamatan[] = [
  { id: "purwodadi", nama: "Purwodadi", lines: ["Purwodadi"], dapil: 1, ketua: "Hj. Sri Murdiati, SH", sekretaris: "Achmad Mishbah", bendahara: "Sudar", noSK: "693/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331513", desa: 22, ibukota: true, q: 0, r: 0 },
  { id: "geyer", nama: "Geyer", lines: ["Geyer"], dapil: 1, ketua: "Tarjan", sekretaris: "Warsito", bendahara: "Dewi Sartika", noSK: "695/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331505", desa: 17, q: 0, r: -1 },
  { id: "toroh", nama: "Toroh", lines: ["Toroh"], dapil: 1, ketua: "Ahmad Habibi, S.Ag", sekretaris: "Dwi Prasetyo", bendahara: "Nur Waqiah", noSK: "694/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331504", desa: 20, q: 1, r: -1 },
  { id: "grobogan", nama: "Grobogan", lines: ["Grobogan"], dapil: 2, ketua: "Ahmad Zaenudin", sekretaris: "Ulil Albab", bendahara: "Markum", noSK: "696/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331512", desa: 15, q: -1, r: 0 },
  { id: "wirosari", nama: "Wirosari", lines: ["Wirosari"], dapil: 2, ketua: "Saiful Mujab", sekretaris: "Asmudi", bendahara: "Durrotun Nisah", noSK: "698/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331510", desa: 18, q: 1, r: 0 },
  { id: "tawangharjo", nama: "Tawangharjo", lines: ["Tawang", "harjo"], dapil: 2, ketua: "Ali Shobirin", sekretaris: "Rosad Junaidi", bendahara: "Darminto", noSK: "697/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331511", desa: 16, q: 0, r: 1 },
  { id: "ngaringan", nama: "Ngaringan", lines: ["Ngari", "ngan"], dapil: 2, ketua: "Abd. Hadi", sekretaris: "M. Ali Irwan", bendahara: "Muslikin", noSK: "699/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331509", desa: 12, q: -1, r: 1 },
  { id: "klambu", nama: "Klambu", lines: ["Klambu"], dapil: 5, ketua: "Masruri", sekretaris: "Sukardi", bendahara: "Mukhamad Amin", noSK: "711/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331515", desa: 14, q: -1, r: -1 },
  { id: "kradenan", nama: "Kradenan", lines: ["Krade", "nan"], dapil: 3, ketua: "Saifudin Zuhri", sekretaris: "Ali Sobirin, S.H", bendahara: "Athiqoh", noSK: "701/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331514", desa: 13, q: 0, r: -2 },
  { id: "pulokulon", nama: "Pulokulon", lines: ["Pulo", "kulon"], dapil: 3, ketua: "Ali Musyarofi", sekretaris: "Izudin", bendahara: "Siti Nur Rosidah", noSK: "702/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331506", desa: 17, q: 1, r: -2 },
  { id: "gabus", nama: "Gabus", lines: ["Gabus"], dapil: 3, ketua: "M. Asrori", sekretaris: "Ahmad Khamid Al Kamidi", bendahara: "Haryanto", noSK: "700/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331503", desa: 15, q: 2, r: -2 },
  { id: "tegowanu", nama: "Tegowanu", lines: ["Tego", "wanu"], dapil: 4, ketua: "Zaeni Mustofa", sekretaris: "Rohimin", bendahara: "Darmadi", noSK: "704/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331517", desa: 11, q: 2, r: -1 },
  { id: "kedungjati", nama: "Kedungjati", lines: ["Kedung", "jati"], dapil: 4, ketua: "Novem Ariya Kusuma", sekretaris: "Mohamat Aripin", bendahara: "Kuswinarti", noSK: "706/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331501", desa: 13, q: 2, r: 0 },
  { id: "gubug", nama: "Gubug", lines: ["Gubug"], dapil: 4, ketua: "Agus", sekretaris: "Budi Utomo", bendahara: "Sabikin", noSK: "703/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331507", desa: 12, q: 1, r: 1 },
  { id: "tanggungharjo", nama: "Tanggungharjo", lines: ["Tanggung", "harjo"], dapil: 4, ketua: "Supriyono", sekretaris: "Khumaedi", bendahara: "Siti Khoeriyah", noSK: "705/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331516", desa: 16, q: 0, r: 2 },
  { id: "penawangan", nama: "Penawangan", lines: ["Penaw", "angan"], dapil: 5, ketua: "Rohimin", sekretaris: "Gunari", bendahara: "Taufik Hidayah", noSK: "709/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331503", desa: 14, q: -1, r: 2 },
  { id: "karangrayung", nama: "Karangrayung", lines: ["Karang", "rayung"], dapil: 5, ketua: "Taufiq Ismail", sekretaris: "Suparjo", bendahara: "Umi Mubarokah, S.Pd.I", noSK: "707/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331508", desa: 18, q: -2, r: 2 },
  { id: "brati", nama: "Brati", lines: ["Brati"], dapil: 5, ketua: "Ali Muntaha", sekretaris: "Muhlisin", bendahara: "Siti Zumaroh", noSK: "710/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331502", desa: 15, q: -2, r: 1 },
  { id: "godong", nama: "Godong", lines: ["Godong"], dapil: 5, ketua: "Taufiq", sekretaris: "Ali As'ad, S.Ag", bendahara: "Joko Purwanto", noSK: "708/DPW-23/01/XII/2021", tanggalSK: "30-12-2021", detailUrl: "https://infopemilu.kpu.go.id/Pemilu/Detail_pemutakhiran_parpol/lihat_pengurus/8/331502", desa: 19, q: -2, r: 0 },
];

export const TOTAL_DESA = 280;

export function kecamatanById(id: string | null): Kecamatan | undefined {
  if (!id) return undefined;
  return KECAMATAN.find((k) => k.id === id);
}

export function waLink(text: string): string {
  return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
}
