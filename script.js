
//check if the content is loaded at first
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById("display");
    let currentNum = '';
    let firstNum = '';
    let secNum = '';
    let operation = '';

//select the boxes containing operations and numbers containing nums and iterate 
    const boxes = document.querySelectorAll('.box, .nums');
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            //anytime these are clicked make sure to get the data value
            const value = box.getAttribute("data-value");
            console.log("Button clicked:", value); // Debugging
//if the value of data value is CE you have to clear everything so reset everything 
            if (value === "ce") {
                // Clear everything
                currentNum = '';
                firstNum = '';
                operation = '';
                secNum = '';
                display.textContent = 0;
//if the value is v (depicting √) then make sure to be able to handle the square root and change the current values
            } else if (value === "v") {
                // Handle square root
                if (currentNum) {
                    const num = parseFloat(currentNum);
                    if (!isNaN(num) && num >= 0) {
                        const result = Math.sqrt(num).toString();
                        display.textContent = result;
                        currentNum = result; // Update currentNum with the result
                    } else {
                        display.textContent = "Error";
                        currentNum = '';
                    }
                }
            } else if (value === "=") {
                // Handle equals
                if (firstNum && operation && currentNum) {
                    secNum = currentNum;
                    const result = calculate(firstNum, operation, secNum);
                    display.textContent = result;
                }
            } else if (["+", "-", "x", "/"].includes(value)) {
                // Handle operations
                if (currentNum) {
                    firstNum = currentNum;
                    operation = value;
                    currentNum = '';
                }
            } else if (!isNaN(value)) {
                // Handle numbers (only if value is a number)
                currentNum += value;
                display.textContent = currentNum;
            }
        });
    });

    function calculate(firstNum, operation, secNum) {
        const num1 = parseFloat(firstNum);
        const num2 = parseFloat(secNum);
        switch (operation) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case 'x': // Use 'x' instead of '*'
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return '0';
        }
    }
});
