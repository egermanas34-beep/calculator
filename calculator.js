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
    const skaicius = button.textContent;
    const PaskutinisSkaicius = screen.value.split(/\^2|lg|[+\-*\/^√⅟]/).pop();
    if (skaicius === ".") {
      if (PaskutinisSkaicius.includes(".")) {
        return;
      }
      if (PaskutinisSkaicius === "") {
        screen.value += "0";
      }
    }

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

    if (screen.value === "" && button.textContent !== "-") {
      return;
    }
    if (button.textContent === "-" && ["+", "*", "/"].includes(lastChar)) {
      screen.value += button.textContent;
      return;
    }
    if (operatorSymbols.includes(lastChar)) {
      // Check if the last character is an operator{
      screen.value = screen.value.slice(0, -1); // Remove the last operator
      screen.value += button.textContent; // Add the new operator
    } else {
      screen.value += button.textContent;
    }
  });
});
const specialOperators = document.querySelectorAll(".special");
specialOperators.forEach(function (button) {
  button.addEventListener("click", function () {
    const lastChar = screen.value.slice(-1);
    const specialOperatorSymbols = ["^2", "^n", "√", "1/x", "lg"];
    if (
      screen.value === "" &&
      button.textContent !== "√" &&
      button.textContent !== "lg" &&
      button.textContent !== "1/x"
    ) {
      return;
    }
    if (specialOperatorSymbols.includes(lastChar)) {
      screen.value = screen.value.slice(0, -1);
      screen.value += button.textContent;
    } else {
      if (button.textContent === "^n") {
        screen.value += "^";
      } else if (button.textContent === "1/x") {
        screen.value += "⅟";
      } else {
        screen.value += button.textContent;
      }
    }
  });
});
const lygu = document.querySelector(".lygu");
lygu.addEventListener("click", function () {
  const tekstas = screen.value;
  const operatorSymbols = ["+", "-", "*", "/"];
  const specialOperatorSymbols = ["^2", "^", "√", "⅟", "lg"];
  const parts = [];
  let number = "";
  const lastChar = screen.value.slice(-1);
  if (tekstas.trim() === "") {
    return;
  }
  if (
    operatorSymbols.includes(lastChar) ||
    specialOperatorSymbols.includes(lastChar) ||
    screen.value.endsWith("lg")
  ) {
    alert("Paskutinis simbolis negali būti operatorius!");
    return;
  }
  for (let i = 0; i < tekstas.length; i++) {
    const char = tekstas[i];
    const prevChar = tekstas[i - 1];
    if (
      (char === "-" &&
        (i === 0 || ["+", "-", "*", "/", "^", "⅟", "√"].includes(prevChar))) ||
      tekstas.slice(0, i).endsWith("lg")
    ) {
      number += char;
      continue;
    }
    if (tekstas.startsWith("lg", i)) {
      if (number !== "") {
        parts.push(Number(number));
        number = "";
      }

      parts.push("lg");
      i++;
      continue;
    }
    if (
      operatorSymbols.includes(char) ||
      specialOperatorSymbols.includes(char)
    ) {
      if (number !== "") {
        parts.push(Number(number));
      }
      // Add the number before the operator
      parts.push(char); // Add the operator
      number = "";
    } else {
      number += char;
    }
  }
  if (number !== "") {
    parts.push(Number(number));
  }
  // Add the last number
  console.log(parts);
  console.log("Pradinis masyvas:", parts);
  let temp = [...parts];
  for (let i = temp.length - 2; i >= 1; i--) {
    if (temp[i] === "^") {
      const left = temp[i - 1];
      const right = temp[i + 1];
      const result = Math.pow(left, right);
      temp.splice(i - 1, 3, result);
      //i = 1; // Move back one index to re-evaluate the new value
    }
  }
  for (let i = 0; i < temp.length; i++) {
    const operator = temp[i];
    if (operator === "^2") {
      const left = temp[i - 1];
      const result = Math.pow(left, 2);
      temp.splice(i - 1, 2, result);
      i = 0; // Move back one index to re-evaluate the new value
    } else if (operator === "√") {
      const right = temp[i + 1];
      if (right < 0) {
        alert("Kvadratinė šaknis iš neigiamo skaičiaus negalima!");
        return;
      }
      const result = Math.sqrt(right);
      if (typeof temp[i - 1] === "number") {
        temp.splice(i, 2, "*", result);
      } else {
        temp.splice(i, 2, result);
      }

      i = 0; // Move back one index to re-evaluate the new value
    } else if (operator === "⅟") {
      const right = temp[i + 1];
      if (right === 0) {
        alert("Dalyba iš nulio negalima!");
        return;
      }
      const result = 1 / right;
      if (typeof temp[i - 1] === "number") {
        temp.splice(i, 2, "*", result);
      } else {
        temp.splice(i, 2, result);
      }
      i = 0; // Move back one index to re-evaluate the new value
    } else if (operator === "lg") {
      const right = temp[i + 1];
      if (right <= 0) {
        alert("Logaritmas iš neigiamo skaičiaus arba nulio negalimas!");
        return;
      }
      const result = Math.log10(right);
      if (typeof temp[i - 1] === "number") {
        temp.splice(i, 2, "*", result);
      } else {
        temp.splice(i, 2, result);
      }
      i = 0; // Move back one index to re-evaluate the new value
    } else {
      continue;
    }
  }
  console.log("Po specialių operacijų:", temp);
  for (let i = 1; i < temp.length; ) {
    const operator = temp[i];
    if (operator === "*" || operator === "/") {
      const left = temp[i - 1];
      const right = temp[i + 1];
      let result;
      if (operator === "*") {
        result = left * right;
      } else if (operator === "/") {
        if (right === 0) {
          alert("Dalyba iš nulio negalima!");
          //screen.value = "Dalyba iš nulio negalima!";
          return;
        } else {
          result = left / right;
        }
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
  if (!Number.isFinite(result)) {
    alert("Rezultatas yra per didelis arba neapibrėžtas!");
    return;
  }
  console.log("Galutinis rezultatas:", result);
  result = Number(result.toFixed(10)); // Round to 10 decimal places
  console.log(result);
  screen.value = result;
});
