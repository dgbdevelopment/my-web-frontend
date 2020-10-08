let currentQuery;

//scroll de background
const bg = document.getElementById("bg");
function smoothScroll() {
  let totalScroll;
  let initialScroll;
  window.addEventListener("scroll", () => {
    initialScroll = window.pageYOffset;
    totalScroll = document.body.offsetHeight - window.innerHeight;
    let currentScroll = pageYOffset;
    // if (currentScroll >= initialScroll) {
    //   console.log("bajando");
    // } else {
    //   console.log("subiendo");
    // }
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

const blogArticles = document.getElementById("blog__articles");
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
if (blogArticles) {
  fetch("https://admin.dgbdevelopment.com/article/getall")
    .then((result) => result.json())
    .then((data) => {
      renderArticles(data);
    })
    .catch((err) => console.log(err));
}

const blogSelect = document.getElementById("blog__select");
function renderArticles(data) {
  blogArticles.innerHTML = "";
  let template = `
  <h1>Artículos publicados</h1>
  <p style="text-align: center">${data.message || ""}</p>
  <hr>
        `;
  if (data.articles) {
    data.articles.forEach((article) => {
      const articleDate = new Date(article.createdAt);
      template += `
  <div class="article__container">
    <div class="article__top">
      <div class="article__img"><img src="https://admin.dgbdevelopment.com/assets/img/imguploads/${
        article.image
      }"/>
      </div>
      <div class="article__title">
        <h2>${article.title}</h2>
        <h3>${article.subtitle}</h3>
      </div>
    </div>
    <div class="article__description">
      <p>${article.description}</p>
    </div>
    <div class="article__footer"><span class="article__date">${articleDate.getDate()} de ${
        months[articleDate.getMonth()]
      } de ${articleDate.getFullYear()}</span><a class="article__button" href="article.html?${
        article._id
      }">Leer</a></div>
  </div>
          `;
    });
  }
  blogArticles.innerHTML += template;
  if (bg) smoothScroll();
}

const blogArticle = document.getElementById("blog__article");
if (blogArticle) {
  const id = location.search.slice(1);
  let template;
  fetch("https://admin.dgbdevelopment.com/article/getarticle/" + id)
    .then((result) => result.json())
    .then((data) => {
      const article = data.article;
      const articleDate = new Date(article.createdAt);
      template = `
<div class="article__header">
  <div class="article__title">
    <h1>${article.title}</h1>
  </div>
  <div class="article__subtitle">
    <h2>${article.subtitle}</h2>
  </div>
</div>
<div class="article__date">${articleDate.getDate()} de ${
        months[articleDate.getMonth()]
      } de ${articleDate.getFullYear()}
</div>
<div class="article__img">
    <img src="https://admin.dgbdevelopment.com/assets/img/imguploads/${
      article.image
    }" alt="Imagen de cabecera de ${article.title}"/>
</div>
<div class="article__description">${article.description}</div>
<div class="article__content">${article.content}</div>
    `;
      blogArticle.innerHTML = template;
      if (bg) smoothScroll();
    })
    .catch((err) => console.log(err));
}

const blogForm = document.getElementById("blog__form");
if (blogForm) {
  blogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    currentQuery = blogForm.firstElementChild.value;

    fetch("https://admin.dgbdevelopment.com/article/searching/" + currentQuery)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        renderArticles(data);
      })
      .catch(() => {
        renderArticles({ message: "Error al buscar en el servidor" });
      });
    blogForm.firstElementChild.value = "";
    blogForm.firstElementChild.blur();
  });
}

//Articles Query
if (blogSelect) {
  const title = blogSelect.firstElementChild;
  title.addEventListener("click", function (e) {
    this.parentElement.classList.toggle("blog__select--expanded");
  });
  const order = document.querySelectorAll(".select__option");
  order.forEach((elem) => {
    elem.addEventListener("click", () => {
      doQuery(currentQuery, elem.id);
      title.firstElementChild.textContent = elem.firstElementChild.textContent;
      title.parentElement.classList.remove("blog__select--expanded");
    });
  });
}
function doQuery(query, order) {

  fetch(
    `https://admin.dgbdevelopment.com/article/ordering/${order}/${query || ""}`
  )
    .then((result) => result.json())
    .then((data) => {
      renderArticles(data);
    })
    .catch(() => {
      renderArticles({ message: "Error al buscar en el servidor" });
    });
}
