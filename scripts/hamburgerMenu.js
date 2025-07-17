let navbar, hamburger, list

function getElements() {
  navbar = document.querySelector(".navbar")
  hamburger = navbar.querySelector(".navbar__hamburger")
  list = navbar.querySelector(".navbar__list")
  //products = navbar.querySelector(".navbar__element--products")
  // dropdown = navbar.querySelector(".products-dropdown")

  // hidden = navbar.querySelectorAll(".navbar__link--hidden")

  if (![navbar, hamburger, list].every(Boolean)) {
    throw new Error("Could not find all hamburger menu elements.")
  }

  hamburger.addEventListener("click", toggleMenu)
  
  // products.addEventListener("mouseover", () => {
  //   for (let i = 0; i < hidden.length; i++) {
  //     hidden[i].classList.remove("navbar__link--hidden")
  //   }
  //   console.log(hidden)
  // })

  // products.addEventListener("mouseleave", () => {
  //   for (let i = 0; i < hidden.length; i++) {
  //     hidden[i].classList.add("navbar__link--hidden")
  //   }

  // })


}

function toggleMenu() {
  // if (list.style.display === "none" || !list.style.display) {
  //   list.style.display = "flex"
  // } else {
  //   list.style.display = "none"
  // }
  
  list.classList.toggle("open")

  // if (list.classList.contains("navbar__list-hide")) {
  //   console.log("contains")
  //   list.classList.remove("navbar__list--hide")
  //   list.classList.add("navbar__list--show")
  // } else {
  //   console.log("else")
  //   list.classList.remove("navbar__list--show")
  //   list.classList.add("navbar__list--hide")
  // }

// list.classList.toggle("show")


}

(function() {
  try {
    getElements()
  } catch(error) {
    console.error(error)
    return
  }
})()