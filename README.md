# ✨ Website Ucapan Ulang Tahun Estetik & Interaktif (Birthday Celebration Web)

Website ucapan ulang tahun bertema romantis, elegan, dan estetik dengan sentuhan **glassmorphism**, palet warna **Soft White, Rose Pink, dan Sage Green**, serta berbagai fitur interaktif berbasis **HTML5, Tailwind CSS, Alpine.js, Canvas Confetti, dan Web Audio API**.

---

## 🎨 Palet Warna & Desain (Aesthetic Theme)
- **Background Utama:** Clean Soft White / Off-White (`#FDFBFB` & `#FAFAFA`).
- **Aksen Utama:** Soft Pastel Pink & Rose Pink (`#F472B6`, `#FCE7F3`, `#FB7185`, `#E11D48`).
- **Aksen Sekunder:** Sage Green & Soft Emerald (`#A7F3D0`, `#6EE7B7`, `#059669`).
- **Gaya Visual:** Clean, romantic, dreamy, dengan sentuhan *glassmorphism* (kartu semi-transparan dengan efek blur halus), sudut membulat (*rounded-2xl/3xl*), dan bayangan lembut (*soft shadows*).
- **Tipografi:**
  - *Serif Anggun:* `Playfair Display` & `Sacramento` untuk judul & sentuhan puitis.
  - *Sans-Serif Modern:* `Plus Jakarta Sans` untuk kemudahan membaca.
  - *Handwriting Font:* `Caveat` untuk surat cinta tulisan tangan dan teks polaroid.

---

## 🌟 Fitur-Fitur Interaktif

1. **Cover / Hero Interaktif:**
   - Sambutan animasi *"Happy Birthday, [Nama]! ✨"*.
   - Tombol utama *"Open Your Birthday Letter 💌"* dengan ledakan konfeti lembut (`canvas-confetti`) dan memulai pemutar musik secara otomatis.
   - **Live Age & Happiness Counter:** Menghitung total hari, jam, menit, dan detik kebahagiaan yang terus bertambah secara real-time.

2. **Amplop Surat Rahasia 3D (Interactive Envelope):**
   - Amplop dengan segel lilin (*wax seal*) berbentuk hati.
   - Ketika diklik, segel terbuka dan flap amplop membuka ke atas secara 3D, memunculkan surat tulisan tangan di dalamnya.
   - Tombol *"Baca Surat Versi Lengkap"* untuk membuka modal surat puitis yang indah.

3. **Polaroid Photo Gallery & Showcase:**
   - Bingkai foto gaya Polaroid dengan washi tape pastel pink & sage green.
   - Rotasi acak alami (`rotate-1`, `-rotate-2`, hover tilt physics).
   - Filter foto hangat bernada pastel.
   - Klik foto untuk membuka **Modal Pop-up** resolusi penuh lengkap dengan cerita manis momen tersebut dan tombol suka/like interaktif.

4. **Kue Ulang Tahun Virtual & Tiup Lilin (Virtual Cake & Candle):**
   - Kue tingkat estetis dengan lilin berapi yang berkedip (*flickering flame*).
   - Tombol **"Tiup Lilin 🕯️💨"**: memadamkan api lilin, memunculkan efek asap halus, diiringi selebrasi kembang api konfeti melimpah!
   - Tombol untuk menyalakan lilin kembali.

5. **Memory Timeline (Jejak Langkah Kita):**
   - Timeline vertikal momen-momen berharga bersama (Momen Pertama Kenalan, Kencan Lucu, Melewati Badai Bersama, hingga Hari Ulang Tahun).
   - Pin bercahaya warna sage green dan kartu glassmorphism.

6. **Interactive Wishlist & Doa Bersama:**
   - Daftar impian dan harapan ulang tahun yang bisa dicentang langsung secara interaktif.
   - **Papan Doa (Love Notes Board):** Pengunjung dapat menulis ucapan dan doa yang tersimpan di browser (`localStorage`).

