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
const lygu = document.querySelector(".lygu");
lygu.addEventListener("click", function () {
  const tekstas = screen.value;
  const operatorSymbols = ["+", "-", "*", "/"];
  const parts = [];
  let number = "";
  for (let i = 0; i < tekstas.length; i++) {
    const char = tekstas[i];
    if (operatorSymbols.includes(char)) {
      parts.push(Number(number)); // Add the number before the operator
      parts.push(char); // Add the operator
      number = "";
    } else {
      number += char;
    }
  }
  parts.push(Number(number)); // Add the last number
  console.log(parts);
  let temp = [...parts];
  for (let i = 1; i < temp.length; ) {
    const operator = temp[i];
    if (operator === "*" || operator === "/") {
      const left = temp[i - 1];
      const right = temp[i + 1];
      let result;
      if (operator === "*") {
        result = left * right;
      }
      if (operator === "/") {
        result = left / right;
      }
      temp.splice(i - 1, 3, result);
      i = 1; // Move back one index to re-evaluate the new value
    } else {
      i += 2;
    }
  }
  let result = temp[0];
  console.log(temp);
  for (let i = 1; i < temp.length; i += 2) {
    const operator = temp[i];
    const right = temp[i + 1];
    if (operator === "+") {
      result += right;
    }
    if (operator === "-") {
      result -= right;
    }
  }
  console.log(result);
  screen.value = result;
});
