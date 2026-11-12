# Product Requirements Document (PRD)
## Aplikasi Web Pembelajaran Pola Bilangan Ganjil dan Genap

**Status:** Draft awal  
**Tahap:** Analysis dan perencanaan sebelum pengkodean  
**Platform utama:** Web responsif, dengan prioritas penggunaan smartphone Android

## 1. Ringkasan produk

Aplikasi ini merupakan media pembelajaran berbasis web untuk membantu siswa SMP mempelajari pola bilangan ganjil dan genap. Aplikasi dirancang agar dapat dibuka melalui browser smartphone Android tanpa harus memasang aplikasi dari Play Store.

Fokus pembelajaran adalah mengenali pola, mengamati perubahan antarbilangan, menentukan aturan, dan menentukan bilangan berikutnya. Materi disajikan dengan bahasa sederhana, contoh bertahap, visual secukupnya, latihan, dan pembahasan.

## 2. Latar belakang masalah

Berdasarkan wawancara awal dengan satu siswa SMP (kode S01), ditemukan beberapa kebutuhan:
- Kesulitan menentukan bilangan berikutnya ketika pola memiliki loncatan beberapa bilangan.
- Kadang tertukar membedakan aturan penjumlahan dan perkalian.
- Terkadang lupa rumus atau aturan untuk memeriksa pola.
- Kalimat soal yang panjang dapat membingungkan.
- Terlalu banyak gambar dapat mengganggu konsentrasi.
- Latihan soal dirasakan membantu memahami materi.

Temuan tersebut menjadi dasar kebutuhan awal, bukan generalisasi untuk semua siswa.

## 3. Tujuan produk

1. Membantu siswa mengingat kembali konsep bilangan ganjil dan genap.
2. Membantu siswa mengidentifikasi perubahan antarbilangan dan aturan pola.
3. Membantu siswa membedakan beberapa jenis aturan pola sederhana.
4. Memberikan contoh penyelesaian secara bertahap.
5. Memberikan latihan dan umpan balik agar siswa dapat memeriksa pemahamannya.
6. Menyediakan pengalaman penggunaan yang nyaman pada smartphone Android.

## 4. Pengguna sasaran

**Pengguna utama:** siswa SMP yang sedang mempelajari atau mengulang materi pola bilangan ganjil dan genap.

**Pengguna pendukung:** guru atau mahasiswa calon pendidik yang menggunakan aplikasi sebagai media pembelajaran.

**Konteks penggunaan:** belajar mandiri melalui browser smartphone, tablet, atau komputer.

## 5. Ruang lingkup versi pertama (MVP)

### Termasuk
- Beranda dan navigasi materi.
- Materi pengertian bilangan ganjil dan genap.
- Contoh pola bilangan sederhana.
- Visualisasi perubahan antarbilangan.
- Contoh soal dengan langkah penyelesaian.
- Ringkasan aturan/rumus.
- Latihan soal bertingkat.
- Umpan balik jawaban dan pembahasan.

### Belum termasuk
- Akun dan autentikasi siswa.
- Penyimpanan nilai ke server.
- Papan peringkat atau kompetisi.
- Chatbot/AI tutor.
- Dashboard guru.
- Analitik perilaku pengguna.
- Aplikasi native Android.

Fitur yang belum termasuk dapat dipertimbangkan setelah MVP diuji.

## 6. Kebutuhan fungsional

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F-01 | Pengguna dapat membuka halaman beranda dan memilih materi. | Must |
| F-02 | Pengguna dapat membaca penjelasan bilangan ganjil dan genap. | Must |
| F-03 | Pengguna dapat melihat contoh pola dan perubahan antarbilangan. | Must |
| F-04 | Pengguna dapat mempelajari contoh penyelesaian tahap demi tahap. | Must |
| F-05 | Pengguna dapat membuka ringkasan aturan/rumus. | Must |
| F-06 | Pengguna dapat mengerjakan latihan soal. | Must |
| F-07 | Aplikasi memberikan umpan balik setelah jawaban diperiksa. | Must |
| F-08 | Aplikasi menampilkan pembahasan jawaban. | Must |
| F-09 | Pengguna dapat berpindah halaman melalui navigasi yang jelas. | Should |
| F-10 | Pengguna dapat mengulang latihan. | Should |

