"use strict";

/* =========================
   BASIC
========================= */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* Mobile menu */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn?.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});
mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileNav.classList.remove("show"));
});

/* =========================
   WHATSAPP LINK (EDIT THIS)
   Put your number in international format:
   South Africa example: 27XXXXXXXXX (no +, no spaces)
========================= */
const WHATSAPP_NUMBER = "27720654503"; // <-- CHANGE THIS
const WHATSAPP_MESSAGE =
  "Hi Mira’s Beauty 👋 I would like to book. My preferred style is: ____ . Date/Time: ____ .";

function waUrl() {
  const msg = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

const waBtn = document.getElementById("waBtn");
const waFloat = document.getElementById("waFloat");
if (waBtn) waBtn.href = waUrl();
if (waFloat) waFloat.href = waUrl();

/* =========================
   HERO IMAGE SLIDESHOW
========================= */
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDotsWrap = document.getElementById("heroDots");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let heroIndex = 0;
let heroTimer = null;

function setHeroSlide(i) {
  heroIndex = (i + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((s, idx) => s.classList.toggle("is-active", idx === heroIndex));

  // dots
  if (heroDotsWrap) {
    const dots = Array.from(heroDotsWrap.querySelectorAll(".dot"));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === heroIndex));
  }
}

function buildHeroDots() {
  if (!heroDotsWrap) return;
  heroDotsWrap.innerHTML = "";
  heroSlides.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (idx === 0 ? " active" : "");
    dot.addEventListener("click", () => {
      setHeroSlide(idx);
      restartHeroTimer();
    });
    heroDotsWrap.appendChild(dot);
  });
}

function restartHeroTimer() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => setHeroSlide(heroIndex + 1), 4500);
}

buildHeroDots();
setHeroSlide(0);
restartHeroTimer();

heroPrev?.addEventListener("click", () => { setHeroSlide(heroIndex - 1); restartHeroTimer(); });
heroNext?.addEventListener("click", () => { setHeroSlide(heroIndex + 1); restartHeroTimer(); });

/* =========================
   VIDEO SLIDESHOW
========================= */
const videos = Array.from(document.querySelectorAll(".style-video"));
const vPrev = document.getElementById("vPrev");
const vNext = document.getElementById("vNext");
const vPlay = document.getElementById("vPlay");
const videoTitle = document.getElementById("videoTitle");
const videoThumbs = document.getElementById("videoThumbs");

let vIndex = 0;
let isPlaying = false;

// optional labels
const VIDEO_LABELS = ["Style 1", "Style 2", "Style 3"];

function showVideo(i) {
  if (!videos.length) return;
  vIndex = (i + videos.length) % videos.length;

  videos.forEach((v, idx) => {
    v.classList.toggle("is-active", idx === vIndex);
    v.pause();
    v.currentTime = 0;
  });

  if (videoTitle) videoTitle.textContent = VIDEO_LABELS[vIndex] || "Style Preview";

  // thumbs active
  if (videoThumbs) {
    Array.from(videoThumbs.querySelectorAll(".vthumb")).forEach((t, idx) => {
      t.classList.toggle("active", idx === vIndex);
    });
  }

  if (isPlaying) {
    videos[vIndex].play().catch(() => {});
  }
}

function buildVideoThumbs() {
  if (!videoThumbs) return;
  videoThumbs.innerHTML = "";
  videos.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.className = "vthumb" + (idx === 0 ? " active" : "");
    btn.type = "button";
    btn.innerHTML = `
      <div><b>${VIDEO_LABELS[idx] || "Style " + (idx + 1)}</b><br><small>Tap to preview</small></div>
      <div>▶</div>
    `;
    btn.addEventListener("click", () => showVideo(idx));
    videoThumbs.appendChild(btn);
  });
}

buildVideoThumbs();
showVideo(0);

// autoplay next when video ends (if playing)
videos.forEach((v, idx) => {
  v.addEventListener("ended", () => {
    if (isPlaying) showVideo(idx + 1);
  });
});

vPrev?.addEventListener("click", () => showVideo(vIndex - 1));
vNext?.addEventListener("click", () => showVideo(vIndex + 1));

vPlay?.addEventListener("click", () => {
  if (!videos.length) return;
  isPlaying = !isPlaying;

  if (isPlaying) {
    vPlay.textContent = "Pause";
    videos[vIndex].play().catch(() => {});
  } else {
    vPlay.textContent = "Play";
    videos[vIndex].pause();
  }
});

/* =========================
   INSTAGRAM LIGHTBOX
========================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".ig-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const full = btn.getAttribute("data-full");
    if (!full || !lightbox || !lightboxImg) return;
    lightboxImg.src = full;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImg) lightboxImg.src = "";
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* =========================
   REVIEWS SLIDER
========================= */
const reviewCard = document.getElementById("reviewCard");
const rPrev = document.getElementById("rPrev");
const rNext = document.getElementById("rNext");
const reviewDots = document.getElementById("reviewDots");

const REVIEWS = [
  { name: "Thando", stars: 5, text: "Very neat braids and professional service. I love my hair!" },
  { name: "Lerato", stars: 5, text: "Clean parts, nice finishing and friendly. Highly recommended." },
  { name: "Nomsa", stars: 5, text: "Booked on WhatsApp and everything was smooth. Great job!" },
  { name: "Ayanda", stars: 4, text: "Beautiful style and good timing. Will come again." }
];

let rIndex = 0;
let rTimer = null;

function stars(n) {
  return "⭐".repeat(Math.max(0, Math.min(5, n)));
}

function renderReview(i) {
  rIndex = (i + REVIEWS.length) % REVIEWS.length;
  const r = REVIEWS[rIndex];

  if (reviewCard) {
    reviewCard.innerHTML = `
      <div class="review-top">
        <div class="review-name">${r.name}</div>
        <div class="review-stars">${stars(r.stars)}</div>
      </div>
      <p class="review-text">${r.text}</p>
    `;
  }

  if (reviewDots) {
    const dots = Array.from(reviewDots.querySelectorAll(".dot"));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === rIndex));
  }
}

function buildReviewDots() {
  if (!reviewDots) return;
  reviewDots.innerHTML = "";
  REVIEWS.forEach((_, idx) => {
    const d = document.createElement("div");
    d.className = "dot" + (idx === 0 ? " active" : "");
    d.addEventListener("click", () => { renderReview(idx); restartReviewTimer(); });
    reviewDots.appendChild(d);
  });
}

function restartReviewTimer() {
  if (rTimer) clearInterval(rTimer);
  rTimer = setInterval(() => renderReview(rIndex + 1), 5200);
}

buildReviewDots();
renderReview(0);
restartReviewTimer();

rPrev?.addEventListener("click", () => { renderReview(rIndex - 1); restartReviewTimer(); });
rNext?.addEventListener("click", () => { renderReview(rIndex + 1); restartReviewTimer(); });
