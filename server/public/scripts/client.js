$(window).on("load", function () {
    console.log('hello from jq');

    // add a listener to all buttons
    $('.numpad').on('click', whichButton);
    $('.equals').on('click', handleCalulation);
    $('#clear').on('click', clearField);
    $('#backspace').on('click', backspace);
})




// function to figure out which button was pressed
function whichButton() {
    let buttonId = $(this).text();
    if (buttonId != '=') {
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
    $('#calculation-in').val('');
    console.log('handling message', calculationString);
    sendCalcStringToServer(calculationString);
}

//  Take the package of data and send it to the server
function sendCalcStringToServer(calc) {
    console.log('send to server');
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: calc
    }).then(function (response) {
        console.log('back from server');
        // clear inputs
        $('#history-list').val('');
        getHistory();
    })
}

function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/calc'
    })
        .then(function (response) {
            console.log('Got history', response);
            renderHistory(response);
        })
}

function renderHistory(answer) {
    console.log('appending answer to answer h2:', answer);
    // $('#answer').text(answer[0].calcString);
    // for (let i = 0; i < answer.length; i++) {
    //     const calculation = answer[i];
    //     $('#history-list').append(`<p>${answer}: ${item.text}</p>`)

    // }
}