7. **Floating Music Player Widget:**
   - Pemutar musik melayang di pojok kanan bawah.
   - Piringan piringan hitam mini (*mini vinyl*) yang berputar saat musik diputar + visualizer bar suara (*sound wave*).
   - **Dual Audio Engine:**
     - Menggunakan **Web Audio API Procedural Synthesizer** (memainkan melodi lembut *music box* lagu Happy Birthday tanpa perlu download file mp3 dan bebas error CORS).
     - Mendukung file MP3 kustom jika kamu menaruh lagu favorit di `assets/audio/song.mp3`.

8. **Efek Partikel Estetis:**
   - **Falling Flower Petals Canvas:** Kelopak bunga sakura merah muda dan daun sage green berterbangan lembut di latar belakang.
   - **Interactive Sparkle / Heart Trail:** Taburan hati dan kilau bintang (*sparks*) lembut yang mengikuti pergerakan kursor mouse dan sentuhan layar ponsel.

---

## 📁 Struktur Direktori

```
doctor/
│
├── index.html               # Halaman utama dengan semantic HTML5 & Alpine.js
├── README.md                # Dokumentasi & panduan kustomisasi
│
└── assets/
    ├── css/
    │   └── style.css        # Custom CSS, glassmorphism, 3D envelope, polaroids
    ├── js/
    │   └── app.js           # Alpine.js reactive store, confetti, audio synthesizer
    ├── images/              # Folder untuk foto kustom
    └── audio/               # Folder untuk file musik kustom (misal: song.mp3)
```

---

## 🛠️ Cara Kustomisasi Data & Pesan

Semua pengaturan utama tersimpan di file [`assets/js/app.js`](file:///mnt/d/laragon/www/project/dasar/doctor/assets/js/app.js) pada bagian awal:

### 1. Mengubah Nama, Panggilan & Tanggal Lahir
Buka [`assets/js/app.js`](file:///mnt/d/laragon/www/project/dasar/doctor/assets/js/app.js), ubah bagian:
```javascript
celebrant: {
  name: 'Adelia Putri',          // Nama lengkap
  nickname: 'Sayang',            // Panggilan sayang
  age: 22,                       // Usia
  birthDate: '2004-09-27',       // Format: YYYY-MM-DD (untuk hitungan live counter)
}
```

### 2. Mengganti Foto Polaroid & Cerita
Pada array `photos` di [`assets/js/app.js`](file:///mnt/d/laragon/www/project/dasar/doctor/assets/js/app.js):
```javascript
{
  id: 1,
  src: 'assets/images/foto1.jpg', // atau URL foto online
  title: 'Senyuman Termurni ✨',
  date: '14 Februari 2024',
  caption: 'Cerita singkat momen indah foto ini...',
  rotation: '-rotate-2',
  tapeType: 'pink', // 'pink' atau 'sage'
}
```

### 3. Mengubah Surat Ucapan
- Teks ringkas pada amplop dan isi surat lengkap pada modal dapat langsung diedit di [`index.html`](file:///mnt/d/laragon/www/project/dasar/doctor/index.html) bagian `letter-inside` dan `MODAL: FULL LETTER POPUP`.

### 4. Menambahkan Lagu Favorit (MP3)
- Taruh file lagu format `.mp3` ke dalam folder `assets/audio/` dan beri nama `song.mp3`.
- Jika file `song.mp3` belum ada, website akan otomatis memutar melodi *music box* bawaan yang manis dan merdu!

---

## 🚀 Cara Menjalankan

Kamu bisa langsung menjalankan website ini dengan beberapa cara:
1. **Lewat Browser Langsung:** Buka file `index.html` dengan klik ganda atau seret ke browser favorit (Chrome, Edge, Firefox, Safari).
2. **Lewat Laragon:** Akses URL virtual host Laragon kamu, contoh:
   - `http://doctor.test` atau
   - `http://localhost/project/dasar/doctor/`
