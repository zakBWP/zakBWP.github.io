const submitButton = document.getElementById("submitContact") || document.getElementById("submitQuote")

const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  submitButton.textContent = "Sending..."

  const formData = new FormData(contactForm)
  formData.append("access_key", "277083ff-40aa-4832-8d8d-9ab556eddef0")
  
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })

const data = await response.json()

  if (data.success) {
    submitButton.textContent = "Message Sent Successfully"
    contactForm.reset()
    submitButton.style.backgroundColor = "green"
  } else {
    console.error("Error", data)
    submitButton.textContent = data.message || "An error occurred"
    submitButton.style.backgroundColor = "red"
  }

})