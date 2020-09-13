window.addEventListener("load", () => {
  const showBorders = document.querySelector(".projects__title");
  if (showBorders) {
    showBorders.classList.add("animated");
    setInterval(createStar, 10);
  }
});

function createStar() {
  const projectsSection = document.querySelector("section.projects");
  const star = document.createElement("span");

  let starSize = Math.floor(Math.random() * 3) + 1;

  star.style.width = starSize + "px";
  star.style.height = starSize + "px";

  star.style.top =
    Math.floor(Math.random() * projectsSection.offsetHeight) + 1 + "px";
  star.style.left =
    Math.floor(Math.random() * projectsSection.offsetWidth) + 1 + "px";
  star.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;

  projectsSection.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 3000);
}
