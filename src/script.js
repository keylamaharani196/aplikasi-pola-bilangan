
"use strict";

/* =========================================
   MATHLEARN - SCRIPT UTAMA
   ========================================= */

function ambilNilai(id) {
    const elemen = document.getElementById(id);
    return elemen ? elemen.value.trim() : "";
}

function tampilkanPesan(id, pesan) {
    const elemen = document.getElementById(id);
    if (elemen) elemen.textContent = pesan;
}

function simpanFile(namaFile, isi) {
    const blob = new Blob([isi], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = namaFile;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function normalisasi(teks) {
    return String(teks)
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

/* =========================================
   1. LATIHAN SOAL
   ========================================= */

const jumlahSoal = 5;

function hitungProgress() {
    let terisi = 0;

    for (let i = 1; i <= jumlahSoal; i++) {
        if (ambilNilai("jawaban" + i)) terisi++;
    }

    const teks = document.getElementById("progress-text");
    const bar = document.getElementById("progress-bar");

    if (teks) {
        teks.textContent = terisi + " dari " + jumlahSoal + " dijawab";
    }

    if (bar) {
        bar.style.width = (terisi / jumlahSoal * 100) + "%";
    }
}

function periksaJawaban() {
    const jawaban = [];

    for (let i = 1; i <= jumlahSoal; i++) {
        jawaban.push(normalisasi(ambilNilai("jawaban" + i)));
    }

    const belumDiisi = jawaban
        .map((isi, indeks) => isi ? null : indeks + 1)
        .filter(nomor => nomor !== null);

    if (belumDiisi.length > 0) {
        tampilkanPesan(
            "hasil-latihan",
            "Lengkapi jawaban nomor " + belumDiisi.join(", ") + " terlebih dahulu."
        );
        return;
    }

    let benar = 0;

    const angka1 = jawaban[0].match(/\d+/g) || [];
    if (angka1.join(",") === "1,3,5,7,9") benar++;

    const angka2 = jawaban[1].match(/\d+/g) || [];
    if (angka2.join(",") === "2,4,6,8,10,12") benar++;

    const angka3 = jawaban[2].match(/\d+/g) || [];
    if (angka3.length === 1 && angka3[0] === "29") benar++;

    const angka4 = jawaban[3].match(/\d+/g) || [];
    if (angka4.length === 1 && angka4[0] === "40") benar++;

    const alasan = jawaban[4];
    if (
        alasan.includes("ganjil") &&
        alasan.includes("genap") &&
        (alasan.includes("dikali") ||
         alasan.includes("perkalian") ||
         alasan.includes("habis dibagi 2") ||
         alasan.includes("kelipatan 2"))
    ) {
        benar++;
    }

    const nilai = benar * 20;

    tampilkanPesan(
        "hasil-latihan",
        "HASIL LATIHAN MATHLEARN\n" +
        "Jawaban benar: " + benar + " dari 5 soal\n" +
        "Nilai: " + nilai + "\n\n" +
        (benar === 5
            ? "Hebat! Semua jawabanmu tepat. 🌸"
            : "Tetap semangat! Pelajari kembali jawaban yang belum tepat.")
    );
}

function resetJawaban() {
    for (let i = 1; i <= jumlahSoal; i++) {
        const elemen = document.getElementById("jawaban" + i);
        if (elemen) elemen.value = "";
    }

    tampilkanPesan("hasil-latihan", "");
    hitungProgress();
}

/* =========================================
   2. LITERASI MATEMATIS
   Total nilai maksimal 30
   ========================================= */

const dataLiterasi = [
    {
        judul: "Soal 1 - Mathematical Reasoning",
        soal: "Dua siswa mengamati pola bilangan. Dita menyatakan bahwa pola 1, 3, 5, 7, ... bertambah 2 sehingga bilangan berikutnya adalah 9. Roni menyatakan bahwa pola 2, 4, 6, 8, ... bertambah 2 sehingga bilangan berikutnya adalah 10. Apakah kedua pernyataan tersebut benar? Jelaskan hubungan dan alasan matematisnya.",
        
tahap: [
    {
        pertanyaan: "Identifikasi bahwa kedua pola bilangan bertambah 2.",
        bobot: 1,
        cek: j => /bertambah 2|tambah 2|selisih 2|beda 2/.test(j)
    },
    {
        pertanyaan: "Tentukan suku berikutnya, yaitu 9 untuk pola ganjil dan 10 untuk pola genap.",
        bobot: 2,
        cek: j => /\b9\b/.test(j) && /\b10\b/.test(j)
    },
    {
        pertanyaan: "Jelaskan bahwa pola pertama ganjil dan pola kedua genap.",
        bobot: 1,
        cek: j => /ganjil/.test(j) && /genap/.test(j)
    },
    {
        pertanyaan: "Nyatakan bahwa kedua pernyataan Dita dan Roni benar.",
        bobot: 1,
        cek: j => /benar|tepat/.test(j)
    },
    {
        pertanyaan: "Jelaskan bahwa penambahan 2 mempertahankan jenis bilangan ganjil atau genap.",
        bobot: 1,
        cek: j => /tambah 2|penambahan 2|bertambah 2/.test(j) &&
                  /tetap|mempertahankan/.test(j) &&
                  /ganjil|genap/.test(j)
    }
]

    },
    {
        judul: "Soal 2 - Formulating Situations Mathematically",
        soal: "Panitia membuat kartu bilangan untuk dua kelompok. Kelompok A menggunakan bilangan ganjil mulai dari 1, sedangkan kelompok B menggunakan bilangan genap mulai dari 2. Setiap kelompok menambah 2 pada setiap tahap. Buat model matematika suku ke-n untuk masing-masing kelompok, kemudian tentukan bilangan pada tahap ke-8.",
        tahap: [
            {
                pertanyaan: "Tuliskan pola A: 1, 3, 5, ... dan pola B: 2, 4, 6, ...",
                bobot: 1,
                cek: j => /1.*3.*5/.test(j) && /2.*4.*6/.test(j)
            },
            {
                pertanyaan: "Jelaskan arti n sebagai nomor tahap atau suku.",
                bobot: 1,
                cek: j => /\bn\b/.test(j) && /tahap|suku|urutan/.test(j)
            },
            {
                pertanyaan: "Tuliskan model kelompok A: Un = 2n - 1.",
                bobot: 1,
                cek: j => /2n-1|2n−1|2\*n-1|2\*n−1/.test(j.replace(/\s/g, ""))
            },
            {
                pertanyaan: "Tuliskan model kelompok B: Un = 2n.",
                bobot: 1,
                cek: j => /2n|2\*n/.test(j.replace(/\s/g, ""))
            },
            {
                pertanyaan: "Hitung U8 kelompok A sehingga diperoleh 15.",
                bobot: 1,
                cek: j => /\b15\b/.test(j)
            },
            {
                pertanyaan: "Hitung U8 kelompok B sehingga diperoleh 16.",
                bobot: 1,
                cek: j => /\b16\b/.test(j)
            }
        ]
    },
    {
        judul: "Soal 3 - Employing Mathematical Concepts, Facts, and Procedures",
        soal: "Diketahui rumus bilangan ganjil Un = 2n - 1 dan rumus bilangan genap Un = 2n. Tentukan suku ke-15 bilangan ganjil dan suku ke-20 bilangan genap. Tunjukkan perhitungannya.",
        tahap: [
            {
                pertanyaan: "Tuliskan rumus bilangan ganjil Un = 2n - 1.",
                bobot: 1,
                cek: j => /2n-1|2n−1|2\*n-1|2\*n−1/.test(j.replace(/\s/g, ""))
            },
            {
                pertanyaan: "Hitung U15 = 2(15) - 1 = 29.",
                bobot: 2,
                cek: j => /\b15\b/.test(j) && /\b29\b/.test(j)
            },
            {
                pertanyaan: "Tuliskan rumus bilangan genap Un = 2n.",
                bobot: 1,
                cek: j => /2n|2\*n/.test(j.replace(/\s/g, ""))
            },
            {
                pertanyaan: "Hitung U20 = 2(20) = 40.",
                bobot: 2,
                cek: j => /\b20\b/.test(j) && /\b40\b/.test(j)
            }
        ]
    },
    {
        judul: "Soal 4 - Interpreting, Applying, and Evaluating Mathematical Outcomes",
        soal: "Andi menyatakan bahwa jumlah satu bilangan ganjil dan satu bilangan genap selalu menghasilkan bilangan ganjil. Beni memberikan contoh 5 + 8 = 13. Apakah contoh Beni mendukung pernyataan Andi? Jelaskan maknanya dan berikan contoh lain untuk memeriksa kesimpulan tersebut.",
        tahap: [
            {
                pertanyaan: "Identifikasi pernyataan bahwa ganjil ditambah genap menghasilkan ganjil.",
                bobot: 1,
                cek: j => /ganjil/.test(j) && /genap/.test(j)
            },
            {
                pertanyaan: "Periksa perhitungan 5 + 8 = 13.",
                bobot: 1,
                cek: j => /\b5\b/.test(j) && /\b8\b/.test(j) && /\b13\b/.test(j)
            },
            {
                pertanyaan: "Jelaskan bahwa 13 merupakan bilangan ganjil.",
                bobot: 1,
                cek: j => /\b13\b/.test(j) && /ganjil/.test(j)
            },
            {
                pertanyaan: "Jelaskan bahwa satu contoh belum membuktikan aturan umum.",
                bobot: 1,
                cek: j => /contoh/.test(j) && /belum|tidak/.test(j) && /membuktikan|aturan umum/.test(j)
            },
            {
                pertanyaan: "Berikan contoh lain, misalnya 3 + 4 = 7.",
                bobot: 1,
                cek: j => /\b3\b/.test(j) && /\b4\b/.test(j) && /\b7\b/.test(j)
            },
            {
                pertanyaan: "Simpulkan bahwa ganjil ditambah genap selalu menghasilkan ganjil.",
                bobot: 1,
                cek: j => /ganjil/.test(j) && /genap/.test(j) && /selalu|menghasilkan/.test(j)
            }
        ]
    },
    {
        judul: "Soal 5 - Employing Mathematical Concepts, Facts, and Procedures",
        soal: "Dalam sebuah permainan, kartu bilangan ganjil disusun mulai dari 1 dan kartu bilangan genap mulai dari 2. Rara menemukan kartu bernomor 37 dan 42. Tentukan posisi kartu 37 pada pola ganjil dan posisi kartu 42 pada pola genap. Tunjukkan cara menentukan posisinya.",
        tahap: [
            {
                pertanyaan: "Tuliskan rumus ganjil Un = 2n - 1 dan genap Un = 2n.",
                bobot: 1,
                cek: j => /2n-1|2n−1/.test(j.replace(/\s/g, "")) && /2n/.test(j.replace(/\s/g, ""))
            },
            {
                pertanyaan: "Buat persamaan 37 = 2n - 1.",
                bobot: 1,
                cek: j => /37=2n-1|37=2n−1/.test(j.replace(/\s/g, ""))
            },
            {
                pertanyaan: "Selesaikan persamaan hingga memperoleh n = 19.",
                bobot: 1,
                cek: j => /\b19\b/.test(j)
            },
            {
                pertanyaan: "Buat persamaan 42 = 2n.",
                bobot: 1,
                cek: j => /42=2n/.test(j.replace(/\s/g, ""))
            },
            {
                pertanyaan: "Selesaikan persamaan hingga memperoleh n = 21.",
                bobot: 1,
                cek: j => /\b21\b/.test(j)
            },
            {
                pertanyaan: "Simpulkan 37 adalah suku ke-19 dan 42 adalah suku ke-21.",
                bobot: 1,
                cek: j => /\b37\b/.test(j) && /\b19\b/.test(j) && /\b42\b/.test(j) && /\b21\b/.test(j)
            }
        ]
    }
];

/* Membuat soal dan kotak jawaban secara otomatis */
function buatTampilanLiterasi() {
    const wadah = document.getElementById("literasi-soal");
    if (!wadah) return;

    wadah.innerHTML = dataLiterasi.map((soal, i) => `
        <article class="content-card literasi-card">
            <h3>${soal.judul}</h3>
            <p>${soal.soal}</p>

            ${soal.tahap.map((t, j) => `
                <div class="literasi-tahap">
                    <label for="literasi-${i}-${j}">
                        Tahap ${j + 1}. ${t.pertanyaan}
                        <small>(Maksimal ${t.bobot} poin)</small>
                    </label>

                    <textarea
                        id="literasi-${i}-${j}"
                        rows="3"
                        placeholder="Tuliskan jawaban tahap ini..."
                    ></textarea>
                </div>
            `).join("")}

            <p class="literasi-skor" id="literasi-skor-${i}">
                Skor: Belum diperiksa
            </p>
        </article>
    `).join("");
}

/* Memeriksa jawaban dan menghitung skor */
function periksaLiterasi() {
    let total = 0;
    const rincian = [];

    dataLiterasi.forEach((soal, i) => {
        let skorSoal = 0;
        let maksimal = 0;

        soal.tahap.forEach((t, j) => {
            const jawaban = normalisasi(
                ambilNilai(`literasi-${i}-${j}`)
            );

            maksimal += t.bobot;

            if (jawaban && t.cek(jawaban)) {
                skorSoal += t.bobot;
            }
        });

        total += skorSoal;

        const skorElemen = document.getElementById(`literasi-skor-${i}`);
        if (skorElemen) {
            skorElemen.textContent =
                `Skor: ${skorSoal} dari ${maksimal}`;
        }

        rincian.push(`Soal ${i + 1}: ${skorSoal}/${maksimal}`);
    });

    tampilkanPesan(
        "literasi-total",
        `Nilai keseluruhan: ${total} dari 30`
    );

    const detail = document.getElementById("literasi-detail");
    if (detail) {
        detail.innerHTML = rincian
            .map(item => `<p>${item}</p>`)
            .join("");
    }

    return { total, rincian };
}

/* Menyimpan jawaban dan hasil penilaian */
function simpanJawabanLiterasi() {
    const hasil = periksaLiterasi();

    let isi = "HASIL LITERASI MATEMATIKA MATHLEARN\n";
    isi += "Nilai keseluruhan: " + hasil.total + " dari 30\n\n";

    dataLiterasi.forEach((soal, i) => {
        isi += soal.judul + "\n";
        isi += soal.soal + "\n";

        soal.tahap.forEach((t, j) => {
            isi += `Tahap ${j + 1}: `;
            isi += ambilNilai(`literasi-${i}-${j}`) || "Belum diisi";
            isi += ` (Bobot ${t.bobot})\n`;
        });

        isi += document.getElementById(`literasi-skor-${i}`).textContent;
        isi += "\n\n";
    });

    simpanFile("hasil-literasi-mathlearn.txt", isi);
}

/* =========================================
   3. AKTIVITAS RMT
   ========================================= */

let indeksPetunjukRMT = 0;

const petunjukRMT = [
    "Identifikasi informasi: kelompok A dimulai dari 1 dan kelompok B dimulai dari 2.",
    "Kedua pola bertambah 2 pada setiap tahap. Kelompok A adalah pola ganjil dan kelompok B adalah pola genap.",
    "Gunakan rumus ganjil Un = 2n - 1 dan rumus genap Un = 2n.",
    "Masukkan n = 8. Pola ganjil menghasilkan 15 dan pola genap menghasilkan 16."
];

function tampilkanPetunjukRMT() {
    const kotak = document.getElementById("rmt-hint");
    const teks = document.getElementById("rmt-hint-text");

    if (!kotak || !teks) return;

    teks.textContent =
        `Petunjuk ${indeksPetunjukRMT + 1} dari ${petunjukRMT.length}: ` +
        petunjukRMT[indeksPetunjukRMT];

    kotak.hidden = false;

    indeksPetunjukRMT =
        (indeksPetunjukRMT + 1) % petunjukRMT.length;
}

function periksaRMT() {
    const analisis = ambilNilai("rmt-input");
    const rencana = ambilNilai("rmt-plan");
    const jawaban = ambilNilai("rmt-answer");
    const refleksi = ambilNilai("rmt-reflection");

    if (!analisis || !rencana || !jawaban || !refleksi) {
        tampilkanPesan(
            "rmt-feedback",
            "Lengkapi analisis, rencana, penyelesaian, dan refleksi terlebih dahulu."
        );
        return;
    }

    const teks = normalisasi(jawaban);
    const benar15 = /\b15\b/.test(teks);
    const benar16 = /\b16\b/.test(teks);

    if (benar15 && benar16) {
        tampilkanPesan(
            "rmt-feedback",
            "Bagus! Jawabanmu sudah memuat hasil 15 untuk pola ganjil dan 16 untuk pola genap. Periksa kembali apakah langkah dan alasanmu sudah jelas."
        );
    } else {
        tampilkanPesan(
            "rmt-feedback",
            "Jawaban sudah terisi. Periksa kembali rumus dan perhitunganmu. Petunjuk: suku ke-8 pola ganjil adalah 15 dan pola genap adalah 16."
        );
    }
}

function simpanJawabanRMT() {
    const analisis = ambilNilai("rmt-input");
    const rencana = ambilNilai("rmt-plan");
    const jawaban = ambilNilai("rmt-answer");
    const refleksi = ambilNilai("rmt-reflection");

    if (!analisis && !rencana && !jawaban && !refleksi) {
        alert("Silakan isi aktivitas RMT terlebih dahulu.");
        return;
    }

    const isi =
        "HASIL AKTIVITAS RMT MATHLEARN\n\n" +
        "1. Task Analysis (Analisis Tugas)\n" + (analisis || "Belum diisi") + "\n\n" +
        "2. Planning of Action (Perencanaan Tindakan)\n" + (rencana || "Belum diisi") + "\n\n" +
        "3. Penyelesaian Masalah\n" + (jawaban || "Belum diisi") + "\n\n" +
        "4. Reflection (Refleksi)\n" + (refleksi || "Belum diisi");

    simpanFile("jawaban-aktivitas-rmt-mathlearn.txt", isi);
}

/* =========================================
   4. HUBUNGKAN FUNGSI KE HTML
   ========================================= */

window.periksaJawaban = periksaJawaban;
window.resetJawaban = resetJawaban;
window.periksaRMT = periksaRMT;
window.tampilkanPetunjukRMT = tampilkanPetunjukRMT;
window.simpanJawabanRMT = simpanJawabanRMT;
window.periksaLiterasi = periksaLiterasi;
window.simpanJawabanLiterasi = simpanJawabanLiterasi;

/* =========================================
   5. INISIALISASI
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    buatTampilanLiterasi();

    for (let i = 1; i <= jumlahSoal; i++) {
        const elemen = document.getElementById("jawaban" + i);

        if (elemen) {
            elemen.addEventListener("input", hitungProgress);
        }
    }

    hitungProgress();

    const tombolPeriksaLiterasi =
        document.getElementById("btn-periksa-literasi");

    if (tombolPeriksaLiterasi) {
        tombolPeriksaLiterasi.addEventListener(
            "click",
            periksaLiterasi
        );
    }

    console.log("MathLearn berhasil dimuat.");
});
