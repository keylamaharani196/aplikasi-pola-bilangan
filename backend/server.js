
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.5-flash-lite";

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// HALAMAN UTAMA
app.get("/", (req, res) => {
    res.json({
        status: "berhasil",
        aplikasi: "MathLearn",
        asisten: "Kak Aritma",
        pesan: "Backend MathLearn aktif."
    });
});

// STATUS BACKEND
app.get("/status", (req, res) => {
    res.json({
        status: "aktif",
        backend: true,
        apiKeyConfigured: Boolean(API_KEY),
        model: MODEL
    });
});

// CHATBOT KAK ARITMA
app.post("/chat", async (req, res) => {
    try {
        if (!API_KEY) {
            return res.status(500).json({
                success: false,
                error: "API Key Gemini belum diatur di .env"
            });
        }

        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: "Pesan tidak boleh kosong."
            });
        }

        console.log("Pesan masuk:", message);

        const systemPrompt = `
Kamu adalah Kak Aritma, asisten pembelajaran matematika
di aplikasi MathLearn untuk siswa SMP.

Tugasmu:
1. Menjelaskan pola bilangan ganjil dan genap.
2. Menggunakan bahasa Indonesia sederhana.
3. Memberikan contoh soal dan pembahasan.
4. Menjelaskan langkah penyelesaian secara bertahap.
5. Bersikap ramah dan mendukung siswa.

Jawablah dengan jelas dan terstruktur.
`;

        // BATAS WAKTU 30 DETIK
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 30000);

        let response;

        try {
            response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": API_KEY
                    },
                    body: JSON.stringify({
                        systemInstruction: {
                            parts: [
                                { text: systemPrompt }
                            ]
                        },
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    { text: message.trim() }
                                ]
                            }
                        ],
                        generationConfig: {
                            maxOutputTokens: 1024
                        }
                    }),
                    signal: controller.signal
                }
            );
        } finally {
            clearTimeout(timeout);
        }

        const data = await response.json();

        // PENANGANAN ERROR GEMINI
        if (!response.ok) {
            console.error("Gemini Error:", data);

            const status = response.status;

            let pesanError = data.error?.message ||
                "Gemini sedang mengalami gangguan.";

            if (status === 400 || status === 403) {
                pesanError = "API Key tidak valid atau akses API bermasalah.";
            } else if (status === 429) {
                pesanError = "Batas penggunaan Gemini tercapai. Coba lagi nanti.";
            } else if (status === 503) {
                pesanError = "Gemini sedang sibuk. Silakan coba beberapa saat lagi.";
            }

            return res.status(status).json({
                success: false,
                error: pesanError
            });
        }

        // AMBIL JAWABAN AI
        const jawaban = data.candidates?.[0]?.content?.parts
            ?.map(part => part.text || "")
            .join("")
            .trim();

        if (!jawaban) {
            return res.status(502).json({
                success: false,
                error: "Gemini belum memberikan jawaban."
            });
        }

        console.log("Kak Aritma berhasil menjawab.");

        return res.json({
            success: true,
            reply: jawaban
        });

    } catch (error) {
        console.error("Chatbot Error:", error);

        if (error.name === "AbortError") {
            return res.status(504).json({
                success: false,
                error: "Waktu tunggu AI habis. Silakan coba lagi."
            });
        }

        return res.status(500).json({
            success: false,
            error: "Terjadi kesalahan pada backend."
        });
    }
});

// JALANKAN SERVER
app.listen(PORT, () => {
    console.log("==================================");
    console.log("       MATHLEARN - KAK ARITMA");
    console.log("==================================");
    console.log(`Backend berjalan di port ${PORT}`);
    console.log(`Model AI: ${MODEL}`);
    console.log(`API Key tersedia: ${Boolean(API_KEY)}`);
    console.log("==================================");
});
