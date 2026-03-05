"use strict";

/* YEAR */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* MOBILE MENU */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
menuBtn?.addEventListener("click", () => mobileNav.classList.toggle("show"));
mobileNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("show")));

/* WHATSAPP (EDIT THIS) */
const WHATSAPP_NUMBER = "27720654503"; // change to your number (no +, no spaces)
const WHATSAPP_MESSAGE =
  "Hi Mira’s Beauty 👋 I would like to book. Style: ____ . Date/Time: ____ .";

function waUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
const waBtn = document.getElementById("waBtn");
const waFloat = document.getElementById("waFloat");
if (waBtn) waBtn.href = waUrl();
if (waFloat) waFloat.href = waUrl();

/* HERO SLIDESHOW */
const slides = Array.from(document.querySelectorAll("#heroSlides .slide"));
const dotsWrap = document.getElementById("heroDots");
const prevBtn = document.getElementById("heroPrev");
const nextBtn = document.getElementById("heroNext");

let idx = 0;
let timer = null;

function setSlide(i) {
  if (!slides.length) return;
  idx = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle("active", n === idx));
  if (dotsWrap) {
    dotsWrap.querySelectorAll(".dotbtn").forEach((d, n) => d.classList.toggle("active", n === idx));
  }
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dotbtn" + (n === 0 ? " active" : "");
    b.addEventListener("click", () => { setSlide(n); restart(); });
    dotsWrap.appendChild(b);
  });
}

function restart() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => setSlide(idx + 1), 4500);
}

buildDots();
setSlide(0);
restart();

prevBtn?.addEventListener("click", () => { setSlide(idx - 1); restart(); });
nextBtn?.addEventListener("click", () => { setSlide(idx + 1); restart(); });

/* GALLERY LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("lightboxClose");

document.querySelectorAll(".ig").forEach(btn => {
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
closeBtn?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* REVIEWS SLIDER */
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

function starLine(n){ return "⭐".repeat(Math.max(0, Math.min(5, n))); }

function renderReview(i){
  rIndex = (i + REVIEWS.length) % REVIEWS.length;
  const r = REVIEWS[rIndex];

  if (reviewCard){
    reviewCard.innerHTML = `
      <div class="review-top">
        <div class="review-name">${r.name}</div>
        <div class="review-stars">${starLine(r.stars)}</div>
      </div>
      <p class="review-text">${r.text}</p>
    `;
  }

  if (reviewDots){
    reviewDots.querySelectorAll(".dotbtn").forEach((d,n)=>d.classList.toggle("active", n===rIndex));
  }
}

function buildReviewDots(){
  if (!reviewDots) return;
  reviewDots.innerHTML = "";
  REVIEWS.forEach((_, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dotbtn" + (n === 0 ? " active" : "");
    b.addEventListener("click", () => { renderReview(n); restartReview(); });
    reviewDots.appendChild(b);
  });
}

function restartReview(){
  if (rTimer) clearInterval(rTimer);
  rTimer = setInterval(() => renderReview(rIndex + 1), 5200);
}

buildReviewDots();
renderReview(0);
restartReview();

rPrev?.addEventListener("click", () => { renderReview(rIndex - 1); restartReview(); });
rNext?.addEventListener("click", () => { renderReview(rIndex + 1); restartReview(); });

/* IMAGE FALLBACK (prevents ugly broken icons) */
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.opacity = "0";
    const parent = img.parentElement;
    if (parent) parent.style.background = "linear-gradient(135deg, rgba(255,79,163,.16), rgba(143,91,255,.16))";
  });
});
