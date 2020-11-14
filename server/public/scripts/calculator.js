module.exports = makeCalculation;



function makeCalculation(input) {
    console.log('here is the input for the makeCalculation function', input);
    const organizedArray = organize(input)
    console.log('after we organize the array it looks like this:\n', organizedArray);
    let answer = pemdas(organizedArray);

}

// 12+6-87

function pemdas(array) {
    console.log('we are running pemdas on this array:\n', array);
    // make an array with the order of operations. 
    const PEMDAS = [ '*', '/', '+', '-', ];
    // loop through PEMDAS checking our input array for the apropriate operator
    for (let i = 0; i < PEMDAS.length;) {
        // set up our test function to compare array elements to an operator
        const operator = (element) => element == PEMDAS[i];
        // if the operator is found, perform the operation
        if (array.findIndex(operator) != -1) {
            console.log('i found this operator', PEMDAS[i]);
            console.log('here is the position of the operator:', array.findIndex(operator));
        }
        i++
    }
    // then search and calculate for + and -, the same way as above

}

function organize(input) {
    console.log('the input for the organize function is:\n', input);
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
    return organizedArray;
}