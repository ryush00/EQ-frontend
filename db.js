
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
