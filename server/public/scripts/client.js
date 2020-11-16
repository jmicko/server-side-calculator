$(window).on("load", function () {
    console.log('hello from jq');

    // add a listener to all buttons
    $('.numpad').on('click', whichButton);
    $('.equals').on('click', handleCalulation);
    $('#clear').on('click', clearField);
    $('#backspace').on('click', backspace);
    $('#history-list').on('click', 'li', reCalculate);
    domUpdate(true);
})

function reCalculate() {
    console.log($(this).text());
    let repeat = $(this).text()
    let j = true;
    let repeated = [];
    for (let i = 0; j; i++) {
        const character = repeat[i];
        if (character == '=') {
            break
        } else {
            if (repeated) {
                // if something is there, we concat
                repeated += character;
            } else {
                // if nothing is there, we creat the new i.
                repeated = character;
            }
        }
        console.log('the new array is', repeated);
    }
    // return the new array to the parent function so it fcan be passed on to be calculated
    $('#calculation-in').val(repeated);
}


// function to figure out which button was pressed
function whichButton() {
    let buttonId = $(this).text();
    if (buttonId != '=' && buttonId != '←') {
        console.log(buttonId);
        $('#calculation-in').val(function () {
            return this.value + '' + buttonId;
        })
    }
}

function backspace(event) {
    event.preventDefault();
    // grab the string from the input field
    let string = $('#calculation-in').val();
    // slice off the last character
    string = string.slice(0, string.length - 1);
    // change the value of the input to the sliced string
    $('#calculation-in').val(string);
}

function clearField(event) {
    event.preventDefault();
    // clear the input field
    $('#calculation-in').val('');
}

function handleCalulation(event) {
    event.preventDefault();
    console.log('trying to calculate');
    // This is where you can add as many things as you want to the server
    // They will all get bundled up in the object and sent to the server as "data" in the ajax object
    let calculationString = {
        calcString: $('#calculation-in').val()
    }

    // $('#calculation-in').val('');
    console.log('handling message', calculationString);
    sendCalcStringToServer(calculationString);
}

// need to determine correct syntax before sending for calculation

//  Take the package of data and send it to the server
function sendCalcStringToServer(calc) {
    console.log('send to server');
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: calc
    }).then(function (response) {
        console.log('back from server');
        // update all DOM text
        domUpdate();
    })
}

function domUpdate(pageLoad) {
    $('#history-list').val('');
    $.ajax({
        method: 'GET',
        url: '/calc'
    })
        .then(function (response) {
            console.log('Got history', response);
            // rend the history list on the side
            renderHistory(response);
            // if it's a refresh, we don't want to append an answer because we did not send a formula
            if (!pageLoad) {
                renderAnswer(response);
            }
        })
}

function renderHistory(answer) {
    // clear the history list
    $('#history-list').empty();
    // loop through the history, one equation at a time
    for (let i = 0; i < answer.length; i++) {
        const calculation = answer[i];
        // check if the answer was able to be calculated. If not, not not appeend it to the history list,
        // and put the 
        if (calculation.solution != null) {
            $('#history-list').append(`<li>${calculation.problem} = ${calculation.solution}</li>`)
        }
    }
}

function renderAnswer(answer) {
    console.log(answer);
    if (answer[0].solution != null) {
        $('#calculation-in').val('');
        console.log('appending answer to answer h2:', answer[0]);
        $('#answer').text(answer[0].solution);
    } else {
        // if there was an error, display syntax error instead, and 
        $('#answer').text('Syntax error');
    }
}
