module.exports = makeCalculation;


// the input will be a string from the text input
function makeCalculation(input) {
    console.log('here is the input for the makeCalculation function', input);
    // organize the string to seperate the numbers from the operators
    const organizedArray = organize(input)
    console.log('after we organize the array it looks like this:\n', organizedArray);
    // perform the operations taking PEMDAS order of operations into account
    let answer = pemdas(organizedArray);
    console.log('this is what we will return to the main server file', answer);
    console.log('might also return this to the server?', input);
    // package up the answer along with the original equation
    let answerPack = {
        problem: input.calcString,
        solution: answer[0]
    }
    // send the package back to the server.js file
    return answerPack
}

// 12+6-87

function pemdas(array) {
    console.log('we are running pemdas on this array:\n', array);
    // make an array with the order of operations. 
    const PEMDAS = ['*', '/', '+', '-',];
    // loop through PEMDAS checking our input array for the apropriate operator
    for (let i = 0; i < PEMDAS.length;) {
        // set up our test function to compare array elements to an operator
        const operator = (element) => element == PEMDAS[i];
        // save the index of the operator to a variable
        let operatorIndex = array.findIndex(operator);
        // if the operator is found, perform the operation. It should take the numbers on either side
        // of the operator, and perform that operation on them.
        if (operatorIndex != -1) {
            console.log('i found this operator', PEMDAS[i]);
            console.log('here is the position of the operator:', operatorIndex);
            // make a variable to store the result of the operation
            let result;
            // use a switch to decide the appropriate operation
            switch (PEMDAS[i]) {
                case '*':
                    console.log('we in the * case');
                    // perform the operation on the number to the left and right of the operator in the array
                    result = Number(array[operatorIndex - 1]) * Number(array[operatorIndex + 1]);
                    // remove both numbers and the operator, and replace with the result
                    array.splice(operatorIndex - 1, 3, result);
                    // need to go back 2 steps in the loop since 2 positions have been removed
                    // meaning that the for loop will finish too quickly 
                    i-=2;
                    break;
                // all cases work the same way functionally, with different operations 
                case '/':
                    console.log('we in the / case');
                    result = Number(array[operatorIndex - 1]) / Number(array[operatorIndex + 1]);
                    array.splice(operatorIndex - 1, 3, result);
                    i-=2;
                    break;

                case '+':
                    console.log('we in the + case');
                    result = Number(array[operatorIndex - 1]) + Number(array[operatorIndex + 1]);
                    array.splice(operatorIndex - 1, 3, result);
                    i-=2;
                    break;

                case '-':
                    console.log('we in the - case');
                    result = Number(array[operatorIndex - 1]) - Number(array[operatorIndex + 1]);
                    array.splice(operatorIndex - 1, 3, result);
                    i-=2;
                    break;

                default:
                    break;
            }
            // the following 3 console logs basically show the algebra of the equation as it is happening in the console
            // helpful to double check accuracy
            console.log('the result of the switch calculation is', result);
            console.log('array after the switch calculation:\n', array);
        }
        i++
    }
    console.log('array after the for loop:\n', array);
    // then search and calculate for + and -, the same way as above
    return array;
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
        } else {
            // if it is not an operator, we concat it to the current inddex position
            // because it is the next part of a number
            // we can't concat to something that doesn't exist, so we first check to see if anything
            // is in that position
            if (organizedArray[position]) {
                // if something is there, we concat
                organizedArray[position] += character;
            } else {
                // if nothing is there, we creat the new position.
                organizedArray[position] = character;
            }
        }
        console.log('the new array is', organizedArray);
    }
    // return the new array to the parent function so it fcan be passed on to be calculated
    return organizedArray;
}