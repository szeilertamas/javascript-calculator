document.addEventListener("DOMContentLoaded", function () {
  clearDisplay();
});

let currentInput = "0";

function clearDisplay() {
  currentInput = "0";
  updateDisplay(currentInput);
}

function updateDisplay(value) {
  document.getElementById("display").innerHTML = value;
}

function getLastChar(display) {
  return display.slice(-1);
}

function displayNumber(number) {
  if (currentInput === "0" || getLastChar(currentInput) === "=") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay(currentInput);
}

function addOperation(operation) {
  const lastChar = getLastChar(currentInput);

  if (
    operation === "-" &&
    (lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "*" ||
      lastChar === "/")
  ) {
    currentInput += operation;
  } else if (
    lastChar === "+" ||
    lastChar === "-" ||
    lastChar === "*" ||
    lastChar === "/"
  ) {
    if (operation === "-") {
      currentInput += operation;
    } else {
      currentInput = currentInput.replace(/[\+\-\*\/]+$/, operation);
    }
  } else {
    currentInput += operation;
  }

  updateDisplay(currentInput);
}

function calculateResult() {
  const result = Function("return " + currentInput)();
  currentInput = result.toString();
  updateDisplay(currentInput);
}

function addDecimal(decimal) {
  const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
  if (lastNumber.indexOf(".") === -1) {
    currentInput += decimal;
    updateDisplay(currentInput);
  }
}
