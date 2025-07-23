window.addEventListener("load", () => {
  const scroller = document.querySelector(".scroller");
  const inner = scroller.querySelector(".scroller__inner");
  const content = Array.from(inner.children);

  for (let i = 0; i < content.length; i++) {
    const item = content[i];
    const duplicatedItem = item.cloneNode(true);
    duplicatedItem.setAttribute("aria-hidden", true);
    inner.appendChild(duplicatedItem);
  }

  // Force reflow & restart animation
  inner.style.animation = "none";
  inner.offsetHeight;
  inner.style.animation = "";
});
