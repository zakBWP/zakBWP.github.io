// testimonialSwitcher.js

import testimonials from "./testimonials.js";

let div, card, rightArrow, leftArrow, dotContainer

let index = 0
let carouselTimer = null
const DELAY_MS = 7200

function getElements() {
  div = document.querySelector(".testimonials")

  // title = div.querySelector(".card__title")
  // subtitle = div.querySelector(".card__subtitle")
  // text = div.querySelector(".card__text")
  card = div.querySelector(".card--testimonial")

  rightArrow = div.querySelector(".arrow--right")
  leftArrow = div.querySelector(".arrow--left")

  dotContainer = div.querySelector(".testimonials__dot-container")

  if (![div, card, rightArrow, leftArrow, dotContainer].every(Boolean)) {
    throw new Error("Could not find all testimonial card elements, preserving default innerHTML...")
  }

  carouselTimer = setInterval(switchTestimonial, DELAY_MS, true)


  let cards = addCards()

  console.log(cards)

  let dots = addDots()


  rightArrow.parentNode.addEventListener("click", () => switchTestimonial(true))
  leftArrow.parentNode.addEventListener("click", () => switchTestimonial(false))

  div.addEventListener("touchstart", () => switchTestimonial(true))

}

function addCards() {

  let title, subtitle, text

  for (let i = 0; i < testimonials.length; i++) {

    let newCard = document.createElement("article")
    newCard.classList.add("card", "card--testimonial")

    title = newCard.appendChild(document.createElement("h2"))
    title.classList.add("card__title")
    subtitle = newCard.appendChild(document.createElement("h3"))
    subtitle.classList.add("card__subtitle")
    text = newCard.appendChild(document.createElement("p"))
    text.classList.add("card__text")

    title.textContent = testimonials[i].title
    subtitle.textContent = testimonials[i].subtitle
    text.textContent = testimonials[i].textContent

    if (i == 0) newCard.classList.add("card--testimonial--active")
    
    div.appendChild(newCard)
  }

  return div.querySelectorAll(".card, .card--testimonial")
}

function addDots() {
  for (let i = 0; i < testimonials.length; i++) {

    let newSpan = document.createElement("span")
    newSpan.classList.add("testimonials__dot")
    newSpan.style.cursor = "pointer"

    if (i == 0) newSpan.classList.add("testimonials__dot--active")
    
    newSpan.addEventListener("touchstart", () => switchTestimonial(true))

    dotContainer.appendChild(newSpan)
  }

  return dotContainer.children
}

/* Takes in a boolean, can move forward or backward one index */
function switchTestimonial(forward) {

  clearInterval(carouselTimer)
  carouselTimer = setInterval(switchTestimonial, DELAY_MS, true)

  let previousIndex = index

  // Correct for over/underflow
  index = (index + (forward ? 1 : -1) + testimonials.length) % testimonials.length



  title.textContent = testimonials[index].title
  subtitle.textContent = testimonials[index].subtitle
  text.textContent = testimonials[index].text

  let currentDot = dotContainer.children[index]
  currentDot.classList.add("testimonials__dot--active")

  let previousDot = dotContainer.children[previousIndex]
  previousDot.classList.remove("testimonials__dot--active")
}

/* Takes in an index number, can move anywhere */
function setTestimonial(desiredIndex) {

  console.log("Setting testimonial to " + desiredIndex)

  clearInterval(carouselTimer)
  carouselTimer = setInterval(switchTestimonial, DELAY_MS, true)

  let previousIndex = index
  console.log("Previous index: " + previousIndex)
  index = desiredIndex


  title.textContent = testimonials[desiredIndex].title
  subtitle.textContent = testimonials[desiredIndex].subtitle
  text.textContent = testimonials[desiredIndex].text

  let currentDot = dotContainer.children[desiredIndex]
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

