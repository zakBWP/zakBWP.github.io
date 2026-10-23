// testimonialSwitcher.js

import testimonials from "../data/testimonials.js";

let carousel, container, rightArrow, leftArrow, dotContainer;

let index = 0;
let carouselTimer = null;
let paused = false;
const DELAY_MS = 7200;
const SWIPE_THRESHOLD_PX = 50;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getElements() {
	carousel = document.querySelector(".testimonials__carousel");
	container = carousel.querySelector(".testimonials__slide-container");
	rightArrow = carousel.querySelector(".arrow--right");
	leftArrow = carousel.querySelector(".arrow--left");
	dotContainer = carousel.querySelector(".testimonials__dot-container");

	if (
		![carousel, container, rightArrow, leftArrow, dotContainer].every(Boolean)
	) {
		throw new Error("Could not find all testimonial slider elements!");
	}

	startTimer();

	addSlides();
	addDots();

	rightArrow.parentNode.addEventListener("click", () =>
		setTestimonial(index + 1)
	);
	leftArrow.parentNode.addEventListener("click", () =>
		setTestimonial(index - 1)
	);

	addSwipe();

	carousel.addEventListener("mouseenter", pause);
	carousel.addEventListener("mouseleave", resume);
	carousel.addEventListener("focusin", pause);
	carousel.addEventListener("focusout", resume);
}

/* Only horizontal swipes change slides, so vertical scrolling doesn't */
function addSwipe() {
	let startX = 0;
	let startY = 0;

	container.addEventListener(
		"touchstart",
		(event) => {
			startX = event.touches[0].clientX;
			startY = event.touches[0].clientY;
		},
		{ passive: true }
	);

	container.addEventListener("touchend", (event) => {
		const deltaX = event.changedTouches[0].clientX - startX;
		const deltaY = event.changedTouches[0].clientY - startY;

		if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
		if (Math.abs(deltaX) < Math.abs(deltaY)) return;

		setTestimonial(deltaX < 0 ? index + 1 : index - 1);
	});
}

function startTimer() {
	stopTimer();
	if (paused || reducedMotion.matches) return;
	carouselTimer = setInterval(() => setTestimonial(index + 1), DELAY_MS);
}

function stopTimer() {
	if (carouselTimer) {
		clearInterval(carouselTimer);
		carouselTimer = null;
	}
}

function pause() {
	paused = true;
	stopTimer();
}

function resume() {
	paused = false;
	startTimer();
}

function resetTimer() {
	startTimer();
}

function addSlides() {
	for (let i = 0; i < testimonials.length; i++) {
		const newSlide = document.createElement("article");
		newSlide.classList.add("testimonials__slide");

		const title = document.createElement("h2");
		title.classList.add("card__title");
		title.textContent = testimonials[i].title;

		const subtitle = document.createElement("h3");
		subtitle.classList.add("card__subtitle");
		subtitle.textContent = testimonials[i].subtitle;

		const text = document.createElement("p");
		text.classList.add("card__text");
		text.textContent = testimonials[i].text;

		newSlide.appendChild(title);
		newSlide.appendChild(subtitle);
		newSlide.appendChild(text);

		if (i === 0) {
			newSlide.classList.add("testimonials__slide--active");
		}

		container.appendChild(newSlide);
	}
}

function addDots() {
	for (let i = 0; i < testimonials.length; i++) {
		const newSpan = document.createElement("span");
		newSpan.classList.add("testimonials__dot");
		newSpan.setAttribute("role", "button");
		newSpan.setAttribute("tabindex", "0");
		newSpan.setAttribute("aria-label", `Go to slide ${i + 1}`);

		if (i === 0) {
			newSpan.classList.add("testimonials__dot--active");
		}

		newSpan.addEventListener("click", () => setTestimonial(i));
		newSpan.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				setTestimonial(i);
			}
		});
		dotContainer.appendChild(newSpan);
	}
}

/* Takes in an index number, can move anywhere */
function setTestimonial(desiredIndex) {
	resetTimer();

	let previousIndex = index;

	if (desiredIndex >= testimonials.length) {
		index = 0;
	} else if (desiredIndex < 0) {
		index = testimonials.length - 1;
	} else {
		index = desiredIndex;
	}

	if (index === previousIndex) return;

	const slides = container.children;
	slides[index].classList.add("testimonials__slide--active");
	slides[previousIndex].classList.remove("testimonials__slide--active");

	const dots = dotContainer.children;
	dots[index].classList.add("testimonials__dot--active");
	dots[previousIndex].classList.remove("testimonials__dot--active");
}

(function () {
	try {
		getElements();
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				stopTimer();
			} else {
				startTimer();
			}
		});
	} catch (error) {
		console.error(error);
		return;
	}
})();
