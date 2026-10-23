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

	if (button.disabled) return;
	button.disabled = true;
	button.textContent = "Sending...";
	button.style.backgroundColor = "";

	const formData = new FormData(form);
	formData.append("access_key", "37e482f7-72f0-4a74-8d1a-9c782c403d1d");

	const name = formData.get("Name");

	formData.append(
		"subject",
		isQuote ? `Quote Request from ${name}` : `Message from ${name}`,
	);
	formData.append("from_name", "Cruisebook Source");

	try {
		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			body: formData,
		});

		const data = await response.json().catch(() => ({}));

		if (!response.ok || !data.success) {
			throw new Error(
				data.message || "Error with Web3Forms response: " + response.status,
			);
		}

		button.textContent = isQuote
			? "Quote request sent successfully"
			: "Message sent successfully";
		form.reset();
		button.style.backgroundColor = "green";
	} catch (error) {
		console.error(error);
		button.textContent =
			"Could not send. Please try again or email support@cruisebooksource.com";
		button.style.backgroundColor = "red";
	} finally {
		button.disabled = false;
	}
}

form.addEventListener("submit", sendRequest);
