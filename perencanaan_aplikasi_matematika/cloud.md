# Rencana Cloud, Hosting, dan Deployment

## 1. Tujuan

Dokumen ini menjelaskan bagaimana aplikasi web dapat dipublikasikan sehingga bisa dibuka melalui smartphone Android menggunakan tautan web.

## 2. Kebutuhan versi pertama

Karena MVP belum memerlukan akun, database, atau penyimpanan hasil siswa, kebutuhan cloud cukup berupa layanan **static web hosting** yang dapat menyajikan file HTML, CSS, JavaScript, dan aset.

```text
Kode sumber di komputer
        |
        v
Git repository
        |
        v
Layanan static hosting
        |
        v
URL publik + HTTPS
        |
        v
Browser Android / desktop
```

## 3. Pilihan layanan hosting

Contoh layanan yang dapat dipertimbangkan:
- GitHub Pages.
- Cloudflare Pages.
- Netlify.
- Vercel.

Pilih satu layanan berdasarkan kemudahan penggunaan, ketentuan akun, batas penggunaan gratis yang berlaku, dan kebutuhan proyek. Ketersediaan paket gratis dapat berubah; periksa ketentuan resmi sebelum publikasi.

## 4. Alur deployment yang disarankan

1. Simpan source code di repository Git.
2. Pastikan aplikasi berjalan secara lokal.
3. Periksa seluruh tautan, gambar, dan file CSS/JavaScript.
4. Hubungkan repository ke layanan hosting yang dipilih.
5. Atur folder publikasi sesuai struktur proyek.
6. Jalankan proses deployment.
7. Buka URL hasil deployment pada smartphone Android.
8. Uji navigasi, latihan, tampilan, dan koneksi HTTPS.

## 5. Domain dan HTTPS

- URL bawaan dari layanan hosting cukup untuk tahap prototipe.
- Domain khusus bersifat opsional.
- Gunakan HTTPS untuk koneksi yang aman.
- Jangan memasukkan kata sandi, token, atau kunci API ke repository publik.

## 6. PWA sebagai opsi lanjutan

Progressive Web App (PWA) dapat dipertimbangkan agar aplikasi bisa ditambahkan ke layar utama Android. PWA bukan syarat agar aplikasi dapat dibuka di Android. Untuk tahap awal, prioritaskan web responsif terlebih dahulu. Jika PWA dibuat, siapkan manifest, ikon aplikasi, dan service worker serta uji perilakunya.

## 7. Backup dan pemeliharaan

- Simpan source code di Git.
- Gunakan commit yang menjelaskan perubahan.
- Uji aplikasi setelah perubahan.
- Simpan salinan dokumen perencanaan.
- Periksa kembali tautan publik secara berkala.

## 8. Keamanan dan privasi

- MVP tidak perlu mengumpulkan identitas siswa.
- Jangan menambahkan formulir data pribadi tanpa kebutuhan dan persetujuan yang jelas.
- Jika kelak ada akun atau penyimpanan nilai, lakukan perancangan keamanan dan privasi sebelum fitur dibuat.
- Jangan menaruh kredensial layanan hosting di file yang dipublikasikan.

## 9. Keputusan sementara

**Rekomendasi:** gunakan static hosting dengan URL bawaan terlebih dahulu. Pemilihan penyedia final dilakukan setelah source code siap dan kebutuhan publikasi dari dosen/guru dipastikan. Dokumen ini adalah rencana, bukan bukti bahwa aplikasi telah diunggah ke cloud.
