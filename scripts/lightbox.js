let wrappers, overlay, overlayImage, overlayCaption, lastFocused;

function getElements() {
	wrappers = document.querySelectorAll(".lightbox-wrapper");

	overlay = document.querySelector(".overlay");
	overlayImage = overlay.querySelector(".overlay__photo");
	overlayCaption = overlay.querySelector(".overlay__caption");

	if (![wrappers, overlay, overlayImage, overlayCaption].every(Boolean)) {
		throw new Error("Could not find all Lightbox elements!");
	}

	let certificatePhoto, certificateSpan;

	wrappers.forEach((wrapper) => {
		wrapper.setAttribute("tabindex", "0");
		wrapper.setAttribute("role", "button");

		const open = () => {
			certificatePhoto = wrapper.querySelector(".certificate-photo");
			certificateSpan = wrapper.querySelector(".lightbox-filter");

			overlayImage.src = certificatePhoto.src;
			overlayImage.alt = certificateSpan.textContent;
			overlayCaption.textContent = certificateSpan.textContent;

			lastFocused = wrapper;
			overlay.classList.add("show");
		};

		wrapper.addEventListener("click", open);
		wrapper.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				open();
			}
		});
	});

	overlay.addEventListener("click", closeOverlay);
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeOverlay();
	});
}

function closeOverlay() {
	if (!overlay.classList.contains("show")) return;
	overlay.classList.remove("show");
	if (lastFocused) lastFocused.focus();
}

(function () {
	try {
		getElements();
	} catch (error) {
		console.error(error);
		return;
	}
})();
