const projectsContainer = document.querySelector(".projects__container");

if (projectsContainer) {
  fetch("https://admin.dgbdevelopment.com/project/getall")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const projects = data.projects;
      projects.forEach((project) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card__container");
        let templateButtons;
        if (project.links.length > 2) {
          templateButtons = `
<div class="card__back__buttons">
  <a href="${project.links[0]}" target="_blank"> Ir al sitio</a>
  <a href="${project.links[1]}" target="_blank"> Código frontend</a>
  <a href="${project.links[2]}" target="_blank"> Código backend</a>
</div>
`;
        } else {
          templateButtons = `
<div class="card__back__buttons">
  <a href="${project.links[0]}" target="_blank"> Ir al sitio</a>
  <a href="${project.links[1]}" target="_blank"> Ver código</a>
</div>
`;
        }
        const template = `
<div class="card">
  <div class="card__front">
    <img src="https://admin.dgbdevelopment.com/assets/img/imguploads/${project.image}">
  </div>
  <div class="card__back">
    <div class="card__back__content">
      <h2 class="card__back__title">${project.title}</h2>
      <p class="card__back__description">${project.description}</p>
      <p class="card__back__utils">${project.languages}</p>
      ${templateButtons}
    </div>
  </div>
</div>
`;
        cardContainer.innerHTML = template;

        projectsContainer.appendChild(cardContainer);
      });
    });
}
