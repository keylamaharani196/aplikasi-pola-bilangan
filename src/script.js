
/* =====================================================
   MATHLEARN - POLA BILANGAN GANJIL DAN GENAP
   FUNGSI LATIHAN, LITERASI, DAN AKTIVITAS RMT
   ===================================================== */


// =====================================================
// 1. DATA KUNCI JAWABAN DAN PEMBAHASAN
// =====================================================

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
            "Gunakan rumus Un = 2n - 1. U15 = 2(15) - 1 = 29."
    },
    {
        jawaban: "40",
        pembahasan:
            "Gunakan rumus Un = 2n. U20 = 2(20) = 40."
    }
];


// =====================================================
// 2. FUNGSI NORMALISASI JAWABAN
// =====================================================

function normalisasi(teks) {
    return teks
        .trim()
        .replace(/\s+/g, "")
        .replace(/[.;]/g, ",")
        .replace(/,+$/, "");
}


// =====================================================
// 3. FUNGSI MENGAMANKAN TEKS
// =====================================================

function aman(teks) {
    const elemen = document.createElement("div");
    elemen.textContent = teks;
    return elemen.innerHTML;
}


// =====================================================
// 4. MEMPERBARUI PROGRES LATIHAN
// =====================================================

function perbaruiProgres() {
    let terisi = 0;

    for (let i = 1; i <= 5; i++) {
        const jawaban = document.getElementById("jawaban" + i);

        if (jawaban && jawaban.value.trim() !== "") {
            terisi++;
        }
    }

    const persentase = (terisi / 5) * 100;

    const teksProgres = document.getElementById("progress-text");
    const batangProgres = document.getElementById("progress-bar");

    if (teksProgres) {
        teksProgres.textContent = terisi + " dari 5 dijawab";
    }

    if (batangProgres) {
        batangProgres.style.width = persentase + "%";
    }
}


// Memantau perubahan jawaban dengan aman.
for (let i = 1; i <= 5; i++) {
    const kolomJawaban = document.getElementById("jawaban" + i);

    if (kolomJawaban) {
        kolomJawaban.addEventListener("input", perbaruiProgres);
    }
}

perbaruiProgres();


// =====================================================
// 5. MEMERIKSA JAWABAN LATIHAN
// =====================================================

