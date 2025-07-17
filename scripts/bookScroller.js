const scroller = document.querySelector(".scroller")
const inner = scroller.querySelector(".scroller__inner")

const scrollerChildren = Array.from(inner.children);

for (let i = 0; i < scrollerChildren.length; i++) {
  const item = inner.children[i]
  const duplicatedItem = item.cloneNode(true);
  inner.appendChild(duplicatedItem);
}