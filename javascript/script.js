let resultElement = document.querySelector("#result");
let clearBtn = document.querySelector("#clear-button");
let percentageBtn = document.querySelector("#percentage-button");
let deleteBtn = document.querySelector("#delete-button");
let divideBtn = document.querySelector("#divide-button");
let multiplyBtn = document.querySelector("#multiply-button");
let subtractBtn = document.querySelector("#subtract-button");
let addBtn = document.querySelector("#add-button");
let equalBtn = document.querySelector("#equal-button");
let decimalBtn = document.querySelector("#decimal-button");
let numberBtns = document.querySelectorAll(".number");

//step 1  initialize the variable
let result = ""; //all number
let operation = ""; //all operators
let previousOperand = 0;

//step 2 write function to append number
const appendNumber = (number) => {
  //step 6 decimal only 1
  if (number === "." && result.includes(".")) {
    return;
  }
  if (result.length >= 13) return;
  result += number;
  //   step7
  updateDisplay();
};

//step 4 decimal number
decimalBtn.addEventListener("click", () => {
  appendNumber(".");
});

//step7 function to update display
const updateDisplay = () => {
  if (operation && previousOperand !== "") {
    resultElement.innerText = `${previousOperand} ${operation} ${result}`;
  } else if (result !== "") {
    resultElement.innerText = result;
  } else {
    resultElement.innerText = "0";
  }
};

//step 8 function to calculate result
const calculateResult = () => {
  //step 12
  let evaluateResult;
  let prev = parseFloat(previousOperand);
  let current = parseFloat(result);
  // ✅ Handle percent in result step 16.1

  if (result.includes("%")) {
    let percentValue = parseFloat(result.replace("%", ""));
    if (operation === "+" || operation === "-") {
      current = (prev * percentValue) / 100;
    } else if (operation === "*" || operation === "/") {
      current = percentValue / 100;
    } else {
      return;
    }
  } else {
    current = parseFloat(result);
  }

  //parsefloat for decimal value
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      evaluateResult = prev + current;
      break;
    case "-":
      evaluateResult = prev - current;
      break;
    case "*":
      evaluateResult = prev * current;
      break;
    case "/":
      evaluateResult = prev / current;
      break;
    default:
      return;
  }
  result = evaluateResult.toString();
  operation = "";
  previousOperand = "";
};

//step9  function to select operator
const selectOperator = (operatorValue) => {
  if (result === "") return;
  if (operation !== "" && previousOperand !== "") {
    //step 8
    calculateResult();
  }
  operation = operatorValue;
  previousOperand = result;
  result = "";
  updateDisplay();
};

//step3 when we click on btn go through each btn and display on result
numberBtns.forEach((element) => {
  //element all buttons
  element.addEventListener("click", () => {
    appendNumber(element.innerText);
  });
});

//step14 function to clear display
const clearDisplay = () => {
  result = "";
  previousOperand = "";
  operation = "";
  updateDisplay();
};

//step 15 function to delete last digit
const deleteLastDigit = () => {
  if (result !== "") {
    result = result.slice(0, -1);
  }
  if (operation !== "") {
    operation = "";
  }
  updateDisplay();
};

//step 16 and 2 last  step 16.1 calculator fun
percentageBtn.addEventListener("click", () => {
  if (result !== "") {
    // Append % symbol but don’t calculate now
    if (!result.includes("%")) {
      result += "%";
      updateDisplay();
    }
  }
});

// step 10
multiplyBtn.addEventListener("click", () => {
  selectOperator("*");
});
subtractBtn.addEventListener("click", () => {
  selectOperator("-");
});
divideBtn.addEventListener("click", () => {
  selectOperator("/");
});
addBtn.addEventListener("click", () => {
  selectOperator("+");
});

//step 13
equalBtn.addEventListener("click", () => {
  if (result === "") return;
  calculateResult();
  updateDisplay();
});

// step14
clearBtn.addEventListener("click", clearDisplay);
//step 15
deleteBtn.addEventListener("click", deleteLastDigit);

//step 17 last     
const themeBtn = document.getElementById("theme");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeBtn.innerText = "☀️";
  } else {
    themeBtn.innerText = "🌙";
  }
});
