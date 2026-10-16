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

const screen = document.querySelector(".calculator-screen");
const numbers = document.querySelectorAll(".skaicius");

numbers.forEach(function (button) {
  button.addEventListener("click", function () {
    //console.log(button.textContent);
    screen.value += button.textContent;
  });
});

const clear = document.querySelector(".mygtukas-clear");
clear.addEventListener("click", function () {
  screen.value = "";
});

const operators = document.querySelectorAll(".operator");
operators.forEach(function (button) {
  button.addEventListener("click", function () {
    const lastChar = screen.value.slice(-1);
    const operatorSymbols = ["+", "-", "*", "/"];

    if (screen.value === "") {
      return;
    }
    if (operatorSymbols.includes(lastChar)) {
      screen.value = screen.value.slice(0, -1);
      screen.value += button.textContent;
    } else {
      screen.value += button.textContent;
    }
  });
});
