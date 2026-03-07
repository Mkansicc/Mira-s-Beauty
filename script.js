const PHONE = "0720654503";
const WHATSAPP_NUMBER = "27" + PHONE.replace(/^0/, "");
const BUSINESS_NAME = "Mira’s Beauty Braids";

const msg =
  `Hi ${BUSINESS_NAME}! 👋%0A` +
  `I want to book braids.%0A%0A` +
  `Style: %0A` +
  `Length: %0A` +
  `Date/Time: %0A%0A` +
  `Please confirm availability and total price. Thank you!`;

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

document.getElementById("year").textContent = new Date().getFullYear();

["whatsBtnTop", "whatsBtnHero", "whatsBtnContact"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = waLink;
});

const phoneText = document.getElementById("phoneText");
if (phoneText) {
  phoneText.textContent = PHONE.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}

/* price tabs */
const priceTabs = document.querySelectorAll(".price-tab");
const tabPanels = document.querySelectorAll(".tab-panel");

priceTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    priceTabs.forEach(t => t.classList.remove("active"));
    tabPanels.forEach(panel => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

/* slideshow */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;
let auto;

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  if (index >= slides.length) current = 0;
  else if (index < 0) current = slides.length - 1;
  else current = index;

  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

function nextSlide() {
  showSlide(current + 1);
}

function prevSlide() {
  showSlide(current - 1);
}

function startAuto() {
  auto = setInterval(nextSlide, 3000);
}

function restartAuto() {
  clearInterval(auto);
  startAuto();
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAuto();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAuto();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    restartAuto();
  });
});

showSlide(0);
startAuto();
