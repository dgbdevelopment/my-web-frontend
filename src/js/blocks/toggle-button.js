const toggleMenu = document.getElementById("toggle-menu");
const nav = document.querySelector(".nav");

toggleMenu.addEventListener("click", (ev) => {
  toggleMenu.classList.toggle("show");
  // esta constante nav ya está declarada en nav.js
  nav.classList.toggle("nav--show");
});
