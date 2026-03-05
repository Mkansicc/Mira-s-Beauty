"use strict";

/* YEAR */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* MOBILE MENU */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
menuBtn?.addEventListener("click", () => mobileNav.classList.toggle("show"));
mobileNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("show")));

/* WHATSAPP (CHANGE THIS) */
const WHATSAPP_NUMBER = "27720654503"; // e.g. 27831234567 (no +, no spaces)
const WHATSAPP_MESSAGE = "Hi Mira’s Beauty 👋 I want to book. Style: ____ | Date/Time: ____ | Hair length: ____";

function waUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
const waBtn = document.getElementById("waBtn");
const waFloat = document.getElementById("waFloat");
if (waBtn) waBtn.href = waUrl();
if (waFloat) waFloat.href = waUrl();

/* HERO SLIDESHOW */
const hsSlides = Array.from(document.querySelectorAll(".hs-slide"));
const hsDots = document.getElementById("hsDots");
const hsPrev = document.getElementById("hsPrev");
const hsNext = document.getElementById("hsNext");

let hsIndex = 0;
let hsTimer = null;

function setHs(i) {
  if (!hsSlides.length) return;
  hsIndex = (i + hsSlides.length) % hsSlides.length;
  hsSlides.forEach((s, idx) => s.classList.toggle("is-active", idx === hsIndex));
  if (hsDots) hsDots.querySelectorAll(".dotbtn").forEach((d, idx) => d.classList.toggle("active", idx === hsIndex));
}

function buildHsDots() {
  if (!hsDots) return;
  hsDots.innerHTML = "";
  hsSlides.forEach((_, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dotbtn" + (idx === 0 ? " active" : "");
    b.addEventListener("click", () => { setHs(idx); restartHs(); });
    hsDots.appendChild(b);
  });
}

function restartHs() {
  if (hsTimer) clearInterval(hsTimer);
  hsTimer = setInterval(() => setHs(hsIndex + 1), 4500);
}

buildHsDots();
setHs(0);
restartHs();

hsPrev?.addEventListener("click", () => { setHs(hsIndex - 1); restartHs(); });
hsNext?.addEventListener("click", () => { setHs(hsIndex + 1); restartHs(); });

/* FILTER TABS */
const tabs = Array.from(document.querySelectorAll(".tab"));
const cards = Array.from(document.querySelectorAll(".cardx"));

function setTab(name) {
  tabs.forEach(t => t.classList.toggle("is-active", t.dataset.tab === name));
  cards.forEach(c => {
    const cat = c.dataset.cat || "all";
    c.style.display = (name === "all" || cat === name) ? "" : "none";
  });
}

tabs.forEach(t => {
  t.addEventListener("click", () => {
    setTab(t.dataset.tab || "all");
    // clear search so filter feels consistent
    const si = document.getElementById("searchInput");
    if (si) si.value = "";
  });
});

/* SEARCH FILTER */
const searchInput = document.getElementById("searchInput");
searchInput?.addEventListener("input", () => {
  const q = (searchInput.value || "").trim().toLowerCase();
  // keep "All" active while searching
  tabs.forEach(t => t.classList.remove("is-active"));
  tabs.find(t => t.dataset.tab === "all")?.classList.add("is-active");

  cards.forEach(c => {
    const name = (c.dataset.name || "").toLowerCase();
    const cat = (c.dataset.cat || "").toLowerCase();
    const text = (c.innerText || "").toLowerCase();
    const match = !q || name.includes(q) || cat.includes(q) || text.includes(q);
    c.style.display = match ? "" : "none";
  });
});

/* CATEGORY TILE -> sets tab */
document.querySelectorAll(".cat[data-filter]").forEach(a => {
  a.addEventListener("click", () => {
    const f = a.getAttribute("data-filter");
    if (f) setTab(f);
  });
});

/* GALLERY LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

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
lightboxClose?.addEventListener("click", closeLightbox);
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

function stars(n){ return "⭐".repeat(Math.max(0, Math.min(5, n))); }

function renderReview(i){
  rIndex = (i + REVIEWS.length) % REVIEWS.length;
  const r = REVIEWS[rIndex];

  if (reviewCard){
    reviewCard.innerHTML = `
      <div class="review-top">
        <div class="review-name">${r.name}</div>
        <div class="review-stars">${stars(r.stars)}</div>
      </div>
      <p class="review-text">${r.text}</p>
    `;
  }

  if (reviewDots){
    reviewDots.querySelectorAll(".dotbtn").forEach((d, n) => d.classList.toggle("active", n === rIndex));
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

/* IMAGE FALLBACK (hide broken image icons) */
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.opacity = "0";
    const p = img.parentElement;
    if (p) {
      p.style.background = "linear-gradient(135deg, rgba(255,79,163,.16), rgba(143,91,255,.16))";
      p.style.display = p.style.display || "grid";
      p.style.placeItems = "center";
      p.style.minHeight = p.style.minHeight || "190px";
    }
  });
});
