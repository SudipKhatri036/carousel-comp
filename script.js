"use strict";

const slides = document.querySelectorAll(".slide");
const nextSlideBtn = document.querySelector(".next-slide");
const prevSlideBtn = document.querySelector(".prev-slide");
const bulletBtnCont = document.querySelector(".slide__bullet-cont");
const slideBulletBtn = document.querySelectorAll(".bullet-btn");

let currentSlide = 0;
let maxSlide = slides.length;

function createDots() {
  slides.forEach((_, i) => {
    bulletBtnCont.insertAdjacentHTML(
      "beforeend",
      `<button class="bullet-btn" data-slide="${i}">
        <i class="fa-regular fa-circle"></i>
       </button>`
    );
  });
}

const activateDot = function (slide) {
  document
    .querySelectorAll(".bullet-btn")
    .forEach((bullet) => bullet.classList.remove("active"));

  document
    .querySelector(`.bullet-btn[data-slide="${slide}"]`)
    .classList.add("active");
};

function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function nextSlide() {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
}

function init() {
  goToSlide(0);
  createDots();
  activateDot(0);
}

init();

nextSlideBtn.addEventListener("click", nextSlide);
prevSlideBtn.addEventListener("click", prevSlide);
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

bulletBtnCont.addEventListener("click", (e) => {
  const clickedBtn = e.target.closest(".bullet-btn");

  if (!clickedBtn) return;

  goToSlide(clickedBtn.dataset.slide);
  activateDot(clickedBtn.dataset.slide);
});