## 7. Kebutuhan nonfungsional

- **Responsif:** tata letak menyesuaikan layar smartphone, tablet, dan desktop.
- **Mudah dibaca:** ukuran teks nyaman, kontras cukup, paragraf pendek.
- **Ringan:** gambar dioptimalkan dan tidak ada animasi berat yang tidak diperlukan.
- **Aksesibel:** tombol mudah disentuh, label jelas, navigasi konsisten, dan informasi tidak dibedakan hanya dengan warna.
- **Kompatibel:** diuji pada browser Android modern dan browser desktop.
- **Privasi:** versi pertama tidak meminta nama lengkap, NISN, alamat, atau data pribadi siswa.
- **Keandalan:** materi inti dan latihan dapat digunakan tanpa akun.
- **Keamanan:** aplikasi disajikan melalui HTTPS ketika dipublikasikan.

## 8. Prinsip pembelajaran

1. Dari contoh sederhana ke contoh yang lebih menantang.
2. Tampilkan satu fokus konsep dalam satu bagian.
3. Tunjukkan bagaimana perubahan bilangan diperoleh.
4. Bedakan contoh aturan penjumlahan dan perkalian secara eksplisit.
5. Berikan petunjuk sebelum langsung menampilkan jawaban.
6. Berikan pembahasan yang menjelaskan alasan, bukan hanya hasil akhir.
7. Hindari kalimat soal yang bertele-tele dan visual yang tidak relevan.

## 9. Kriteria keberhasilan awal

MVP dapat dianggap siap untuk uji coba awal apabila:
- Semua halaman inti dapat dibuka dan dinavigasi.
- Materi dan kunci jawaban telah diperiksa kebenaran matematisnya.
- Latihan memberikan umpan balik sesuai jawaban.
- Tampilan tidak terpotong pada ukuran layar smartphone yang diuji.
- Tombol dan elemen interaktif dapat digunakan dengan sentuhan.
- Siswa uji coba dapat menyelesaikan alur belajar tanpa arahan teknis yang terus-menerus.

Keberhasilan pembelajaran belum boleh diklaim hanya dari selesainya pengembangan. Perlu uji coba pengguna dan evaluasi terpisah.

## 10. Asumsi dan risiko

| Risiko/asumsi | Penanganan |
|---|---|
| Wawancara hanya melibatkan satu siswa. | Lakukan uji kebutuhan tambahan bila memungkinkan. |
| Istilah “pola bilangan ganjil dan genap” dapat bercampur dengan barisan aritmetika atau geometri. | Tetapkan batas materi dan periksa kesesuaian dengan kurikulum/guru. |
| Siswa mungkin memakai ukuran layar dan browser berbeda. | Uji responsivitas di beberapa ukuran layar. |
| Visualisasi berlebihan berpotensi mengganggu. | Gunakan visual yang fungsional dan seperlunya. |
| Jawaban stimulus wawancara tidak dapat diverifikasi karena urutan lengkap tidak tercatat. | Jangan jadikan stimulus itu sebagai contoh soal aplikasi. Susun soal baru dan validasi. |

## 11. Pertanyaan yang perlu dipastikan sebelum rilis

- Apakah materi dibatasi pada pengenalan ganjil-genap atau mencakup pola dengan aturan operasi yang lebih luas?
- Apakah guru/dosen meminta kurikulum atau capaian pembelajaran tertentu?
- Apakah aplikasi perlu dapat dipasang sebagai PWA, atau cukup dibuka melalui browser?
- Apakah diperlukan penyimpanan hasil latihan? Untuk MVP disarankan belum.
