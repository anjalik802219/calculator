// Selecting all elements needed
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let displayValue = '';  // Stores the value to be displayed
let currentOperator = '';  // Stores the current operator
let firstOperand = null;  // Stores the first operand
let secondOperand = null;  // Stores the second operand

// Event listener for each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the button's dataset values (number or operator)
        const { number, operator } = button.dataset;

        if (number !== undefined) {
            // If it's a number, append it to the display value
            displayValue += number;
            updateDisplay(displayValue);
        }

        if (operator !== undefined) {
            // If it's an operator, set the currentOperator and firstOperand
            if (firstOperand === null) {
                firstOperand = parseFloat(displayValue);
            } else if (currentOperator) {
                // If we already have a first operand, calculate the result for continuous operations
                secondOperand = parseFloat(displayValue);
                firstOperand = calculate(firstOperand, secondOperand, currentOperator);
            }
            currentOperator = operator;
            displayValue = '';  // Reset display value for next operand input
        }

        if (button.id === 'clear') {
            clearCalculator();
        }

        if (button.id === 'delete') {
            deleteLastEntry();
        }

        if (button.id === 'equal') {
            // Calculate the result when equal is pressed
            secondOperand = parseFloat(displayValue);
            displayValue = calculate(firstOperand, secondOperand, currentOperator).toString();
            updateDisplay(displayValue);
            resetCalculator();  // Reset for a new calculation
        }
    });
});

// Function to update the display
function updateDisplay(value) {
    display.innerText = value || '0';
}

// Function to perform calculation
function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? 'Error' : a / b;
        case '%':
            return a % b;
        default:
            return b;
    }
}

// Function to clear calculator state
function clearCalculator() {
    displayValue = '';
    firstOperand = null;
    secondOperand = null;
    currentOperator = '';
    updateDisplay('0');
}

// Function to delete the last entry
function deleteLastEntry() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay(displayValue);
}

// Function to reset calculator for a new calculation
function resetCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = '';
}
