// bring in express, from the node_modules directory
// express is a function
const express = require('express');

// bring in body parser which will help us parse incoming data
const bodyParser = require('body-parser');

// create an instance of the express webserver, we'll call it app
const app = express();

// we'll use this port later, it's like a box number at the post office
// where our server will get/send mail/messages
const port = 5000;

// Tell express where to find static files that it can send on request
app.use( express.static('server/public') );

// tell express how to parse incoming data
app.use( bodyParser.urlencoded( {extended: true} ) );

// ----------these routs and data will vary for each assignment----------
const calculationItems = [2];

// route to GET the cats
app.get('/calc', (req, res) => {
    console.log('Sending calculated data...');
    res.send(calculationItems);
})

app.post('/calc', (req, res) => {
    let calculatorData = req.body;
    console.log('getting calculator data...', calculatorData);
    calculationItems.push(calculatorData)
    res.sendStatus(200); // 200 is an OK status
})


// --------------------------end of our routes--------------------------

// Tell server to listen on our port
app.listen( port, () => {
    console.log(`Server is listening on port ${port}...`);
})