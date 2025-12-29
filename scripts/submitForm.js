// submitForm.js

const button =
	document.getElementById("submit-contact") ||
	document.getElementById("submit-quote");
const form =
	document.getElementById("contact-form") ||
	document.getElementById("quote-form");
const isQuote = form.id === "quote-form";

async function sendRequest(event) {
	event.preventDefault();
	button.textContent = "Sending...";

	const formData = new FormData(form);
	formData.append("access_key", "37e482f7-72f0-4a74-8d1a-9c782c403d1d");

	const name = formData.get("name");

	formData.append(
		"subject",
		isQuote ? `Quote Request from ${name}` : `Message from ${name}`,
	);
	formData.append("from_name", "Cruisebook Source");

	const response = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Error with Web3Forms response: " + response.status);
	}

	const data = await response.json();

	if (data.success) {
		button.textContent = isQuote
			? "Quote request sent successfully"
			: "Message sent successfully";
		form.reset();
		button.style.backgroundColor = "green";
	} else {
		console.error("Error", data);
		button.textContent = data.message || "An error occurred, please try again.";
		button.style.backgroundColor = "red";
	}
}

form.addEventListener("submit", sendRequest);
