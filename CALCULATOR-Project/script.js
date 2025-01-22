document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let operator = null;
    let operand1 = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;

            if (value === undefined) {
                // Handle special buttons
                if (button.id === "clear") {
                    currentInput = "";
                    operator = null;
                    operand1 = null;
                    display.textContent = "";
                } else if (button.id === "equals") {
                    if (operator && currentInput) {
                        const operand2 = parseFloat(currentInput);
                        if (operand1 !== null) {
                            let result;
                            switch (operator) {
                                case "+":
                                    result = operand1 + operand2;
                                    break;
                                case "-":
                                    result = operand1 - operand2;
                                    break;
                                case "*":
                                    result = operand1 * operand2;
                                    break;
                                case "/":
                                    result = operand2 !== 0 ? operand1 / operand2 : "Error";
                                    break;
                            }
                            if (typeof result === "number") {
                                result = parseFloat(result.toFixed(5));
                            }
                            display.textContent = result;
                            operand1 = result;
                            currentInput = "";
                            operator = null; // Clear operator after calculation
                        }
                    }
                }
            } else {
                // Handle numeric and operator input
                if (isNaN(value)) {
                    // Operator
                    if (currentInput && operand1 === null) {
                        operand1 = parseFloat(currentInput);
                        operator = value;
                        currentInput = "";
                        display.textContent = `${operand1} ${operator}`; // Update display with operand and operator
                    } else if (operand1 !== null && currentInput) {
                        const operand2 = parseFloat(currentInput);
                        switch (operator) {
                            case "+":
                                operand1 += operand2;
                                break;
                            case "-":
                                operand1 -= operand2;
                                break;
                            case "*":
                                operand1 *= operand2;
                                break;
                            case "/":
                                operand1 = operand2 !== 0 ? operand1 / operand2 : "Error";
                                break;
                        }
                        if (typeof operand1 === "number") {
                            operand1 = parseFloat(operand1.toFixed(5));
                        }
                        operator = value;
                        display.textContent = `${operand1} ${operator}`; // Update display after operation
                        currentInput = "";
                    }
                } else {
                    // Numeric input
                    currentInput += value;
                    if (operator) {
                        display.textContent = `${operand1} ${operator} ${currentInput}`; // Show full expression
                    } else {
                        display.textContent = currentInput; // Show only current input
                    }
                }
            }
        });
    });
});
