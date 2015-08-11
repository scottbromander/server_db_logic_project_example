var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var index = require('./routes/index');
var things = require('./routes/things');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

var mongoURI = "mongodb://localhost:27017/reposhift";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    if(err){
        console.log("MONGO ERROR: ", err);
    }
});

mongoDB.once('open', function(){
    console.log("CONNECTED TO MONGODB!");
});

app.use('/things', things);
app.use('/', index);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;


/*

 var things = require('./routes/things');
 var index = require('./routes/index');

 app.use("/things", things);
 app.use("/", index);


 */