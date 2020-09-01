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
