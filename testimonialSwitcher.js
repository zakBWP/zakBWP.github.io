// testimonialSwitcher.js

import testimonials from "./testimonials.js";

let div, title, subtitle, text, rightArrow, leftArrow, dotContainer

let index = 0
let carouselTimer = null
const DELAY_MS = 5000

function getElements() {
  div = document.querySelector(".testimonials")

  title = div.querySelector(".card__title")
  subtitle = div.querySelector(".card__subtitle")
  text = div.querySelector(".card__text")

  rightArrow = div.querySelector(".arrow--right")
  leftArrow = div.querySelector(".arrow--left")

  dotContainer = div.querySelector(".testimonials__dot-container")

  if (![div, title, subtitle, text, rightArrow, leftArrow].every(Boolean)) {
    throw new Error("Could not find all testimonial card elements, preserving default innerHTML...")
  }

  rightArrow.parentNode.addEventListener("click", () => switchTestimonial(true))
  leftArrow.parentNode.addEventListener("click", () => switchTestimonial(false))
  
  carouselTimer = setInterval(switchTestimonial, DELAY_MS, true)
  addDots()
}

function addDots() {
  for (let i = 0; i < testimonials.length; i++) {

    let newSpan = document.createElement("span")
    newSpan.classList.add("testimonials__dot")

    if (i == 0) newSpan.classList.add("testimonials__dot--active")

    dotContainer.appendChild(newSpan)
  }
}

function switchTestimonial(forward) {

  clearInterval(carouselTimer)
  carouselTimer = setInterval(switchTestimonial, DELAY_MS, true)

  let previousIndex = index

  // Correct for over/underflow
  index = (index + (forward ? 1 : -1) + testimonials.length) % testimonials.length

  console.log("index: ", index)

  title.textContent = testimonials[index].title
  subtitle.textContent = testimonials[index].subtitle
  text.textContent = testimonials[index].text

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

