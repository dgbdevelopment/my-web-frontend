const inputbox = document.getElementById("email");
if (inputbox) {
  inputbox.addEventListener("focus", (e) => {
    e.target.classList.add("form__input--selected");
  });
  inputbox.addEventListener("blur", (e) => {
    if (e.target.value != 0) return;
    e.target.classList.remove("form__input--selected");
  });
}
const message = document.getElementById("message");
if (message) {
  message.addEventListener("focus", (e) => {
    e.target.classList.add("form__textarea--selected");
  });
  message.addEventListener("blur", (e) => {
    if (e.target.value != 0) return;
    e.target.classList.remove("form__textarea--selected");
  });
}
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  let sending = false;
  const loader = document.getElementById("loader");
  const resultText = document.getElementById("result-text");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    resultText.style.color = "#dadada";
    if (sending) return;
    sending = true;
    loader.classList.add("loader--show");
    resultText.textContent = "Enviando...";
    if (!event.target.email.value || !event.target.message.value) {
      loader.classList.remove("loader--show");
      resultText.textContent = "Email y Mensaje son campos obligatorios";
      resultText.style.color = "red";
      sending = false;
      return;
    }
    fetch(event.target.action, {
      method: "POST",
      body: new URLSearchParams(new FormData(event.target)),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        loader.classList.remove("loader--show");
        resultText.textContent = data.message;
        const color = data.color == "green" ? "#00adb4" : "red";
        resultText.style.color = color;
        sending = false;
      })
      .catch((error) => {
        loader.classList.remove("loader--show");
        resultText.textContent = "Ha ocurrido un error";
        resultText.style.color = "red";
        sending = false;
      });
  });
}
