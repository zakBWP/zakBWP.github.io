let navbar, hamburger, list

function getElements() {
  navbar = document.querySelector(".navbar")
  hamburger = navbar.querySelector(".navbar__hamburger")
  list = navbar.querySelector(".navbar__list")

  if (![navbar, hamburger].every(Boolean)) {
    throw new Error("Could not find all hamburger menu elements.")
  }

  hamburger.addEventListener("click", toggleMenu)
}

function toggleMenu() {
  if (list.style.display === "none") {
    list.style.display = "flex"
  } else {
    list.style.display = "none"
  }
}

(function() {
  try {
    getElements()
  } catch(error) {
    console.error(error)
    return
  }
})()