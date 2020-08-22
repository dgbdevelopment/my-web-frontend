document.addEventListener("DOMContentLoaded", typewritter());
const heroButton = document.querySelector(".hero__button");

function typewritter() {
  const typewritter = document.querySelectorAll(".typewritter");
  if (typewritter.length == 0) return;
  type(typewritter);
}

function type(elements, index = 0) {
  let cont = 0;

  if (index == elements.length) {
    heroButton.style.opacity = "1";
    return;
  }

  elements[index].classList.add("typewritter__prompt");

  const text = elements[index].getAttribute("data-text");

  const interval = setInterval(() => {
    let char = text.charAt(cont);
    elements[index].textContent += char;
    cont++;
    if (cont === text.length) {
      clearInterval(interval);
      elements[index].classList.remove("typewritter__prompt");
      type(elements, ++index);
    }
  }, 100);
}
