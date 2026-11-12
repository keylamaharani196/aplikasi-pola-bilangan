# Arsitektur Teknis Aplikasi

## 1. Gambaran umum

Untuk versi pertama, aplikasi disarankan berupa **frontend web statis** yang dapat diakses melalui browser Android. Karena belum ada kebutuhan akun atau penyimpanan nilai, backend dan database belum diperlukan.

```text
Pengguna (Android / Laptop)
          |
          v
Browser
          |
       HTTPS
          |
          v
Hosting web statis
          |
          v
File HTML, CSS, JavaScript
          |
          v
Materi + latihan + umpan balik
```

## 2. Rekomendasi teknologi awal

Pilihan yang sederhana untuk proyek pembelajaran:

- HTML untuk struktur halaman.
- CSS untuk tampilan responsif.
- JavaScript untuk navigasi sederhana, visualisasi, pemeriksaan jawaban, dan umpan balik.
- Git dan GitHub untuk version control.
- Hosting statis untuk publikasi.

Framework seperti React atau Vue dapat dipertimbangkan jika memang dibutuhkan, tetapi tidak wajib untuk MVP. Memulai dengan teknologi dasar dapat membuat struktur dan proses debugging lebih mudah dipahami.

## 3. Struktur folder yang disarankan

```text
aplikasi-pola-bilangan/
├── index.html
├── README.md
├── docs/
│   ├── prd.md
│   ├── analisis-wawancara.md
│   ├── desain.md
│   ├── arsitektur.md
│   ├── cloud.md
│   ├── konten-pembelajaran.md
│   ├── pengujian.md
│   └── roadmap.md
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── materi.js
    └── latihan.js
```

Struktur ini adalah usulan awal dan dapat disederhanakan jika semua halaman masih berada dalam satu file.

## 4. Tanggung jawab bagian aplikasi

| Bagian | Tanggung jawab |
|---|---|
| `index.html` | Kerangka halaman dan area konten |
| `css/style.css` | Tata letak, warna, tipografi, dan responsivitas |
| `js/app.js` | Navigasi dan interaksi umum |
| `js/materi.js` | Data/isi materi pembelajaran |
| `js/latihan.js` | Soal, pemeriksaan jawaban, dan umpan balik |
| `assets/` | Gambar atau ikon yang benar-benar diperlukan |

## 5. Pengelolaan data

Untuk MVP, materi dan soal dapat disimpan sebagai data statis dalam JavaScript. Contoh struktur konseptual:

```js
const latihan = [
  {
    id: 1,
    pertanyaan: "Tentukan bilangan berikutnya: 2, 4, 6, 8, ...",
    jawaban: "10",
    pembahasan: "Setiap bilangan bertambah 2."
  }
];
```

Jangan menyimpan data pribadi siswa. Jika di masa depan diperlukan penyimpanan nilai, tentukan tujuan, izin, keamanan, dan kebijakan privasi terlebih dahulu.

## 6. Prinsip implementasi

- Pisahkan konten pembelajaran dari logika tampilan jika memungkinkan.
- Hindari dependensi eksternal yang tidak diperlukan.
- Gunakan nama variabel dan fungsi yang mudah dipahami.
- Validasi input kosong dan input yang tidak sesuai.
- Berikan umpan balik yang ramah dan menjelaskan langkah berikutnya.
- Pastikan fungsi inti tetap dapat digunakan pada koneksi internet yang tidak terlalu cepat.

## 7. Pengembangan lanjutan

Jika kelak dibutuhkan akun, penyimpanan progres, atau dashboard guru, arsitektur dapat dikembangkan dengan backend dan database. Kebutuhan tersebut tidak dimasukkan ke versi pertama karena belum didukung oleh temuan kebutuhan yang ada.
