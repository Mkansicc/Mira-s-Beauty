const slides = [
  "images/style1.jpg",
  "images/style2.jpg",
  "images/style3.jpg",
  "images/style4.jpg",
  "images/style5.jpg",
  "images/style6.jpg"
];

let currentIndex = 0;
const mainSlide = document.getElementById("mainSlide");

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  mainSlide.src = slides[currentIndex];
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function setSlide(index) {
  showSlide(index);
}

setInterval(() => {
  nextSlide();
}, 4000);
