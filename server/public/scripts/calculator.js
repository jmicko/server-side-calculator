module.exports = makeCalculation;



function makeCalculation(input) {
    // set up an array to hold all our numbers, and our operators in an organized way
    const organizedArray = [];
    // set up a variable to keep track of the position in the array.
    // this will change every time an operator is pressed. Concat new 
    // number button presses to current position, and store operators 
    // in between numbers
    let position = 0;
    // loop through each character of the string taken from the input field
    for (let i = 0; i < input.calcString.length; i++) {
        console.log('we are working with', input.calcString[i]);
        const character = input.calcString[i];
        // check if the character is an operator
        if (character == '+' || character == '-' || character == '*' || character == '/') {
            // in the case of an operator, move forward one position in
            // the array so we can store it seperately
            position++;
            // add the opperator to the array
            organizedArray[position] = character;
            // move the position again to start concating the new number
            position++;
        } else{
            if (organizedArray[position]) {
                organizedArray[position] += character;
            } else {
                organizedArray[position] = character;
            }
        }
        console.log('the new array is', organizedArray);
    }
}

// 12+6-87