var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var app = express();

process.env.NODE_ENV = 'development';

//route to your index.html
app.use(express.static('client/'));


var port = process.env.PORT || 4000;

app.listen(port);
console.log("Listening on port", port);

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
// if(config.seedDB) { require('./config/seed'); }

// require('./config/express')(app);
require('./routes')(app);


console.log("Listening on port", port);



// Expose app
exports = module.exports = app;