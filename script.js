
// ==========================================
// DATA KUNCI JAWABAN DAN PEMBAHASAN
// ==========================================

const kunciJawaban = [
    {
        jawaban: "1,3,5,7,9",
        pembahasan:
            "Pola bilangan ganjil dimulai dari 1 dan bertambah 2. " +
            "Lima suku pertamanya adalah 1, 3, 5, 7, dan 9."
    },
    {
        jawaban: "2,4,6,8,10,12",
        pembahasan:
            "Pola bilangan genap dimulai dari 2 dan bertambah 2. " +
            "Enam suku pertamanya adalah 2, 4, 6, 8, 10, dan 12."
    },
    {
        jawaban: "29",
        pembahasan:
            "Gunakan rumus U_n = 2n - 1. " +
            "U_15 = 2(15) - 1 = 30 - 1 = 29."
    },
    {
        jawaban: "40",
        pembahasan:
            "Gunakan rumus U_n = 2n. " +
            "U_20 = 2(20) = 40."
    }
];

// ==========================================
// NORMALISASI JAWABAN
// ==========================================

function normalisasi(teks) {
    return teks
        .trim()
        .replace(/\s+/g, "")
        .replace(/[.;]/g, ",")
        .replace(/,+$/, "");
}

// ==========================================
// MEMPERBARUI PROGRES LATIHAN
// ==========================================

function perbaruiProgres() {
    let terisi = 0;

    for (let i = 1; i <= 5; i++) {
        const jawaban = document.getElementById("jawaban" + i);

        if (jawaban.value.trim() !== "") {
            terisi++;
        }
    }

    const persentase = (terisi / 5) * 100;

    document.getElementById("progress-text").textContent =
        terisi + " dari 5 dijawab";

    document.getElementById("progress-bar").style.width =
        persentase + "%";
}

// Memantau perubahan jawaban siswa.
for (let i = 1; i <= 5; i++) {
    document.getElementById("jawaban" + i)
        .addEventListener("input", perbaruiProgres);
}

// ==========================================
// MEMERIKSA JAWABAN LATIHAN
// ==========================================

function periksaJawaban() {
    const jawabanSiswa = [];

    for (let i = 1; i <= 5; i++) {
        jawabanSiswa.push(
            document.getElementById("jawaban" + i).value.trim()
        );
    }

    // Memastikan semua soal telah diisi.
    const adaKosong = jawabanSiswa.some(
        jawaban => jawaban === ""
    );

    if (adaKosong) {
        alert("Silakan isi semua lima soal terlebih dahulu.");
        return;
    }

    let jumlahBenar = 0;
    let hasil = "";

    // Memeriksa empat soal dengan jawaban pasti.
    for (let i = 0; i < 4; i++) {
        const benar =
            normalisasi(jawabanSiswa[i]) ===
            kunciJawaban[i].jawaban;

        if (benar) {
            jumlahBenar++;
        }

        hasil += `
            <div class="hasil-item">
                <h4>Soal ${i + 1}: ${benar ? "Benar" : "Belum tepat"}</h4>
                <p><strong>Jawaban kamu:</strong> ${aman(jawabanSiswa[i])}</p>
                <p><strong>Kunci jawaban:</strong> ${kunciJawaban[i].jawaban}</p>
                <p><strong>Pembahasan:</strong> ${kunciJawaban[i].pembahasan}</p>
            </div>
        `;
    }

    // Soal nomor lima merupakan soal uraian.
    // Penilaian dilakukan dengan kriteria isi jawaban.
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

    hasil += `
        <div class="hasil-item">
            <h4>Soal 5: ${benarLima ? "Sesuai kriteria awal" : "Perlu ditinjau kembali"}</h4>
            <p><strong>Jawaban kamu:</strong> ${aman(jawabanSiswa[4])}</p>
            <p><strong>Pembahasan:</strong>
                Ya. Hasil perkalian bilangan ganjil dengan bilangan
                genap selalu genap. Bilangan genap dapat ditulis
                sebagai 2k. Jika dikalikan dengan bilangan ganjil,
                hasilnya tetap memiliki faktor 2 sehingga merupakan
                bilangan genap.
            </p>
            <p><em>Catatan: Penilaian soal uraian ini masih berupa
            pemeriksaan kata kunci. Guru atau peneliti perlu
            memeriksa penalaran siswa secara langsung.</em></p>
        </div>
    `;

    const nilai = jumlahBenar * 20;

    let pesan = "";

    if (nilai === 100) {
        pesan = "Luar biasa! Semua jawaban memenuhi kriteria.";
    } else if (nilai >= 60) {
        pesan = "Bagus! Pelajari kembali soal yang belum tepat.";
    } else {
        pesan = "Tetap semangat! Pelajari materi dan pembahasan kembali.";
    }

    hasil = `
        <h3>Hasil Latihan Kamu</h3>
        <div class="nilai-box">
            <span>Nilai</span>
            <strong>${nilai}</strong>
            <p>${jumlahBenar} dari 5 soal memenuhi kriteria pemeriksaan.</p>
        </div>
        <p>${pesan}</p>
        ${hasil}
    `;

    document.getElementById("hasil-latihan").innerHTML = hasil;

    document.getElementById("hasil-latihan")
        .scrollIntoView({ behavior: "smooth", block: "start" });
}

// ==========================================
// MENCEGAH TEKS JAWABAN MENJADI HTML
// ==========================================

function aman(teks) {
    const elemen = document.createElement("div");
    elemen.textContent = teks;
    return elemen.innerHTML;
}

// ==========================================
// MENGULANGI LATIHAN
// ==========================================

function resetJawaban() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById("jawaban" + i).value = "";
    }

    document.getElementById("hasil-latihan").innerHTML = "";

    perbaruiProgres();
}
