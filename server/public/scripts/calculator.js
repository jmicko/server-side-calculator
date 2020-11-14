module.exports = makeCalculation;

// set up an array to hold all our numbers, and our operators
const inputArray = [];
// set up a variable to keep track of the position in the array.
// this will change every time an operator is pressed. Concat new 
// number button presses to current position, and store operators 
// in between numbers
let position = 0;


function makeCalculation(input) {
    for (let i = 0; i < input.calcString.length; i++) {
        console.log('we are working with', input.calcString[i]);
        const character = input.calcString[i];

        }
    }
}