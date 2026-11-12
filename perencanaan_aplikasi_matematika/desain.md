# Desain Produk dan UI/UX
## Aplikasi Web Pembelajaran Pola Bilangan Ganjil dan Genap

## 1. Arah desain

Desain mengutamakan pengalaman belajar di smartphone Android. Antarmuka dibuat sederhana, konsisten, mudah disentuh, dan tidak dipenuhi gambar dekoratif. Visual digunakan hanya jika membantu siswa melihat pola atau perubahan bilangan.

## 2. Struktur halaman

### A. Beranda
- Nama aplikasi dan pengantar singkat.
- Tombol utama “Mulai Belajar”.
- Ringkasan materi yang tersedia.
- Navigasi ke Materi, Contoh, Latihan, dan Ringkasan.

### B. Halaman Materi
- Pengertian bilangan ganjil dan genap.
- Ciri atau cara mengenali bilangan.
- Contoh bilangan.
- Penjelasan pola sederhana.
- Tombol lanjut ke contoh.

### C. Halaman Visualisasi Pola
- Deretan bilangan ditampilkan jelas.
- Perubahan antarbilangan ditunjukkan secara bertahap.
- Aturan pola ditulis dengan kalimat singkat.
- Pengguna dapat menekan tombol “Langkah berikutnya” atau “Ulangi”.

### D. Halaman Contoh Soal
- Satu soal dalam satu tampilan.
- Informasi penting ditulis ringkas.
- Langkah penyelesaian ditampilkan berurutan.
- Jawaban akhir disertai alasan.

### E. Halaman Latihan
- Soal mudah ditampilkan lebih dahulu.
- Pengguna memilih atau mengisi jawaban.
- Tombol “Periksa Jawaban”.
- Umpan balik singkat.
- Pembahasan dapat dibuka setelah pemeriksaan.
- Tombol “Soal Berikutnya” dan “Ulangi”.

### F. Halaman Ringkasan
- Rangkuman konsep ganjil dan genap.
- Ringkasan cara memeriksa perubahan antarbilangan.
- Contoh aturan yang telah dipelajari.
- Tautan kembali ke materi atau latihan.

## 3. Alur pengguna

1. Pengguna membuka aplikasi.
2. Pengguna memilih “Mulai Belajar”.
3. Pengguna membaca materi dasar.
4. Pengguna melihat visualisasi pola.
5. Pengguna mempelajari contoh penyelesaian.
6. Pengguna mencoba latihan.
7. Pengguna memeriksa jawaban dan membaca pembahasan.
8. Pengguna membuka ringkasan atau mengulang latihan.

## 4. Wireframe tekstual smartphone

```text
┌─────────────────────────┐
│ POLA BILANGAN           │
│ Belajar dengan bertahap │
├─────────────────────────┤
│                         │
│ Kenali pola ganjil dan  │
│ genap melalui contoh.   │
│                         │
│ [ MULAI BELAJAR ]       │
│                         │
├─────────────────────────┤
│ Materi                  │
│ Contoh Soal             │
│ Latihan                 │
│ Ringkasan               │
└─────────────────────────┘
```

Contoh halaman latihan:

```text
┌─────────────────────────┐
│ LATIHAN  1 dari 5       │
├─────────────────────────┤
│ Perhatikan pola berikut│
│ 2, 4, 6, 8, ...         │
│                         │
│ Bilangan berikutnya?   │
│ [ Masukkan jawaban ]    │
│                         │
│ [ PERIKSA JAWABAN ]     │
│                         │
│ Pembahasan muncul di    │
│ bagian ini setelah      │
│ jawaban diperiksa.      │
└─────────────────────────┘
```

Contoh tersebut hanya ilustrasi antarmuka. Seluruh soal final harus diperiksa kembali agar sesuai cakupan materi.

## 5. Pedoman visual

- Gunakan satu warna utama dan warna netral untuk latar.
- Pastikan teks dan latar memiliki kontras yang cukup.
- Gunakan maksimal beberapa ukuran teks yang konsisten.
- Hindari paragraf panjang; pecah penjelasan menjadi bagian pendek.
- Hindari gambar dekoratif yang tidak membantu konsep.
- Gunakan ikon dengan label teks jika maknanya tidak langsung jelas.
- Jangan mengandalkan warna saja untuk menandai benar atau salah.

## 6. Pedoman interaksi smartphone

- Tombol utama cukup besar dan memiliki jarak ant tombol.
- Hindari elemen yang hanya bisa digunakan dengan hover.
- Form jawaban mudah disentuh dan tidak tertutup keyboard.
- Navigasi mudah dijangkau ibu jari.
- Hindari scroll horizontal.
- Pastikan konten tetap terbaca pada lebar layar sekitar 360 piksel.
- Uji orientasi portrait; landscape dapat menjadi tambahan.

## 7. Responsif dan aksesibilitas

- Mobile-first: desain dimulai dari layar smartphone.
- Pada layar lebar, konten dapat dibatasi lebarnya agar tidak terlalu melebar.
- Gunakan heading berurutan dan label tombol yang jelas.
- Sediakan teks alternatif untuk gambar bermakna.
- Berikan fokus visual yang jelas pada elemen yang dapat digunakan.
- Pastikan ukuran huruf dapat dibaca tanpa harus memperbesar layar.

## 8. Komponen UI yang dibutuhkan

- Header sederhana.
- Navigasi utama.
- Kartu materi.
- Panel contoh soal.
- Panel langkah penyelesaian.
- Komponen deret bilangan.
- Input jawaban.
- Tombol periksa.
- Panel umpan balik.
- Panel pembahasan.
- Progress latihan sederhana.

## 9. Hal yang perlu diuji dalam desain

Minta siswa mencoba mencari materi, mengikuti contoh, menjawab latihan, dan membuka pembahasan. Amati apakah instruksi dipahami, tombol mudah digunakan, dan tampilan terasa terlalu ramai atau tidak. Jangan menganggap preferensi warna atau animasi sudah diketahui dari wawancara karena hal itu belum tergali.
