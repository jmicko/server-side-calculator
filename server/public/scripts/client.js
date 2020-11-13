$(window).on("load", function () {
    console.log('hello from jq');
    // Handler when all assets (including images) are loaded
    
    // add a listeneer to all buttons
    $('.numpad').on('click', whichButton);
});

// 
function whichButton() {
    let buttonId = $(this).text();
    console.log(buttonId);
    $('#calculation-in').val(function() {
        return this.value + '' + buttonId;
    }
    )
}
