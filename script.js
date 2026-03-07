const PHONE = "0720654503";
const WHATSAPP_NUMBER = "27" + PHONE.replace(/^0/, "");
const BUSINESS_NAME = "Mira’s Beauty Braids";
const DEFAULT_MAP_QUERY = "Welverdiend";

const msg =
  `Hi ${BUSINESS_NAME}! 👋%0A` +
  `I want to book braids.%0A%0A` +
  `Style: %0A` +
  `Length: %0A` +
  `Date/Time: %0A%0A` +
  `Please confirm availability and total price. Thank you!`;

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
const callLink = `tel:${PHONE}`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DEFAULT_MAP_QUERY)}`;

document.getElementById("year").textContent = new Date().getFullYear();

["whatsBtnTop", "whatsBtnHero", "whatsBtnContact"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = waLink;
});

const callBtn = document.getElementById("callBtn");
if (callBtn) callBtn.href = callLink;

const mapsBtn = document.getElementById("mapsBtn");
if (mapsBtn) mapsBtn.href = mapsLink;

const phoneText = document.getElementById("phoneText");
if (phoneText) {
  phoneText.textContent = PHONE.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}

/* slideshow */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot-item");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let autoSlide;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    restartAutoSlide();
  });
});

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

showSlide(0);
startAutoSlide();
