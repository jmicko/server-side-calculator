$(window).on("load", function () {
    console.log('hello from jq');

    // add a listeneer to all buttons
    $('.number').on('click', whichButton);
    $('#equals').on('click', handleCalulation);
    $('#clear').on('click', clearField);
})

// function to figure out which button was pressed
function whichButton() {
    let buttonId = $(this).text();
    console.log(buttonId);
    $('#calculation-in').val(function () {
        return this.value + '' + buttonId;
    }
    )
}

function clearField(event) {
    event.preventDefault();
    // clear the input field
    $('#calculation-in').val('');
}

function handleCalulation(event) {
    event.preventDefault();
    // This is where you can add as many things as you want to the server
    // They will all get bundled up in the object and sent to the server as "data" in the ajax object
    let calculationString = {
        calcString: $('#calculation-in').val(),
    }
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

function getHistory(){
    $.ajax({
        method: 'GET',
        url: '/message'
    })
        .then(function (response) {
            console.log('Got messages', response);
            renderHistory(response);
        })
}

function renderHistory(answer){
    $('#answer').text(answer);
    // $('#answer').append(`<p>${answer}: ${item.text}</p>`)
}