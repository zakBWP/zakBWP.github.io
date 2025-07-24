let dropdown, quoteForm, certForm, bookForm, submitButton, inputs;

function getElements() {
	dropdown = document.getElementById("item-select");
	quoteForm = document.getElementById("quote-form");
	certForm = document.getElementById("quote-form--certificate");
	bookForm = document.getElementById("quote-form--cruisebook");
	submitButton = document.getElementById("submit-quote");
	inputs = quoteForm.querySelectorAll("input, select");

	if (![dropdown, certForm, bookForm, submitButton, inputs].every(Boolean)) {
		throw new Error("Could not find all quote request dropdown elements!");
	}

	dropdown.addEventListener("change", handleChange);
}

function resetAllFields() {
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].disabled = false;
	}
}

function disableInvisibleFields() {
	for (let i = 0; i < inputs.length; i++) {
		if (!inputs[i].checkVisibility()) {
			inputs[i].disabled = true;
		}
	}
}

function show(element) {
	element.classList.remove("hide");
	element.classList.add("show");
}

function hide(element) {
	element.classList.remove("show");
	element.classList.add("hide");
}

function handleChange(event) {
	let choice = event.target.value;

	resetAllFields();

	show(quoteForm);
	quoteForm.appendChild(submitButton);

	switch (choice) {
		case "cruisebook":
			show(bookForm);
			hide(certForm);
			break;

		case "certificate":
			show(certForm);
			hide(bookForm);
			break;

		default:
			throw new Error(
				"An unexpected error has occurred while selecting quote form dropdown."
			);
	}

	disableInvisibleFields();
}

(function () {
	try {
		getElements();
	} catch (error) {
		console.error(error);
		return;
	}
})();
