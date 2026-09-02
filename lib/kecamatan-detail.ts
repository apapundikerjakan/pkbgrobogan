// Struktur administrasi & kepengurusan DPAC PKB Grobogan
// Sumber: KPU RI (infopemilu.kpu.go.id) + Wikipedia Daftar kecamatan Grobogan
// Periode SK: 2021-2026

export type DesaKelurahan = {
  nama: string;
  tipe: "desa" | "kelurahan";
};

export type PengurusLengkap = {
  mustasyar: string[];
  syura: { ketua: string; wakilKetua: string[]; sekretaris?: string; wakilSekretaris?: string[]; bendahara?: string };
  tanfidz: {
    ketua: string;
    wakilKetua: string[];
    sekretaris: string;
    wakilSekretaris: string[];
    bendahara: string;
    wakilBendahara: string[];
  };
};

export type KecamatanDetail = {
  id: string;
  nama: string;
  kodeKemendagri: string;
  kecamatan: string;
  jumlahKelurahan: number;
  jumlahDesa: number;
  kodepos: string;
  desa: DesaKelurahan[];
  ketua: string;
  sekretaris: string;
  bendahara: string;
  noSK: string;
  tanggalSK: string;
  jumlahAnggota: number;
  keterwakilanPerempuan: string;
  urlKPU: string;
  pengurusLengkap?: PengurusLengkap;
};

const KPU_URL = "https://infopemilu.kpu.go.id/Pemilu/2024/Kabko_pemutakhiran_parpol/kabko_parpol/8/3315";

// Parser sederhana dari wiki_kecamatan_grobogan.md
function parseWikipediaTable(): Map<
  string,
  { kelurahan: number; desa: number; kodepos: string; items: { nama: string; tipe: "desa" | "kelurahan" }[] }
