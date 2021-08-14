/**
 * A simple calculator app. Created by @lintu22
 * Takes two inputs and can either add, subtract, multiply or divide
 * Works with decimals and can be cleared to 0
 * TODO (KNOWN ISSUES)
 * handle multiple multiplications, deal with large numbers (10+), add a percentage function
 */

// (function App () {

// Element variables for use in the app
const calculator = document.querySelector('.calculator');
const output = document.querySelector('.calculator__output');
const buttons = document.querySelectorAll('.calculator__button');
// Data variables for storing info
let input = '';
let firstInput = ''; 
let operator = '';
let decimalCount = 0;
// let storage = [];
// let calculatedValue;

/**
 * A function to calculate given values
 *
 * @param {number} input1 - first input given, stored in firstInput
 * @param {string} action - which operator to calculate with, e.g. 'add'
 * @param {number} input2 - second input given, store in input
 * @return {string} - calculated output
 *
 * @example
 *    calculate('25', 'multiply', '100')
 */

function calculate(input1, action, input2) {

    // Parse string to number
    input1 = parseFloat(input1);
    input2 = parseFloat(input2);
    let result;

    switch (action) {
        case 'add': 
            result = input1 + input2;
            break;
        case 'subtract': 
            result = input1 - input2;
            break;
        case 'multiply':
            result = input1 * input2;
            break;
        case 'divide':
            result = input1 / input2;
            break;
        default:
            result = 0;
    }
    return output.textContent = result;
}

// 1. Recieve an input from a button click

buttons.forEach(button => button.addEventListener('click', function() {
    
    // 2. Display what was pressed on the display output (can't be an operator, only numbers, decimals and negative)

    if (!('operator' in button.dataset)) {
        if (calculator.dataset.prevButton === 'operator' || calculator.dataset.prevButton === 'calculate') {
            input = '';
            decimalCount = 0;
            output.textContent = '0';
        }
       
        // Add prev-button data to calculator element
        calculator.dataset.prevButton = 'number';

        // Check if there is a decimal place already, if there is, don't add another
        if (button.textContent === '.' && decimalCount > 0) {
            return;
        } else if (button.textContent === '.') {
           decimalCount ++;
        }  
        // If the button is aleady on 0, don't add another 0
        if (output.textContent === '0' && button.textContent === '0') {
            return;
        }
        // recieve's the input from the button and displays to output display
        input += button.textContent;
        output.textContent = input;
            
    }

    // functionality for operatore buttons (add, subtract, multiply, divide, clear, calculate)

    if ('operator' in button.dataset) {
        
        // If clear button is clicked clear all inputs and return to 0
        if (button.dataset.operator === 'clear') {
            calculator.dataset.prevButton = 'clear';
            input = '';
            output.textContent = '0';
            firstInput = '';
            console.info('Cleared.');
            return;
        } 
        // If one of the math operators is pressed, store the first input and operator pressed
        if ( button.dataset.operator === 'add' || button.dataset.operator === 'subtract' || button.dataset.operator === 'multiply' || button.dataset.operator === 'divide' ) {
            calculator.dataset.prevButton = 'operator';
            firstInput = input;
            operator = button.dataset.operator;
        }
        // if the calculate button is pressed, do the maths
         if (button.dataset.operator === 'calculate') {
            calculator.dataset.prevButton = 'calculate';
            calculate(firstInput, operator, input);
        } 

    }

}))

// })();
