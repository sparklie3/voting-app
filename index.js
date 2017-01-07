var express = require("express");
var app = express();
var mongodb = require("mongodb");
//const mongodb_url = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/data';
//product db collection = "file-meta-db";



app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname
    })
    res.end();
})



app.listen(process.env.PORT, function() {
    console.log("Server listening on: " + process.env.PORT);
});