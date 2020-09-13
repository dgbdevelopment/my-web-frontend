//scroll de background
const bg = document.getElementById("bg");
if (bg) {
  let totalScroll = document.body.offsetHeight - window.innerHeight;
  let initialScroll = window.pageYOffset;
  window.addEventListener("scroll", () => {
    let currentScroll = pageYOffset;
    if (currentScroll >= initialScroll) {
      console.log("bajando");
    } else {
      console.log("subiendo");
    }
    placeBg(totalScroll);
    initialScroll = currentScroll;
  });
  window.addEventListener("resize", () => {
    totalScroll = document.body.offsetHeight - window.innerHeight;
    placeBg(totalScroll);
  });
}
function placeBg(totalScroll) {
  bg.style.top = -(((pageYOffset / totalScroll) * bg.offsetHeight) / 2) + "px";
}

//Ordenar búsquedas
const blogSelect = document.getElementById("blog__select");
if (blogSelect) {
  const title = blogSelect.firstElementChild;
  title.addEventListener("click", function () {
    this.parentElement.classList.toggle("blog__select--expanded");
  });
  const order = document.querySelectorAll(".select__option");
  order.forEach((elem) => {
    elem.addEventListener("click", () => {
      doQuery(elem.id);
      title.firstElementChild.textContent = elem.firstElementChild.textContent;
      title.parentElement.classList.remove("blog__select--expanded");
    });
  });
}
function doQuery(order) {
  console.log(order);
}
