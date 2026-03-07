const slides = [
  "images/style1.jpg",
  "images/style2.jpg",
  "images/style3.jpg",
  "images/style4.jpg",
  "images/style5.jpg",
  "images/style6.jpg"
];

let currentSlide = 0;
const slideImage = document.getElementById("slide");

function showSlide(index) {
  currentSlide = index;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  slideImage.src = slides[currentSlide];
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

setInterval(() => {
  nextSlide();
}, 3500);

showSlide(currentSlide);
