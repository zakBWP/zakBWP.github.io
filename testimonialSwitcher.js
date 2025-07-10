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

  carouselTimer = setInterval(() => setTestimonial(index + 1), DELAY_MS, true)

  addSlides()
  addDots()

  rightArrow.parentNode.addEventListener("click", () => setTestimonial(index + 1))
  leftArrow.parentNode.addEventListener("click", () => setTestimonial(index - 1))

  container.addEventListener("touchstart", () => setTestimonial(index + 1))

}

function addSlides() {

  let title, subtitle, text

  for (let i = 0; i < testimonials.length; i++) {

    let newSlide = document.createElement("article")
    newSlide.classList.add("testimonials__slide")

    title = newSlide.appendChild(document.createElement("h2"))
    title.classList.add("card__title")
    title.textContent = testimonials[i].title

    subtitle = newSlide.appendChild(document.createElement("h3"))
    subtitle.classList.add("card__subtitle")
    subtitle.textContent = testimonials[i].subtitle

    text = newSlide.appendChild(document.createElement("p"))
    text.classList.add("card__text")
    text.textContent = testimonials[i].text

    if (i == 0) newSlide.classList.add("testimonials__slide--active")
    
    container.appendChild(newSlide)
  }

  return container.querySelectorAll(".testimonials__slide")
}

function addDots() {
  for (let i = 0; i < testimonials.length; i++) {

    let newSpan = document.createElement("span")
    newSpan.classList.add("testimonials__dot")

    if (i == 0) newSpan.classList.add("testimonials__dot--active")
    
    newSpan.addEventListener("click", () => setTestimonial(i))

    dotContainer.appendChild(newSpan)
  }

  return dotContainer.children
}

/* Takes in an index number, can move anywhere */
function setTestimonial(desiredIndex) {

  clearInterval(carouselTimer)
  carouselTimer = setInterval(() => setTestimonial(index + 1), DELAY_MS, true)

  let previousIndex = index

  if (desiredIndex >= testimonials.length) {
    index = 0
  } else if (desiredIndex < 0) {
    index = testimonials.length - 1
  } else {
    index = desiredIndex
  }

  let currentSlide = container.children[index]
  currentSlide.classList.add("testimonials__slide--active")

  let previousSlide = container.children[previousIndex]
  previousSlide.classList.remove("testimonials__slide--active")

  let currentDot = dotContainer.children[index]
  currentDot.classList.add("testimonials__dot--active")

  let previousDot = dotContainer.children[previousIndex]
  previousDot.classList.remove("testimonials__dot--active")
}

(function() {
  try {
    getElements()
  } catch(error) {
    console.error(error)
    return
  }
})()

