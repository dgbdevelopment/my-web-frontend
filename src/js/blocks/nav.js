const nav = document.querySelector(".nav");
const marker = document.getElementById("marker");
const links = document.querySelectorAll(".main-menu__link");
const active = document.querySelector(".main-menu__link--active");

document.addEventListener("DOMContentLoaded", () => {
  underline(active);
  window.addEventListener("resize", () => {
    underline(active);
  });
});

const underline = (element) => {
  marker.style.left = element.offsetLeft + "px";
  marker.style.width = element.offsetWidth + "px";
};

links.forEach((link) => {
  link.addEventListener("mouseover", (e) => {
    underline(e.target);
  });
});

nav.addEventListener("mouseleave", () => {
  underline(active);
});