> {
  const result = new Map<string, { kelurahan: number; desa: number; kodepos: string; items: { nama: string; tipe: "desa" | "kelurahan" }[] }>();
  const raw = `Brati|33.15.14|9|58153|Jangkungharo,Karangsari,Katekan,Kronggen,Lemahputih,Menduran,Tegalsumur,Temon,Tirem
Gabus|33.15.08|14|58183|Banjarejo,Bendoharjo,Gabus,Kalipang,Karangrejo,Keyongan,Nglinduk,Pandanharum,Pelem,Sulursari,Suwatu,Tahunan,Tlogotirto,Tunggulrejo
Geyer|33.15.05|13|58172|Asemrudung,Bangsri,Geyer,Jambangan,Juworo,Kalangbancar,Karang Anyar,Ledokdawan,Monggot,Ngrandu,Rambat,Sobo,Suru
Godong|33.15.16|28|58162|Anggaswangi,Bringin,Bugel,Dorolegi,Godong,Guci,Gundi,Guyangan,Harjowinangun,Jatilor,Karanggeneng,Kemloko,Ketangirejo,Ketitang,Klampok,Kopek,Latak,Manggarmas,Manggarwetan,Pahesan,Rajek,Sambung,Sumberagung,Sumurgede,Tinanding,Ungu,Wanutunggal,Werdoyo
Grobogan|33.15.12|11|58152|Getasrejo,Karangrejo,Lebak,Lebengjumuk,Ngabenrejo,Putatsari,Rejosari,Sedayu,Sumber Jatipohon,Tanggungharjo,Teguhan
Gubug|33.15.17|21|58164|Baturagung,Gelapan,Ginggangtani,Gubug,Jatipecaron,Jeketro,Kemiri,Kunjeng,Kuwaron,Mlilir,Ngroto,Papanrejo,Penadaran,Pranten,Ringinharjo,Ringinkidul,Rowosari,Saban,Tambakan,Tlogomulyo,Trisari
Karangrayung|33.15.02|19|58163|Cekel,Dempel,Gunungtumpeng,Jetis,Karanganyar,Karangsono,Ketro,Mangin,Mojoagung,Nampu,Pangkalan,Parakan,Putatnganten,Rawoh,Sendangharjo,Sumberejosari,Telawah,Temurejo,Termas
Kedungjati|33.15.01|12|58167|Deras,Jumo,Kalimaro,Karanglangu,Kedungjati,Kentengsari,Klitikan,Ngombak,Padas,Panimbo,Prigi,Wates
Klambu|33.15.15|9|58154|Jenengan,Kandangrejo,Klambu,Menawan,Penganten,Selojari,Taruman,Terkesi,Wandankemiri
Kradenan|33.15.07|14|58182|Bago,Banjardowo,Banjarsari,Crewek,Grabagan,Kalisari,Kradenan,Kuwu,Pakis,Rejosari,Sambongbangi,Sengonwetan,Simo,Tanjungsari
Ngaringan|33.15.09|12|58193|Bandungsari,Belor,Kalangdosari,Kalanglundo,Ngaraparap,Ngaringan,Pendem,Sarirejo,Sendangrejo,Sumberagung,Tanjungharjo,Truwolu
Penawangan|33.15.03|20|58161|Bologarang,Curut,Jipang,Karangawader,Karangpaing,Kluwan,Kramat,Lajer,Leyangan,Ngeluk,Penawangan,Pengkol,Pulutan,Sedadi,Toko,Tunggu,Watu Pawon,Wedoro,Winong,Wolo
Pulokulon|33.15.06|13|58181|Jambon,Jatiharjo,Jetaksari,Karangharjo,Mangunrejo,Mlowokarangtalun,Panunggalan,Pojok,Pulokulon,Randurejo,Sembungharjo,Sidorejo,Tuko
Purwodadi|33.15.13|13|58111|Candisari,Cingkrong,Genuksuran,Kandangan,Karanganyar,Kedungrejo,Nambuhan,Ngembak,Nglobar,Ngraji,Pulorejo,Putat,Warukaranganyar,Danyang,Kalongan,Kuripan,Purwodadi
Tanggungharjo|33.15.19|9|58166|Brabo,Kaliwenang,Kapung,Mrisi,Ngambakrejo,Padang,Ringinpitu,Sugihmanik,Tanggungharjo
Tawangharjo|33.15.11|10|58191|Godan,Jono,Kemaduhbatur,Mayahan,Plosorejo,Pojok,Pulongrambe,Selo,Tarub,Tawangharjo
Tegowanu|33.15.18|18|58165|Cangkring,Curug,Gaji,Gebangan,Karangpasar,Kebonagung,Kedungwungu,Kejawan,Mangunsari,Medani,Pepe,Sukorejo,Tajemsari,Tanggirejo,Tegowanu Kulon,Tegowanu Wetan,Tlogorejo,Tunjungharjo
Toroh|33.15.04|16|58171|Bandungharjo,Boloh,Depok,Dimoro,Genengadal,Genengsari,Katong,Kenteng,Krangganharjo,Ngrandah,Pilangpayung,Plosoharjo,Sindurejo,Sugihan,Tambirejo,Tunggak
Wirosari|33.15.10|12|58192|Dapurno,Dokoro,Gedangan,Kalirejo,Karangasem,Kropak,Mojorebo,Sambirejo,Tambahrejo,Tambakselo,Tanjungrejo,Tegalrejo,Kunden,Wirosari`;

  const lines = raw.trim().split("\n");
  for (const line of lines) {
    const parts = line.split("|");
    const nama = parts[0].trim();
    void parts[1]; // kode Kemendagri
    const jumlahDesa = parseInt(parts[2], 10);
    const kodepos = parts[3].trim();
    const desaNames = parts[4].split(",").map((n) => n.trim()).filter(Boolean);

    // Purwodadi & Wirosari punya kelurahan
    const isPurwodadi = nama === "Purwodadi";
    const isWirosari = nama === "Wirosari";

    const items: { nama: string; tipe: "desa" | "kelurahan" }[] = [];
    if (isPurwodadi) {
      for (let i = 0; i < 13; i++) items.push({ nama: desaNames[i], tipe: "desa" });
      for (let i = 13; i < desaNames.length; i++) items.push({ nama: desaNames[i], tipe: "kelurahan" });
    } else if (isWirosari) {
      for (let i = 0; i < 12; i++) items.push({ nama: desaNames[i], tipe: "desa" });
      for (let i = 12; i < desaNames.length; i++) items.push({ nama: desaNames[i], tipe: "kelurahan" });
    } else {
      for (const n of desaNames) items.push({ nama: n, tipe: "desa" });
    }

    result.set(nama.toLowerCase(), {
      kelurahan: isPurwodadi ? 4 : isWirosari ? 2 : 0,
      desa: isPurwodadi ? 13 : isWirosari ? 12 : jumlahDesa,
      kodepos,
      items,
    });
  }
  return result;
}

