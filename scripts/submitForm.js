const button = document.getElementById("submit-contact") || document.getElementById("submit-quote")
const form = document.getElementById("contact-form") || document.getElementById("quote-form")
const isQuote = (form.id === "quote-form")

async function sendRequest(event) {
  event.preventDefault()
  button.textContent = "Sending..."

  const formData = new FormData(form)
  formData.append("access_key", "277083ff-40aa-4832-8d8d-9ab556eddef0")
  formData.append("subject", isQuote ? "Quote Request from cruisebooksource.com" : "Message from cruisebooksource.com")
  formData.append("from_name", "Cruisebook Source")

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })

  if (!response.ok) {
    throw new Error("Error with Web3Forms response: " + response.status )
  }

  const data = await response.json()

  if (data.success) {
    button.textContent = (isQuote ? "Quote request sent successfully" : "Message sent successfully")
    form.reset()
    button.style.backgroundColor = "green"
  } else {
    console.error("Error", data)
    button.textContent = data.message || "An error occurred, please try again."
    button.style.backgroundColor = "red"
  }
}

form.addEventListener("submit", sendRequest)
 