
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const backspace = document.getElementById("backspace");

let firstOperand = "";
let secondOperand = "";
let storedOperator = null;
let isEnteringSecond = false;


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value") || button.textContent;

        if (value === "AC") {
            clearDisplay();
        } else if (value === "=") {
            calculateResult();
        } else if (value === "±") {
            toggleSign();
        } else if (value === "%") {
            calculatePercentage();
        } else if (["+", "-", "x", "÷"].includes(value)) {
            handleOperator(value);
        } else {
            appendToDisplay(value);
        }
    });
});


function appendToDisplay(value) {
    const digitCount = display.innerHTML.replace(/[^0-9]/g, "").length;

    if (digitCount >= 10 && /[0-9]/.test(value)) return;

    if (!isEnteringSecond) {
        firstOperand += value;
        display.innerHTML = firstOperand;
    } else {
        secondOperand += value;
        display.innerHTML = secondOperand;
    }
}

function handleOperator(operator) {
    storedOperator = operator;
    isEnteringSecond = true;
    console.log(`Stored operator: ${operator}`);
}

function calculateResult() {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    if (isNaN(num1) || isNaN(num2)) {
        display.innerHTML = "Error";
        return;
    }

    let result;

    switch (storedOperator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 === 0 ? "Err" : num1 / num2;
            break;
        default:
            result = "Error";
    }
    

    display.innerHTML = result;
    firstOperand = result.toString();
    secondOperand = "";
    storedOperator = null;
    isEnteringSecond = false;
}


function clearDisplay() {
    display.innerHTML = "0";
    firstOperand = "";
    secondOperand = "";
    storedOperator = null;
    isEnteringSecond = false;

    console.log("Display and memory cleared");
}


function toggleSign() {
    if (display.innerHTML !== "0") {
        display.innerHTML = display.innerHTML.startsWith("-")
            ? display.innerHTML.slice(1)
            : "-" + display.innerHTML;
        console.log(`Toggled sign: ${display.innerHTML}`);
    }
}


function calculatePercentage() {
    try {
        const result = parseFloat(display.innerHTML) / 100;
        display.innerHTML = result.toString();
        console.log(`Percentage: ${result}`);
    } catch (error) {
        console.error("Invalid percentage calculation");
    }
}


backspace.addEventListener("click", () => {
    if (display.innerHTML.length > 1) {
        display.innerHTML = display.innerHTML.slice(0, -1);
    } else {
        display.innerHTML = "0";
    }
    console.log(`Backspace Result: ${display.innerHTML}`);
});
