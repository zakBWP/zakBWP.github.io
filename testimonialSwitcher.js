// testimonialSwitcher.js

import testimonials from "./testimonials.js";

let carousel, container, rightArrow, leftArrow, dotContainer

let index = 0
let carouselTimer = null
const DELAY_MS = 7200

function getElements() {
  carousel = document.querySelector(".testimonials__carousel")
  container = carousel.querySelector(".testimonials__slide-container")
  rightArrow = carousel.querySelector(".arrow--right")
  leftArrow = carousel.querySelector(".arrow--left")
  dotContainer = carousel.querySelector(".testimonials__dot-container")

  if (![carousel, container, rightArrow, leftArrow, dotContainer].every(Boolean)) {
    throw new Error("Could not find all testimonial Slide elements, preserving default innerHTML...")
  }

  startTimer()

  addSlides()
  addDots()

  rightArrow.parentNode.addEventListener("click", () => setTestimonial(index + 1))
  leftArrow.parentNode.addEventListener("click", () => setTestimonial(index - 1))

  container.addEventListener("touchstart", () => setTestimonial(index + 1))
}

function startTimer() {
  carouselTimer = setInterval(() => setTestimonial(index + 1), DELAY_MS)
}

function resetTimer() {
  if (carouselTimer) {
    clearInterval(carouselTimer)
  }
  startTimer()
}

function addSlides() {
  for (let i = 0; i < testimonials.length; i++) {
    const newSlide = document.createElement("article");
    newSlide.classList.add("testimonials__slide");

    const title = document.createElement("h2");
    title.classList.add("card__title");
    title.textContent = testimonials[i].title;

    const subtitle = document.createElement("h3");
    subtitle.classList.add("card__subtitle");
    subtitle.textContent = testimonials[i].subtitle;

    const text = document.createElement("p");
    text.classList.add("card__text");
    text.textContent = testimonials[i].text;

    newSlide.appendChild(title);
    newSlide.appendChild(subtitle);
    newSlide.appendChild(text);

    if (i === 0) {
      newSlide.classList.add("testimonials__slide--active");
    }
    
    container.appendChild(newSlide);
  }
}

function addDots() {
  for (let i = 0; i < testimonials.length; i++) {
    const newSpan = document.createElement("span");
    newSpan.classList.add("testimonials__dot");
    newSpan.setAttribute("aria-label", `Go to slide ${i + 1}`);

    if (i === 0) {
      newSpan.classList.add("testimonials__dot--active");
    }
    
    newSpan.addEventListener("click", () => setTestimonial(i));
    dotContainer.appendChild(newSpan);
  }
}

/* Takes in an index number, can move anywhere */
function setTestimonial(desiredIndex) {

  resetTimer()

  let previousIndex = index

  if (desiredIndex >= testimonials.length) {
    index = 0
  } else if (desiredIndex < 0) {
    index = testimonials.length - 1
  } else {
    index = desiredIndex
  }

  if (index === previousIndex) return

  const slides = container.children
  slides[index].classList.add("testimonials__slide--active")  
  slides[previousIndex].classList.remove("testimonials__slide--active")

  const dots = dotContainer.children
  dots[index].classList.add("testimonials__dot--active")
  dots[previousIndex].classList.remove("testimonials__dot--active")
}

(function() {
  try {
    getElements()
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (carouselTimer) {
          clearInterval(carouselTimer)
        }
      } else {
        startTimer()
      }
    })

  } catch(error) {
    console.error(error)
    return
  } 
})()