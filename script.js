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
  phoneText.textContent = PHONE.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $3 $4");
}