function periksaJawaban() {
    const jawabanSiswa = [];

    for (let i = 1; i <= 5; i++) {
        const kolom = document.getElementById("jawaban" + i);

        if (!kolom) {
            alert("Kolom jawaban soal " + i + " tidak ditemukan.");
            return;
        }

        jawabanSiswa.push(kolom.value.trim());
    }

    if (jawabanSiswa.some(jawaban => jawaban === "")) {
        alert("Silakan isi semua lima soal terlebih dahulu.");
        return;
    }

    let jumlahBenar = 0;
    let rincianHasil = "";

    // Memeriksa soal nomor 1 sampai 4.
    for (let i = 0; i < 4; i++) {
        const benar =
            normalisasi(jawabanSiswa[i]) ===
            kunciJawaban[i].jawaban;

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

    // Pemeriksaan sederhana soal uraian nomor 5.
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
                Hasil perkalian bilangan ganjil dengan bilangan genap
                selalu genap karena bilangan genap memiliki faktor 2.
            </p>
            <p><em>Catatan: Pemeriksaan ini menggunakan kata kunci
            dan belum menilai keseluruhan kualitas penalaran.</em></p>
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

    const tempatHasil = document.getElementById("hasil-latihan");

    if (!tempatHasil) {
        alert("Tempat hasil latihan tidak ditemukan.");
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


// =====================================================
// 6. MENGULANGI LATIHAN
// =====================================================

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


// =====================================================
// 7. MENYIMPAN JAWABAN TES LITERASI MATEMATIS
// =====================================================

function simpanJawabanLiterasi() {
    let hasil = "HASIL TES LITERASI MATEMATIS\n";
    hasil += "Materi: Pola Bilangan Ganjil dan Genap\n";
    hasil += "====================================\n\n";

    for (let nomor = 1; nomor <= 5; nomor++) {
        hasil += "SOAL " + nomor + "\n";

        const tahap = document.querySelectorAll(
            '[id^="l' + nomor + 't"]'
        );

        tahap.forEach((kolom, indeks) => {
            hasil += "Tahap " + (indeks + 1) + ":\n";
            hasil += (kolom.value.trim() || "Belum dijawab") + "\n\n";
        });

        hasil += "------------------------------------\n\n";
    }

    const file = new Blob([hasil], {
        type: "text/plain;charset=utf-8"
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = "Jawaban_Tes_Literasi.txt";
    link.click();

    URL.revokeObjectURL(url);
}


// =====================================================
// 8. AKTIVITAS PEMBELAJARAN RMT
// =====================================================

let tahapPetunjukRMT = 0;

const daftarPetunjukRMT = [
    "Petunjuk 1: Kelompok A dimulai dari bilangan 1, sedangkan kelompok B dimulai dari bilangan 2.",
    "Petunjuk 2: Kedua pola bertambah 2 pada setiap suku.",
    "Petunjuk 3: Gunakan rumus pola ganjil Un = 2n - 1 dan pola genap Un = 2n.",
    "Petunjuk 4: Masukkan n = 8 ke dalam kedua rumus tersebut."
];


// -----------------------------------------------------
// A. MEMERIKSA JAWABAN RMT
// -----------------------------------------------------

function periksaRMT() {
    const kolomInput = document.getElementById("rmt-input");
    const kolomRencana = document.getElementById("rmt-plan");
    const kolomJawaban = document.getElementById("rmt-answer");
    const hasil = document.getElementById("rmt-feedback");

    if (!kolomInput || !kolomRencana || !kolomJawaban || !hasil) {
        alert("Elemen Aktivitas RMT tidak ditemukan. Periksa kembali HTML.");
        return;
    }

    const input = kolomInput.value.trim();
    const rencana = kolomRencana.value.trim();
    const jawaban = kolomJawaban.value.trim();

    if (!input || !rencana || !jawaban) {
        hasil.innerHTML = `
            <div class="hasil-item">
                <h4>Jawaban belum lengkap.</h4>
                <p>Lengkapi analisis masalah, rencana penyelesaian,
                dan penyelesaian terlebih dahulu.</p>
            </div>
        `;
        return;
    }

    // Menghapus spasi agar bentuk penulisan rumus lebih fleksibel.
    const teksJawaban = jawaban
        .toLowerCase()
        .replace(/\s+/g, "");

    const memuatGanjil =
        teksJawaban.includes("15") ||
        teksJawaban.includes("2(8)-1") ||
        teksJawaban.includes("2×8-1");

    const memuatGenap =
        teksJawaban.includes("16") ||
        teksJawaban.includes("2(8)") ||
        teksJawaban.includes("2×8");

    if (memuatGanjil && memuatGenap) {
        hasil.innerHTML = `
            <div class="hasil-item">
                <h4>Bagus! Jawabanmu sudah sesuai.</h4>
                <p>Kamu berhasil menentukan nomor kartu kedua kelompok.</p>

                <p><strong>Kelompok A (ganjil):</strong> 15</p>
                <p>Un = 2(8) - 1 = 15</p>

                <p><strong>Kelompok B (genap):</strong> 16</p>
                <p>Un = 2(8) = 16</p>

                <p>Terus pertahankan cara berpikirmu dan pastikan
                kamu memahami langkah penyelesaiannya.</p>
            </div>
        `;
    } else {
        hasil.innerHTML = `
            <div class="hasil-item">
                <h4>Yuk, periksa kembali jawabanmu!</h4>
                <p>Ingat bahwa pola bilangan ganjil dimulai dari 1,
                sedangkan pola bilangan genap dimulai dari 2.</p>

                <p>Gunakan rumus:</p>
                <p>Kelompok A: Un = 2n - 1</p>
                <p>Kelompok B: Un = 2n</p>

                <p>Cobalah memasukkan n = 8 ke dalam kedua rumus.</p>
            </div>
        `;
    }

    hasil.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// -----------------------------------------------------
// B. MENAMPILKAN PETUNJUK BERTAHAP
// -----------------------------------------------------

function tampilkanPetunjukRMT() {
    const kotakPetunjuk = document.getElementById("rmt-hint");
    const teksPetunjuk = document.getElementById("rmt-hint-text");

    if (!kotakPetunjuk || !teksPetunjuk) {
        alert("Bagian petunjuk RMT tidak ditemukan.");
        return;
    }

    kotakPetunjuk.hidden = false;

    if (tahapPetunjukRMT < daftarPetunjukRMT.length) {
        teksPetunjuk.textContent =
            daftarPetunjukRMT[tahapPetunjukRMT];

        tahapPetunjukRMT++;
    } else {
        teksPetunjuk.textContent =
            "Semua petunjuk sudah ditampilkan. Sekarang cobalah menyelesaikan soal secara mandiri!";
    }
}


// -----------------------------------------------------
// C. MENYIMPAN JAWABAN RMT
// -----------------------------------------------------

function simpanJawabanRMT() {
    const kolomInput = document.getElementById("rmt-input");
    const kolomRencana = document.getElementById("rmt-plan");
    const kolomJawaban = document.getElementById("rmt-answer");
    const kolomRefleksi = document.getElementById("rmt-reflection");

    if (!kolomInput || !kolomRencana ||
        !kolomJawaban || !kolomRefleksi) {
        alert("Kolom Aktivitas RMT tidak ditemukan.");
        return;
    }

    const input = kolomInput.value.trim();
    const rencana = kolomRencana.value.trim();
    const jawaban = kolomJawaban.value.trim();
    const refleksi = kolomRefleksi.value.trim();

    if (!input || !rencana || !jawaban || !refleksi) {
        alert("Lengkapi semua bagian Aktivitas RMT sebelum menyimpan.");
        return;
    }

    const isi =
        "JAWABAN AKTIVITAS RMT\n\n" +
        "Analisis Masalah:\n" + input + "\n\n" +
        "Rencana Penyelesaian:\n" + rencana + "\n\n" +
        "Penyelesaian:\n" + jawaban + "\n\n" +
        "Refleksi:\n" + refleksi;

    const file = new Blob([isi], {
        type: "text/plain;charset=utf-8"
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = "Jawaban_Aktivitas_RMT.txt";
    link.click();

    URL.revokeObjectURL(url);
}


// =====================================================
// 9. MENGHUBUNGKAN FUNGSI DENGAN TOMBOL HTML
// =====================================================

window.periksaJawaban = periksaJawaban;
window.resetJawaban = resetJawaban;
window.simpanJawabanLiterasi = simpanJawabanLiterasi;

window.periksaRMT = periksaRMT;
window.tampilkanPetunjukRMT = tampilkanPetunjukRMT;
window.simpanJawabanRMT = simpanJawabanRMT;
