// ==========================================
// MATHLEARN - LATIHAN POLA BILANGAN
// ==========================================

// KUNCI JAWABAN
const kunciJawaban = [
  {
    jawaban: "1,3,5,7,9",
    pembahasan:
      "Pola bilangan ganjil dimulai dari 1 dan bertambah 2. Lima suku pertamanya adalah 1, 3, 5, 7, dan 9."
  },
  {
    jawaban: "2,4,6,8,10,12",
    pembahasan:
      "Pola bilangan genap dimulai dari 2 dan bertambah 2. Enam suku pertamanya adalah 2, 4, 6, 8, 10, dan 12."
  },
  {
    jawaban: "29",
    pembahasan:
      "Gunakan rumus Uₙ = 2n - 1. Jadi U₁₅ = 2(15) - 1 = 29."
  },
  {
    jawaban: "40",
    pembahasan:
      "Gunakan rumus Uₙ = 2n. Jadi U₂₀ = 2(20) = 40."
  }
];

// MENYERAGAMKAN FORMAT JAWABAN
function normalisasi(teks) {
  return teks
    .trim()
    .replace(/\s+/g, "")
    .replace(/[.;]/g, ",")
    .replace(/,+$/, "");
}

// MENGAMANKAN TEKS YANG DITAMPILKAN
function aman(teks) {
  const elemen = document.createElement("div");
  elemen.textContent = teks;
  return elemen.innerHTML;
}

// MEMPERBARUI PROGRES
function perbaruiProgres() {
  let terisi = 0;

  for (let i = 1; i <= 5; i++) {
    const kolom = document.getElementById("jawaban" + i);

    if (kolom && kolom.value.trim() !== "") {
      terisi++;
    }
  }

  const teksProgres = document.getElementById("progress-text");
  const barProgres = document.getElementById("progress-bar");

  if (teksProgres) {
    teksProgres.textContent = terisi + " dari 5 dijawab";
  }

  if (barProgres) {
    barProgres.style.width = (terisi / 5 * 100) + "%";
  }
}

// MEMERIKSA JAWABAN
function periksaJawaban() {
  const jawabanSiswa = [];

  for (let i = 1; i <= 5; i++) {
    const kolom = document.getElementById("jawaban" + i);

    if (!kolom) {
      alert("Kolom jawaban tidak ditemukan. Periksa kembali index.html.");
      return;
    }

    jawabanSiswa.push(kolom.value.trim());
  }

  // Memastikan seluruh soal sudah dijawab
  if (jawabanSiswa.some(jawaban => jawaban === "")) {
    alert("Silakan isi semua lima soal terlebih dahulu.");
    return;
  }

  let jumlahBenar = 0;
  let rincianHasil = "";

  // Memeriksa soal nomor 1 sampai 4
  for (let i = 0; i < 4; i++) {
    const benar =
      normalisasi(jawabanSiswa[i]) === kunciJawaban[i].jawaban;

    if (benar) {
      jumlahBenar++;
    }

    rincianHasil += `
      <div class="hasil-item">
        <h4>Soal ${i + 1}: ${benar ? "Benar" : "Belum tepat"}</h4>
        <p><strong>Jawaban kamu:</strong> ${aman(jawabanSiswa[i])}</p>
        <p><strong>Kunci jawaban:</strong> ${kunciJawaban[i].jawaban}</p>
        <p><strong>Pembahasan:</strong> ${kunciJawaban[i].pembahasan}</p>
      </div>
    `;
  }

  // Memeriksa soal uraian nomor 5
  const jawabanLima = jawabanSiswa[4].toLowerCase();

  const menyebutGenap = jawabanLima.includes("genap");

  const menyebutAlasan =
    jawabanLima.includes("2") ||
    jawabanLima.includes("habis dibagi") ||
    jawabanLima.includes("kelipatan");

  const benarLima = menyebutGenap && menyebutAlasan;

  if (benarLima) {
    jumlahBenar++;
  }

  rincianHasil += `
    <div class="hasil-item">
      <h4>Soal 5: ${benarLima ? "Sesuai kriteria awal" : "Perlu ditinjau kembali"}</h4>
      <p><strong>Jawaban kamu:</strong> ${aman(jawabanSiswa[4])}</p>
      <p><strong>Pembahasan:</strong>
        Ya. Hasil perkalian bilangan ganjil dengan bilangan genap
        selalu genap. Bilangan genap dapat ditulis sebagai 2k.
        Jika dikalikan dengan bilangan ganjil, hasilnya tetap
        memiliki faktor 2 sehingga merupakan bilangan genap.
      </p>
      <p><em>Catatan: Penilaian soal uraian ini menggunakan
      pemeriksaan kata kunci awal. Penalaran siswa tetap perlu
      ditinjau oleh guru atau peneliti.</em></p>
    </div>
  `;

  // Menghitung nilai
  const nilai = jumlahBenar * 20;

  let pesan = "";

  if (nilai === 100) {
    pesan = "Luar biasa! Semua jawaban memenuhi kriteria.";
  } else if (nilai >= 60) {
    pesan = "Bagus! Pelajari kembali soal yang belum tepat.";
  } else {
    pesan = "Tetap semangat! Pelajari materi dan pembahasan kembali.";
  }

  // Menampilkan hasil
  const tempatHasil = document.getElementById("hasil-latihan");

  if (!tempatHasil) {
    alert("Bagian hasil latihan tidak ditemukan di HTML.");
    return;
  }

  tempatHasil.innerHTML = `
    <h3>Hasil Latihan Kamu</h3>

    <div class="nilai-box">
      <span>Nilai</span>
      <strong>${nilai}</strong>
      <p>${jumlahBenar} dari 5 soal memenuhi kriteria pemeriksaan.</p>
    </div>

    <p>${pesan}</p>

    ${rincianHasil}
  `;

  tempatHasil.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// MENGULANGI LATIHAN
function resetJawaban() {
  for (let i = 1; i <= 5; i++) {
    const kolom = document.getElementById("jawaban" + i);

    if (kolom) {
      kolom.value = "";
    }
  }

  const tempatHasil = document.getElementById("hasil-latihan");

  if (tempatHasil) {
    tempatHasil.innerHTML = "";
  }

  perbaruiProgres();
}

// MEMASANG EVENT SETELAH HALAMAN SIAP
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 5; i++) {
    const kolom = document.getElementById("jawaban" + i);

    if (kolom) {
      kolom.addEventListener("input", perbaruiProgres);
    }
  }

  perbaruiProgres();
});

// Memastikan fungsi dapat dipanggil oleh tombol HTML
window.periksaJawaban = periksaJawaban;
window.resetJawaban = resetJawaban;