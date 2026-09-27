/**
 * Aesthetic Birthday Celebration Interactive Experience
 * Built with Alpine.js, Tailwind CSS, Canvas Confetti & Web Audio API
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('birthdayApp', () => ({
    // ---------------------------------------------
    // CONFIGURATION (Easily customizable by user)
    // ---------------------------------------------
    celebrant: {
      name: 'Sabrina Aulia Putri',
      nickname: 'Sayang',
      age: 22,
      birthDate: '2004-09-27', // YYYY-MM-DD
      relationshipStart: '2022-04-15', // Optional milestone
    },

    // UI States
    isCoverUnlocked: false,
    envelopeOpen: false,
    letterModalOpen: false,
    candleLit: true,
    candleBlown: false,
    isPlayingMusic: false,
    musicVolume: 0.7,
    petalsActive: true,

    // Live Age / Happiness Stats
    counter: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },

    // Selected photo for modal
    selectedPhoto: {
      src: '',
      title: '',
      date: '',
      caption: '',
      likes: 12,
      isLiked: false,
    },
    photoModalOpen: false,

    // Photo Gallery with optimized fast-loading dimensions
    photos: [
      {
        id: 1,
        src: '../../assets/images/awul_one.jpeg',
        title: 'Perkulihan 🎓',
        date: '16 September 2026',
        caption: 'Semangat Yah Kuliah nya hehehe ',
        rotation: '-rotate-2',
        tapeType: 'pink',
        likes: 42,
        isLiked: false,
      },
      {
        id: 2,
        src: '../../assets/images/awul_two.jpeg',
        title: 'OTW MAIN',
        date: '13 July 2026',
        caption: 'hati-hati yah kalau main kwkkwkw',
        rotation: 'rotate-2',
        tapeType: 'sage',
        likes: 38,
        isLiked: false,
      },
      {
        id: 3,
        src: '../../assets/images/awul_three.jpeg',
        title: 'Masa MA',
        date: '2023 - 2026',
        caption: 'Selamat Lulusan yah kwkwkwk',
        rotation: '-rotate-1',
        tapeType: 'pink',
        likes: 56,
        isLiked: false,
      }
    ],

    // Memory Timeline Items
    timeline: [
      {
        year: 'Momen 01',
        title: 'Pertama Kali Bertemu',
        date: 'Awal Pertemuan yang Tak Disengaja',
        description: 'Dari sekadar sapaan sederhana hingga obrolan larut malam yang membuat waktu seolah berhenti berputar. Hari di mana semesta memperkenalkan salah satu kebaikan terbesarnya.',
        badge: 'First Hello 💌',
        badgeColor: 'bg-rose-50 text-rose-600 border-rose-200'
      },
      {
        year: 'Momen 02',
        title: 'Kencan Pertama yang Lucu',
        date: 'Kecanggungan & Tawa Hangat',
        description: 'Masih ingat rasa canggung di awal pertemuan? Bingung mau pesan apa, tapi diakhiri dengan tawa lepas yang membuat semua rasa canggung itu hilang seketika.',
        badge: 'Sweet Memory 🍦',
        badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200'
      },
      {
        year: 'Momen 03',
        title: 'Melewati Hari-Hari Sulit Bersama',
        date: 'Saling Menguatkan & Mendengarkan',
        description: 'Bukan hanya tentang hari-hari cerah, tapi juga saat mendung datang. Terima kasih sudah selalu menjadi tempat pulang yang paling menenangkan.',
        badge: 'Safe Place 🌿',
        badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200'
      },
      {
        year: 'Momen 04',
        title: 'Hari Ini: Ulang Tahunmu!',
        date: '27 September • Hari Paling Bahagia',
        description: 'Merayakan kelahiran sosok luar biasa yang membawa begitu banyak warna dan kehangatan ke dunia ini. Semoga setiap langkahmu selalu dinaungi bahagia.',
        badge: 'Your Special Day 🎂',
        badgeColor: 'bg-rose-50 text-rose-600 border-rose-200'
      }
    ],

    // Interactive Wishes / Bucket List
    wishes: [
      { id: 1, text: 'Selalu diberikan kesehatan, ketenangan hati, dan umur panjang yang berkah 🌸', completed: true },
      { id: 2, text: 'Semua impian, cita-cita, dan rencana besarmu di tahun ini terwujud dengan mudah 🎓', completed: true },
      { id: 3, text: 'Piknik santai di sore hari sambil makan es krim favorit berdua 🧺', completed: false },
      { id: 4, text: 'Road trip ke pantai atau kota baru yang belum pernah kita kunjungi 🚗🏖️', completed: false },
      { id: 5, text: 'Tetap saling menggenggam tangan dalam setiap musim kehidupan 🤝💕', completed: true },
      { id: 6, text: 'Tersenyum setiap bangun tidur karena tahu kamu begitu dicintai ☀️✨', completed: true },
    ],

    // Custom Guest Wishes / Notes Board
    notes: [],
    newNoteAuthor: '',
    newNoteMessage: '',

    init() {
      this.initAgeCounter();
      this.loadSavedNotes();
      this.initPetalsCanvas();
      this.initCursorSparkles();

      // Audio engine setup
      setupAudioEngine();
    },

    // Unlock cover and reveal page
    unlockSurprise() {
      this.isCoverUnlocked = true;
      this.triggerConfetti();
      this.playBackgroundMusic();

      // Smooth scroll to content
      setTimeout(() => {
        const target = document.getElementById('surprise-content');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    },

    // Envelope Interactions
    toggleEnvelope() {
      this.envelopeOpen = !this.envelopeOpen;
      if (this.envelopeOpen) {
        this.triggerHeartConfetti();
      }
    },

    openFullLetter() {
      this.letterModalOpen = true;
      this.triggerHeartConfetti();
    },

    closeFullLetter() {
      this.letterModalOpen = false;
    },

    // Blow candle interaction
    blowCandle() {
      if (!this.candleLit) return;
      this.candleLit = false;
      this.candleBlown = true;
      this.triggerCakeConfetti();
    },

    relightCandle() {
      this.candleLit = true;
      this.candleBlown = false;
    },

    // Photo Modal
    openPhotoModal(photo) {
      this.selectedPhoto = { ...photo };
      this.photoModalOpen = true;
    },

    closePhotoModal() {
      this.photoModalOpen = false;
    },

    likePhoto(photo) {
      if (!photo.isLiked) {
        photo.likes += 1;
        photo.isLiked = true;
        this.spawnFloatingHeartAt(window.innerWidth / 2, window.innerHeight / 2);
      } else {
        photo.likes -= 1;
        photo.isLiked = false;
      }
      if (this.selectedPhoto && this.selectedPhoto.id === photo.id) {
        this.selectedPhoto.likes = photo.likes;
        this.selectedPhoto.isLiked = photo.isLiked;
      }
    },

    // Wish toggle
    toggleWish(wish) {
      wish.completed = !wish.completed;
      if (wish.completed) {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#F472B6', '#A7F3D0', '#FB7185']
        });
      }
    },

    // Add note to board
    addNote() {
      if (!this.newNoteMessage.trim()) return;
      const note = {
        id: Date.now(),
        author: this.newNoteAuthor.trim() || 'Teman Tersayang',
        message: this.newNoteMessage.trim(),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        color: ['bg-pink-50/90 border-pink-200', 'bg-emerald-50/90 border-emerald-200', 'bg-rose-50/90 border-rose-200'][Math.floor(Math.random() * 3)]
      };
      this.notes.unshift(note);
      this.newNoteMessage = '';
      this.newNoteAuthor = '';
      this.saveNotes();
      this.triggerConfetti();
      setTimeout(() => {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      }, 50);
    },

    deleteNote(id) {
      this.notes = this.notes.filter(n => n.id !== id);
      this.saveNotes();
    },

    saveNotes() {
      try {
        localStorage.setItem('birthday_notes', JSON.stringify(this.notes));
      } catch (e) {
        console.warn('Storage not accessible', e);
      }
    },

    loadSavedNotes() {
      try {
        const stored = localStorage.getItem('birthday_notes');
        if (stored) {
          this.notes = JSON.parse(stored);
        } else {
          // Default initial sweet messages
          this.notes = [
            {
              id: 1,
              author: 'Sahabat Terbaik',
              message: 'Selamat ulang tahun cantik! Semoga selalu dikelilingi orang-orang yang tulus menyayangimu. Sukses selalu untuk semua rencana barumu!',
              date: '27 Sep',
              color: 'bg-pink-50/90 border-pink-200'
            },
            {
              id: 2,
              author: 'Teman Cerita',
              message: 'Happy Level Up Day! Tetap jadi pribadi yang ceria, hangat, dan menginspirasi yaa! Semangat terus!',
              date: '27 Sep',
              color: 'bg-emerald-50/90 border-emerald-200'
            }
          ];
        }
      } catch (e) {
        console.warn('Cannot load notes', e);
      }
    },

    // Age / Happiness Days Live Calculation
    initAgeCounter() {
      const birth = new Date(this.celebrant.birthDate);
      const update = () => {
        const now = new Date();
        const diffMs = now - birth;
        if (diffMs > 0) {
          const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
          const seconds = Math.floor((diffMs / 1000) % 60);

          this.counter.days = totalDays;
          this.counter.hours = hours;
          this.counter.minutes = minutes;
          this.counter.seconds = seconds;
        }
      };
      update();
      setInterval(update, 1000);
    },

    // Music Player Controller
    toggleMusic() {
      if (this.isPlayingMusic) {
        this.pauseBackgroundMusic();
      } else {
        this.playBackgroundMusic();
      }
    },

    playBackgroundMusic() {
      const audioElement = document.getElementById('bg-music');
      if (audioElement && audioElement.src && !audioElement.src.endsWith('#') && audioElement.readyState >= 2) {
        audioElement.play().then(() => {
          this.isPlayingMusic = true;
        }).catch(() => {
          startMusicBox();
          this.isPlayingMusic = true;
        });
      } else {
        startMusicBox();
        this.isPlayingMusic = true;
      }
    },

    pauseBackgroundMusic() {
      const audioElement = document.getElementById('bg-music');
      if (audioElement) {
        audioElement.pause();
      }
      stopMusicBox();
      this.isPlayingMusic = false;
    },

    // Confetti Triggers
    triggerConfetti() {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FB7185', '#FCE7F3', '#A7F3D0', '#6EE7B7']
        });
      }
    },

    triggerHeartConfetti() {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          shapes: ['heart'],
          colors: ['#F472B6', '#FB7185', '#E11D48', '#FDA4AF']
        });
      }
    },

    triggerCakeConfetti() {
      if (typeof confetti === 'function') {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 } });
        }, 250);
      }
    },

    spawnFloatingHeartAt(x, y) {
      const heart = document.createElement('div');
      heart.className = 'cursor-heart';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.textContent = ['💖', '💕', '🌸', '✨', '💐'][Math.floor(Math.random() * 5)];
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1200);
    },

    // Falling Sakura & Rose Petals Canvas
    initPetalsCanvas() {
      const canvas = document.getElementById('petals-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      const petals = [];
      const petalColors = [
        'rgba(251, 207, 232, 0.7)', // pastel pink
        'rgba(244, 114, 182, 0.55)', // rose pink
        'rgba(254, 226, 226, 0.65)', // soft blush
        'rgba(167, 243, 208, 0.45)', // sage leaf
      ];

      for (let i = 0; i < 28; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height - height,
          size: Math.random() * 10 + 8,
          speedY: Math.random() * 1.2 + 0.8,
          speedX: Math.random() * 0.8 - 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
          sway: Math.random() * 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
        });
      }

      function render() {
        ctx.clearRect(0, 0, width, height);

        petals.forEach((p) => {
          p.y += p.speedY;
          p.x += Math.sin(p.sway) * 0.8 + p.speedX;
          p.sway += p.swaySpeed;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Draw delicate petal shape
          ctx.ellipse(0, 0, p.size, p.size / 2, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        });

        requestAnimationFrame(render);
      }
      render();
    },

    // Cursor Sparkle / Heart Trail
    initCursorSparkles() {
      let lastCall = 0;
      const emojis = ['✨', '🌸', '💖', '🌿', '🤍'];

      const createSparkle = (e) => {
        const now = Date.now();
        if (now - lastCall < 90) return; // throttle
        lastCall = now;

        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        if (!x || !y) return;

        const sparkle = document.createElement('span');
        sparkle.className = 'cursor-heart';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1200);
      };

      window.addEventListener('mousemove', createSparkle);
      window.addEventListener('touchmove', createSparkle, { passive: true });
    }
  }));
});

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// -------------------------------------------------------------------
// Gentle Music Box / Acoustic Synthesizer Audio Engine
// Procedurally generates a warm, sweet, romantic "Happy Birthday" melody
// No external mp3 file required to guarantee 100% reliable play!
// -------------------------------------------------------------------
let audioCtx = null;
let isAudioRunning = false;
let currentTimeout = null;

function setupAudioEngine() {
  // Wait for user interaction
}

function startMusicBox() {
  if (isAudioRunning) return;

  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  isAudioRunning = true;
  playBirthdayMelody();
}

function stopMusicBox() {
  isAudioRunning = false;
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }
}

// Musical notes and gentle music box bell synthesis
const NOTE_FREQS = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  REST: 0,
};

// "Happy Birthday" melody with duration in beats (approx 100 bpm)
const MELODY = [
  { note: 'G4', dur: 0.75 },
  { note: 'G4', dur: 0.25 },
  { note: 'A4', dur: 1.0 },
  { note: 'G4', dur: 1.0 },
  { note: 'C5', dur: 1.0 },
  { note: 'B4', dur: 2.0 },

  { note: 'G4', dur: 0.75 },
  { note: 'G4', dur: 0.25 },
  { note: 'A4', dur: 1.0 },
  { note: 'G4', dur: 1.0 },
  { note: 'D5', dur: 1.0 },
  { note: 'C5', dur: 2.0 },

  { note: 'G4', dur: 0.75 },
  { note: 'G4', dur: 0.25 },
  { note: 'G5', dur: 1.0 },
  { note: 'E5', dur: 1.0 },
  { note: 'C5', dur: 1.0 },
  { note: 'B4', dur: 1.0 },
  { note: 'A4', dur: 1.5 },

  { note: 'F5', dur: 0.75 },
  { note: 'F5', dur: 0.25 },
  { note: 'E5', dur: 1.0 },
  { note: 'C5', dur: 1.0 },
  { note: 'D5', dur: 1.0 },
  { note: 'C5', dur: 2.5 },

  { note: 'REST', dur: 1.5 }
];

function playNote(freq, durationSec) {
  if (!audioCtx || freq === 0 || !isAudioRunning) return;

  const now = audioCtx.currentTime;

  // Primary tone (warm chime/sine)
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  // Soft sparkle overtone (music box harmonic)
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, now);

  // Gentle music box decay envelope
  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(durationSec * 1.2, 0.4));

  // Connect graph
  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + durationSec * 1.4);
  osc2.stop(now + durationSec * 1.4);
}

function playBirthdayMelody(index = 0) {
  if (!isAudioRunning) return;

  if (index >= MELODY.length) {
    // Loop melody smoothly after short pause
    currentTimeout = setTimeout(() => {
      playBirthdayMelody(0);
    }, 1500);
    return;
  }

  const item = MELODY[index];
  const freq = NOTE_FREQS[item.note] || 0;
  const beatTimeMs = 520; // Tempo
  const durationSec = (item.dur * beatTimeMs) / 1000;

  if (freq > 0) {
    playNote(freq, durationSec);
  }

  const nextDelay = item.dur * beatTimeMs;
  currentTimeout = setTimeout(() => {
    playBirthdayMelody(index + 1);
  }, nextDelay);
}

// Safe, non-blocking Lucide icon initialization
if (typeof window !== 'undefined') {
  const renderIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  document.addEventListener('DOMContentLoaded', renderIcons);
  document.addEventListener('alpine:initialized', () => {
    setTimeout(renderIcons, 50);
  });
}


