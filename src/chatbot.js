
/* =====================================================
   MATHLEARN - KAK ARITMA CHATBOT
   Gemini AI + MathJax untuk tampilan rumus matematika
   ===================================================== */

// 1. ALAMAT BACKEND
const API_URL = "http://localhost:3000/chat";

// 2. MENGAMBIL ELEMEN HTML
const toggle = document.getElementById("chat-toggle");
const widget = document.getElementById("chat-widget");
const closeButton = document.getElementById("chat-close");
const messages = document.getElementById("chat-messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const sendButton = document.getElementById("chat-send");

// 3. STATUS CHATBOT
let history = [];
let sedangMemproses = false;
let mathJaxPromise = null;

// 4. MEMUAT MATHJAX SECARA OTOMATIS
function muatMathJax() {
    if (window.MathJax?.typesetPromise) {
        return Promise.resolve();
    }

    if (mathJaxPromise) {
        return mathJaxPromise;
    }

    // Pengaturan format rumus LaTeX
    window.MathJax = {
        tex: {
            inlineMath: [
                ["\\(", "\\)"],
                ["$", "$"]
            ],
            displayMath: [
                ["\\[", "\\]"],
                ["$$", "$$"]
            ],
            processEscapes: true
        },

        options: {
            skipHtmlTags: [
                "script",
                "noscript",
                "style",
                "textarea",
                "pre",
                "code"
            ]
        },

        startup: {
            typeset: false
        }
    };

    mathJaxPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";

        script.async = true;

        script.onload = () => {
            const siap = window.MathJax?.startup?.promise;

            if (siap) {
                siap.then(resolve).catch(reject);
            } else {
                resolve();
            }
        };

        script.onerror = () => {
            reject(new Error("MathJax gagal dimuat."));
        };

        document.head.appendChild(script);
    });

    return mathJaxPromise;
}

// 5. MENAMPILKAN PESAN
function tambahPesan(teks, pengirim) {
    const bubble = document.createElement("div");

    bubble.className = `chat-message ${pengirim}`;
    bubble.textContent = teks;

    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;

    return bubble;
}

// 6. MENAMPILKAN RUMUS MATEMATIKA
async function tampilkanRumus(elemen, teks) {
    // Tetap gunakan textContent agar teks AI tidak dianggap HTML.
    elemen.textContent = teks;

    try {
        await muatMathJax();

        if (window.MathJax?.typesetPromise) {
            await window.MathJax.typesetPromise([elemen]);
        }
    } catch (error) {
        console.warn("Tampilan rumus MathJax:", error);
        // Jika MathJax gagal, jawaban teks tetap ditampilkan.
    }

    messages.scrollTop = messages.scrollHeight;
}

// 7. MEMBUKA CHATBOT
toggle?.addEventListener("click", () => {
    widget.hidden = false;
    toggle.hidden = true;
    input?.focus();
});

// 8. MENUTUP CHATBOT
closeButton?.addEventListener("click", () => {
    widget.hidden = true;
    toggle.hidden = false;
});

// 9. MENGIRIM PESAN KE GEMINI
form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const pesan = input.value.trim();

    if (!pesan || sedangMemproses) return;

    sedangMemproses = true;

    if (sendButton) {
        sendButton.disabled = true;
    }

    tambahPesan(pesan, "user");

    input.value = "";

    const balasan = tambahPesan(
        "Kak Aritma sedang berpikir...",
        "bot"
    );

    try {
        // Mengirim permintaan ke backend
        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: pesan,
                history: history
            })
        });

        // Memeriksa respons server
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || `HTTP Error ${response.status}`
            );
        }

        // Mengambil jawaban AI
        const jawaban = data.reply;

        if (!jawaban) {
            throw new Error("Jawaban AI kosong.");
        }

        // Menampilkan jawaban sekaligus merender rumus
        await tampilkanRumus(balasan, jawaban);

        // Menyimpan riwayat percakapan
        history.push(
            { role: "user", text: pesan },
            { role: "model", text: jawaban }
        );

        history = history.slice(-8);

    } catch (error) {
        console.error("Chatbot Error:", error);

        balasan.textContent =
            "Maaf, Kak Aritma sedang mengalami kendala: " +
            error.message;

    } finally {
        // Mengaktifkan kembali tombol
        sedangMemproses = false;

        if (sendButton) {
            sendButton.disabled = false;
        }

        input?.focus();
    }
});

console.log("Chatbot Kak Aritma berhasil dimuat.");