const WIKI = parseWikipediaTable();

const t = (ketua: string, wakKetua: string[], sek: string, wakSek: string[], ben: string, wakBen: string[]): PengurusLengkap["tanfidz"] => ({
  ketua, wakilKetua: wakKetua, sekretaris: sek, wakilSekretaris: wakSek, bendahara: ben, wakilBendahara: wakBen,
});

export const KECAMATAN_DETAIL: KecamatanDetail[] = [
  {
    id: "purwodadi",
    nama: "Purwodadi",
    kodeKemendagri: "33.15.13",
    kecamatan: "PURWODADI",
    jumlahKelurahan: 4,
    jumlahDesa: 13,
    kodepos: "58111–58119",
    desa: WIKI.get("purwodadi")?.items ?? [],
    ketua: "Hj. Sri Murdiati, SH",
    sekretaris: "Achmad Mishbah",
    bendahara: "Sudar",
    noSK: "693/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["K. Muhammad Munawir"],
      syura: {
        ketua: "Ustadzi",
        wakilKetua: ["K. Fauzi", "Kh. Fatkurrohman", "K. Bambang Pusno", "K. Rusman"],
        sekretaris: "K. Muhtar",
        wakilSekretaris: ["K. Sutiyoso", "K. Muslih", "K. Jamaludin"],
      },
      tanfidz: t("Sri Murdiati, SH", ["Sumardi", "Luluk", "Jasmani", "Rosidi"], "Achmad Mishbah", ["SitiArifah", "Supriyana", "K. Munaji", "Muslim"], "Sudar", ["Zakaria", "K. Mashuri"]),
    },
  },
  {
    id: "geyer",
    nama: "Geyer",
    kodeKemendagri: "33.15.05",
    kecamatan: "GEYER",
    jumlahKelurahan: 0,
    jumlahDesa: 13,
    kodepos: "58172",
    desa: WIKI.get("geyer")?.items ?? [],
    ketua: "Nur Kholis",
    sekretaris: "Fauzi Ahmad",
    bendahara: "Nur Sholeh",
    noSK: "695/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 53,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["Achmat Mahmud AlwY", "Masngudi", "Muh. Karim", "Ihsanudin"],
      syura: {
        ketua: "",
        wakilKetua: [],
      },
      tanfidz: t("Nur Kholis", ["Tri Yudi WahYono", "M. Muslim", "NurHuda", "Achmad Choirun"], "Fauzi Ahmad", ["Mashudi", "Marwoto", "Muhammad Fadhol"], "Nur Sholeh", ["Tarjan", "Imam Muhdi", "Suliswati", "Ruslan", "Agus Purwito"]),
    },
  },
  {
    id: "toroh",
    nama: "Toroh",
    kodeKemendagri: "33.15.04",
    kecamatan: "TOROH",
    jumlahKelurahan: 0,
    jumlahDesa: 16,
    kodepos: "58171",
    desa: WIKI.get("toroh")?.items ?? [],
    ketua: "K. M. Syamsudin",
    sekretaris: "K. Isbahul Munir",
    bendahara: "Ahmad Habibi, S.Ag",
    noSK: "694/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. Kusnan", "KH. Mukmin", "KH. Widoyo", "K. NurAli", "K. Jukal"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("K. M. Syamsudin", ["K. Muslihin", "K. Abdul Karim", "K. Akrom", "K. Ismail"], "K. Isbahul Munir", ["K. Mukhlis.AH.", "K. Slamet Maskuri", "K. Abdul Salam", "Ny. Darwati"], "Ahmad Habibi, S.Ag", ["Mu'alim Darsono", "Titik Nur Hasanah", "Prayitno", "Nugroho"]),
    },
  },
  {
    id: "grobogan",
    nama: "Grobogan",
    kodeKemendagri: "33.15.12",
    kecamatan: "GROBOGAN",
    jumlahKelurahan: 1,
    jumlahDesa: 11,
    kodepos: "58152",
    desa: WIKI.get("grobogan")?.items ?? [],
    ketua: "KH Ahmad Fathoni",
    sekretaris: "Drs. Pamuka",
    bendahara: "Ahmad Zaenudin",
    noSK: "696/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 207,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["K. Risman", "KH. A. Sholikhin", "KH. Maslim", "K. Abdulloh"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("KH Ahmad Fathoni", ["K. Nafan", "K. Muhtar Amin", "K. Jamaludin", "K. H. A. Najib Affika"], "Drs. Pamuka", ["K. Sirojul Munir", "K. Imam Ghozali", "Kh. Mashadi", "K. AMul Salam"], "Ahmad Zaenudin", ["K. Zaenal Mahrus", "Marya Ufah, S.Pd.l", "Mustafiyatun", "K. Karmaini"]),
    },
  },
  {
    id: "wirosari",
    nama: "Wirosari",
    kodeKemendagri: "33.15.10",
    kecamatan: "WIROSARI",
    jumlahKelurahan: 2,
    jumlahDesa: 12,
    kodepos: "58192",
    desa: WIKI.get("wirosari")?.items ?? [],
    ketua: "Saeful Mujab",
    sekretaris: "Asmudi",
    bendahara: "Abdul Mujib",
    noSK: "698/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. Nur Sholihin", "Habib Hasyim Hasbullah", "K. Syamsul Arif", "KH. Abdul Rohman", "K. Sholihul Hadi", "K. Abdullah Faqih"],
      syura: {
        ketua: "Ir. Sulatin",
        wakilKetua: ["K. Bakri", "K. Mufid", "K. Zaini Oahlan, AH", "K. Mustofa"],
        sekretaris: "Ust Abdul Hamid, AH",
        wakilSekretaris: ["KH. Musta'in", "K. Nuruddin Haidar", "K. Syahid", "K. Maftukan"],
      },
      tanfidz: t("Saeful Mujab", ["Shobirin", "Anshori", "Daryono", "Siswanto"], "Asmudi", ["Zainal Arifin", "Minanurrahman", "Muhammad Rubain"], "Abdul Mujib", ["Durrofun Nasihah", "Syarif Hidayatullah", "Qoniatun Mahmudah"]),
    },
  },
  {
    id: "tawangharjo",
    nama: "Tawangharjo",
    kodeKemendagri: "33.15.11",
    kecamatan: "TAWANGHARJO",
    jumlahKelurahan: 0,
    jumlahDesa: 10,
    kodepos: "58191",
    desa: WIKI.get("tawangharjo")?.items ?? [],
    ketua: "K. AMul Khamid, S.Ag",
    sekretaris: "K. Nurhadi",
    bendahara: "Wari, S.Th.l",
    noSK: "697/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH Abdul Latif", "KH Mafiuhin", "K. Khoirul Anam", "K. Khoirul Anam", "K. Wachid Manshur"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("K. AMul Khamid, S.Ag", ["Sukanul Anshor", "K. Mukarom", "K. Mastur", "Abdul Syakur, M.Pd.l", "K. Bisri Musthofa"], "K. Nurhadi", ["K. Rustam", "K. Imam Ghozali", "Ali Shobirin", "Khumaidi"], "Wari, S.Th.l", ["Edi Purwanto", "Ahmad Syarifudin", "Rudy Rus SuPriYanto"]),
    },
  },
  {
    id: "ngaringan",
    nama: "Ngaringan",
    kodeKemendagri: "33.15.09",
    kecamatan: "NGARINGAN",
    jumlahKelurahan: 0,
    jumlahDesa: 12,
    kodepos: "58193",
    desa: WIKI.get("ngaringan")?.items ?? [],
    ketua: "K. Ahmat Tahrir",
    sekretaris: "K. Tuhajjalin",
    bendahara: "Abd. Hadi",
    noSK: "699/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["K. Ahsin Masrur", "K. Taslim", "K. Abdul Rofiq", "K. Sunardi Taslim", "KH. Almunohman"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("K. Ahmat Tahrir", ["Kh. Mustaqim", "K. Mansur", "K. Nor Romadhon Mahfud", "K. Abdullah"], "K. Tuhajjalin", ["Solekan, S.Ag", "Ahmad Syahid", "K. Muslim", "K. Sumadi"], "Abd. Hadi", ["Ahmadi", "Nur Huda", "Umidah", "Siti Kholipah"]),
    },
  },
  {
    id: "klambu",
    nama: "Klambu",
    kodeKemendagri: "33.15.15",
    kecamatan: "KLAMBU",
    jumlahKelurahan: 0,
    jumlahDesa: 9,
    kodepos: "58154",
    desa: WIKI.get("klambu")?.items ?? [],
    ketua: "Masruri",
    sekretaris: "Sukardi",
    bendahara: "Mukhamad Amin",
    noSK: "711/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 63,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. Musyafa' Mu'thi", "K. Bahrul Hasan", "K. Abdul Mudzir", "K. Dimyati"],
      syura: {
        ketua: "KH. Zaenal Arifin",
        wakilKetua: ["K. Ma'ruf", "K. Mas'ud", "K.H. Muhtadi", "Nyai Siti Qomariyah", "Nyai Hj. Asmaussa'adah"],
        sekretaris: "H. Sholeh",
        wakilSekretaris: ["Hj. Kartini", "H. Muslimin"],
      },
      tanfidz: t("Masruri", ["Abdul Wahid", "Suratmin", "Ahmad Syaechona", "Kurniawan", "Siti Rufi'ah", "Imam Suyuti, S.Pd.I", "Sutiah", "Hj. Eny Wniharti, SH"], "Sukardi", ["Ahbib, A.Ma.Pd", "Sri Wahyuni", "Mustadzah Lilik Wahyuni, Se Sy"], "Mukhamad Amin", ["Puji Indarti", "Mahfudhon"]),
    },
  },
  {
    id: "kradenan",
    nama: "Kradenan",
    kodeKemendagri: "33.15.07",
    kecamatan: "KRADENAN",
    jumlahKelurahan: 0,
    jumlahDesa: 14,
    kodepos: "58182",
    desa: WIKI.get("kradenan")?.items ?? [],
    ketua: "Saifudin Zuhri",
    sekretaris: "Ali Sobirin, S.H",
    bendahara: "Athiqoh",
    noSK: "701/DPW-23/01/XII/2021",
    tanggalSK: "30-12-2021",
    jumlahAnggota: 290,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["K. Malik", "K. Munawir", "K. Mastur", "K. Khudlori"],
      syura: {
        ketua: "K. Pariiun",
        wakilKetua: ["K. Sugaib", "K. Siswoyo", "Suwardi"],
        sekretaris: "K. Masduqi Khoironi",
        wakilSekretaris: ["KH. Anurar", "Munawar", "Kasmuri", "Mustofa", "Faqih", "Saifudin Zuhri", "Supriyadi", "Ali Mahmudi", "Wayo", "Muriyanto", "Dwi Kuncoro Hadi", "Ali Sobirin, S.H", "Ai Rosidi", "Sarjan", "Itaq Sabila"],
      },
      tanfidz: t("Saifudin Zuhri", ["Supriyadi", "Ali Mahmudi", "Wayo", "Muriyanto"], "Ali Sobirin, S.H", ["Dwi Kuncoro Hadi", "Ai Rosidi", "Sarjan", "Itaq Sabila"], "Athiqoh", ["Zumrotun Syarifah, S.Pd.", "Nur Fitrianingsih", "Muhibatul Hasanah, S.Pd", "Fiana", "Istiqomah", "Muslaqim"]),
    },
  },
  {
    id: "pulokulon",
    nama: "Pulokulon",
    kodeKemendagri: "33.15.06",
    kecamatan: "PULOKULON",
    jumlahKelurahan: 0,
    jumlahDesa: 13,
    kodepos: "58181",
    desa: WIKI.get("pulokulon")?.items ?? [],
    ketua: "K. Abdur Rohim",
    sekretaris: "H. Mufrodli, S.Pd.l",
    bendahara: "Ali Musyarcfi",
    noSK: "702/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. A. MASRURI, S.Pd.I", "KH. NURHADI", "KH. NAWAW", "KH. MUHSON", "KH. AZUHRI"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("K. Abdur Rohim", ["K. Ali Mahmudi", "K. Ali Rosyidi", "K. Ahmad Subqi", "K. Nurdin Soim"], "H. Mufrodli, S.Pd.l", ["Abdul Aziz", "Zaidatun Rohmah", "Endang Daimun", "Nur Rosyidah"], "Ali Musyarcfi", ["Munfirudzunubi, S.Sos", "Aminah Fahzahro", "Hariyanto", "Saerozi"]),
    },
  },
  {
    id: "gabus",
    nama: "Gabus",
    kodeKemendagri: "33.15.08",
    kecamatan: "GABUS",
    jumlahKelurahan: 0,
    jumlahDesa: 14,
    kodepos: "58183",
    desa: WIKI.get("gabus")?.items ?? [],
    ketua: "K.H Choerun",
    sekretaris: "Wahid Tobroni, S.Pd",
    bendahara: "Miftah",
    noSK: "700/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 26,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["K. Zamroni", "KH. Mujahid", "K. Khozinatul Asror", "K. Ngalimun", "H. Abdul Jabar"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("K.H Choerun", ["K. Muhadi, S.Pd", "K. Nur Solihin Al Rasmin, S.Pd", "K. Juwahir", "K. Murtadho, S.Pd", "K. Kurdi"], "Wahid Tobroni, S.Pd", ["Syarofi", "K. Mualif", "Ulil Huda", ". Asrori", "H. Madhan"], "Miftah", ["Abdul Rahim", "Masliah", "Damiri, S.Pd."]),
    },
  },
  {
    id: "tegowanu",
    nama: "Tegowanu",
    kodeKemendagri: "33.15.18",
    kecamatan: "TEGOWANU",
    jumlahKelurahan: 0,
    jumlahDesa: 18,
    kodepos: "58165",
    desa: WIKI.get("tegowanu")?.items ?? [],
    ketua: "KH. Iloh Hamid",
    sekretaris: "K. Solikin",
    bendahara: "Zaeni Ilustofa",
    noSK: "704/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. AMul Djalil", "K. Abu Choir", "K. Abdul Mufid", "K. Musta'in, S.Ag"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("KH. Iloh Hamid", ["K. Nur Khamid", "K. Ashari", "Kh. Suhadi", "Hj. Utfatutaikah"], "K. Solikin", ["Saeful Mujab", "H. Abdul Rokhim", "Hj. Kartini"], "Zaeni Ilustofa", ["H. Margono", "Khoiriyah", "Muhtar Mugoiyar", "Robiah Adawiyah"]),
    },
  },
  {
    id: "kedungjati",
    nama: "Kedungjati",
    kodeKemendagri: "33.15.01",
    kecamatan: "KEDUNGJATI",
    jumlahKelurahan: 0,
    jumlahDesa: 12,
    kodepos: "58167",
    desa: WIKI.get("kedungjati")?.items ?? [],
    ketua: "K. Matori",
    sekretaris: "Agung Sri Widodo",
    bendahara: "Novem Ariya Kusuma",
    noSK: "706/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 266,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["K. Mahmudi", "K. Sholeh", "Munawir", "Biyanto", "Bisri"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("K. Matori", ["Tri Joko", "Muchtar", "Muh Sabani", "Nardi"], "Agung Sri Widodo", ["Nur Khoir", "Slamet", "Kurmin", "Bambang Supriyadi"], "Novem Ariya Kusuma", ["Bambang Kisworo", "Edy Riyanto", "Komedi", "Nur Ichwan"]),
    },
  },
  {
    id: "gubug",
    nama: "Gubug",
    kodeKemendagri: "33.15.17",
    kecamatan: "GUBUG",
    jumlahKelurahan: 0,
    jumlahDesa: 21,
    kodepos: "58164",
    desa: WIKI.get("gubug")?.items ?? [],
    ketua: "Agus",
    sekretaris: "Yohri",
    bendahara: "K. Mukhlasin",
    noSK: "703/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 13,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. AMul Salam", "KH. Abdul Muin", "KH. Said Nurudin", "K. Ali Wasidin", "K. Turmudzi"],
      syura: {
        ketua: "Zuhri Wafa",
        wakilKetua: ["K. Halimi", "K. Kusnan Qodli"],
        sekretaris: "Yohri",
        wakilSekretaris: ["Jaminah", "K. Supardi", "Mukini"],
        bendahara: "K. Mukhlasin",
      },
      tanfidz: t("Agus", ["Titik Sugiyarti, SH", "Suwondo", "Nursahid"], "Budi Utomo", ["Ali Ridlo", "Markumi", "Karsono"], "Sabikin", ["David A.P", "Moh.Tohir", "Sulasiyatun", "Masrukin,S.Pd"]),
    },
  },
  {
    id: "tanggungharjo",
    nama: "Tanggungharjo",
    kodeKemendagri: "33.15.19",
    kecamatan: "TANGGUNGHARJO",
    jumlahKelurahan: 0,
    jumlahDesa: 9,
    kodepos: "58166",
    desa: WIKI.get("tanggungharjo")?.items ?? [],
    ketua: "K. Nurhadi, S.Pd.I",
    sekretaris: "Ahmad Yahya",
    bendahara: "Siti Khoeriyah",
    noSK: "705/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["Kh. Abdurrohman", "Kh. Abdul Hamid", "Kh. Musta'in", "K. Abdul Salam", "K. Machali"],
      syura: {
        ketua: "K. Nurhadi, S.Pd.I",
        wakilKetua: ["Drs. Khoirruloh", "Saefudin Zuhri", "Kh. Mudzakir", "Muhammad Khoiron"],
        sekretaris: "Ahmad Yahya",
        wakilSekretaris: ["Ahmad Askuri, S.Pd.I", "H. Ali Mahfud", "Zaenal Arifin", "Ahmad Mutohar"],
        bendahara: "Siti Khoeriyah",
      },
      tanfidz: t("Supriyono", ["Miftahunni'am, S.Pd.I", "Danuri", "Hj. Maesaroh", "Hj. NurAsfiyah"], "Khumaedi", ["Ahmad Khoirul Annam, S-Kom", "Subiyanto", "Sri Sihati, S.Pd", "Siti Akhiroh, S.Pd"], "Siti Khoeriyah", ["Rusmiatun", "Utfiyatun"]),
    },
  },
  {
    id: "penawangan",
    nama: "Penawangan",
    kodeKemendagri: "33.15.03",
    kecamatan: "PENAWANGAN",
    jumlahKelurahan: 0,
    jumlahDesa: 20,
    kodepos: "58161",
    desa: WIKI.get("penawangan")?.items ?? [],
    ketua: "K. Moh Adnan",
    sekretaris: "H. Margono",
    bendahara: "Jumar",
    noSK: "709/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 0,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["K. Junaidi", "K. Nurmisbah", "K. Khosiin"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("K. Moh Adnan", ["K. Supaat", "K. Djuwari", "H. Mahmudi", "K. Syamsul"], "H. Margono", ["Agung Dwi Sujatmoko", "Imam Santoso", "Zaenal Arifin", "Muh Zuri", "Ali Rahmad Fadhil"], "Jumar", ["Puji Santoso", "Ahmad Jamian", "Ruhadi", "Gunari"]),
    },
  },
  {
    id: "karangrayung",
    nama: "Karangrayung",
    kodeKemendagri: "33.15.02",
    kecamatan: "KARANGRAYUNG",
    jumlahKelurahan: 0,
    jumlahDesa: 19,
    kodepos: "58163",
    desa: WIKI.get("karangrayung")?.items ?? [],
    ketua: "Taufiq Ismail",
    sekretaris: "Suparjo",
    bendahara: "Umi Mubarokah, S.Pd.I",
    noSK: "707/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 48,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. Chusnul Hadi", "K. Dahlan", "KH. Ali Makmun", "KH. Chusnan Qodli", "K. Askuri", "K. Arwani Annawa"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("Taufiq Ismail", ["K. Ahmad Ali Nur Hamid", "Ahmad Najib, AH", "Slamet Muthoharoh", "Muzaki Mahfuz, S.Pd.I"], "Suparjo", ["Supario", "Ulin Nuha, S.Pd.I", "Nur Rohmad", "Ainul Al, AH"], "Umi Mubarokah, S.Pd.I", ["Dewi Rumini, S.Pd.I", "Umi Khomsatun"]),
    },
  },
  {
    id: "brati",
    nama: "Brati",
    kodeKemendagri: "33.15.14",
    kecamatan: "BRATI",
    jumlahKelurahan: 0,
    jumlahDesa: 9,
    kodepos: "58153",
    desa: WIKI.get("brati")?.items ?? [],
    ketua: "Ali Muntaha",
    sekretaris: "Muhlisin",
    bendahara: "Siti Zumaroh",
    noSK: "710/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 50,
    keterwakilanPerempuan: "33.33%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: [
        "KH. MUSLIH UMAR, A.H",
        "KH. DIMYATI",
        "KH. MASTUR",
        "K. MUHTAROM",
        "KH. MUBIN",
      ],
      syura: {
        ketua: "K. Moh Choirul Anam, AH",
        wakilKetua: [
          "Kh. Syamsudin, AH",
          "Kh. Syaifudin, AH",
          "K. Sudarmono, S.Pd.I",
          "K. Yusuf",
        ],
        sekretaris: "M. Shofwan",
        wakilSekretaris: [
          "Syaiful Kirom, S.Pd.I",
          "M. Nur Rohim",
          "Ahmad Supriyanto",
          "M. Ridwan",
        ],
      },
      tanfidz: {
        ketua: "Ali Muntaha",
        wakilKetua: [
          "Nur Jannah, A.Ma",
          "Abdul Wahid, S.Ag",
          "Ummur Rohmah",
          "Supriyadi",
        ],
        sekretaris: "Muhlisin",
        wakilSekretaris: [
          "Isnaeni Zuliatik",
          "Ahmad Safi'i",
          "Sumiatun",
          "Lista Septiana",
        ],
        bendahara: "Siti Zumaroh",
        wakilBendahara: ["Ahmad Rifai", "Sulastri"],
      },
    },
  },
  {
    id: "godong",
    nama: "Godong",
    kodeKemendagri: "33.15.16",
    kecamatan: "GODONG",
    jumlahKelurahan: 0,
    jumlahDesa: 28,
    kodepos: "58162",
    desa: WIKI.get("godong")?.items ?? [],
    ketua: "Kyai Ahmad Su'udi",
    sekretaris: "Kyai Moh Dholib",
    bendahara: "Kyai AMul Hamid",
    noSK: "708/DPW-23/01/XII/2021",
    tanggalSK: "30 Desember 2021",
    jumlahAnggota: 17,
    keterwakilanPerempuan: "0.00%",
    urlKPU: KPU_URL,
    pengurusLengkap: {
      mustasyar: ["KH. Zaenuri", "Kyai Ahmad Fadholi", "Kyai Ali Munawar", "Kyai Shonhadji", "KH. Baha'udin"],
      syura: { ketua: "", wakilKetua: [] },
      tanfidz: t("Kyai Ahmad Su'udi", ["Kyai Ahmad Husnul Hadi", "Kyai Ali Khoiron", "Kyai Mahfudhon", "Kyai Ali Mustofa"], "Kyai Moh Dholib", ["Kyai AMul Hamid", "Ahmad Ghufron", "Muslim Ngalimun", "Ma'sumah"], "Kyai AMul Hamid", []),
    },
  },
];

export function kecamatanDetailById(id: string): KecamatanDetail | undefined {
  return KECAMATAN_DETAIL.find((k) => k.id === id);
}
