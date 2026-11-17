
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ]
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "berhasil",
        pesan: "Backend aplikasi pembelajaran pola bilangan aktif."
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
