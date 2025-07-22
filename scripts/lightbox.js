let wrappers, overlay, overlayImage, overlayCaption;

function getElements() {
  wrappers = document.querySelectorAll(".lightbox-wrapper")

  overlay = document.querySelector(".overlay")
  overlayImage = overlay.querySelector(".overlay__photo")
  overlayCaption = overlay.querySelector(".overlay__caption")
  
  if (![wrappers, overlay, overlayImage, overlayCaption].every(Boolean)) {
    throw new Error("Could not find all Lightbox elements!")
  }
  
  let certificatePhoto, certificateSpan

  wrappers.forEach((wrapper) => {

    wrapper.addEventListener("click", () => {
      toggleOverlay()

      certificatePhoto = wrapper.querySelector(".certificate-photo")
      certificateSpan = wrapper.querySelector(".lightbox-filter")

      overlayImage.src = certificatePhoto.src
      overlayImage.alt = certificateSpan.textContent
      overlayCaption.textContent = certificateSpan.textContent
        
    })
  })
  overlay.addEventListener("click", toggleOverlay)
}

function toggleOverlay() {
  console.log("toggling...")
  overlay.classList.toggle("show")
}

(function() {
  try {
    getElements()
  } catch(error) {
    console.error(error)
    return
  }
})()