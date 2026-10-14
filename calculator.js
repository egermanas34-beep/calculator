const daugiau = document.querySelector(".daugiau");
const daugiauMygtukai = document.querySelector(".daugiau-mygtukai");
const calculator = document.querySelector(".calculator");

daugiau.addEventListener("click", function () {
  daugiauMygtukai.classList.toggle("rodyti");
  calculator.classList.toggle("platus");

  if (calculator.classList.contains("platus")) {
    daugiau.textContent = "Mažiau";
  } else {
    daugiau.textContent = "Daugiau";
  }
});
