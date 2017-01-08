var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt'); // Load the bcrypt module
var salt = bcrypt.genSaltSync(10); // Generate a salt



// Finally just store the hash in your DB
// .. code to store in Redis/Mongo/Mysql/Sqlite/Postgres/etc.
var mongo = require("mongodb");
const mongodb_url = 'mongodb://localhost:27017/data' || process.env.MONGOLAB_URL;


function storeData(val) {
    mongo.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', mongodb_url);
            var data = db.collection('voting-app');
            data.insert(val, function(err, dataResponse) {
                if (err) {
                    throw err;
                }
                console.log(JSON.stringify(val));
            });
            db.close();
        }
    });
}

function checkEmail(val, cb) {
    mongo.connect(mongodb_url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', mongodb_url);
            var data = db.collection('voting-app');
            data.find({
                'userName': val
            }, {
                _id: 0,
                'password': 1
            }).toArray(function(err, documents) {
                if (err) {
                    throw err; // throw err causes the end It is a little like return console.log(err), except here I don't have the return
                }
                cb(documents[0]);
            });
        }
        db.close();
    });
}





app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname
    })
    res.end();
})

// create application/json parser 
var jsonParser = bodyParser.json()
    // create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.post("/", urlencodedParser, function(req, res) {
    if (req.body.password1 === req.body.password2) {
        var passwordHash = bcrypt.hashSync(req.body.password1, salt); // Hash the password with the salt
        var user = {
            userName: req.body.emailRegister,
            password: passwordHash
        };
        console.log(user);
        storeData(user);
    }
    console.log("I've registered an user");
    res.redirect('/');
});

app.use("/login", urlencodedParser, function(req, res) {
    console.log(req.body.email);
    if (req.body.email !== undefined) {
        checkEmail(req.body.email, function(cb) {
            if (cb !== undefined) {
                var passwordHash = cb.password;
                if (bcrypt.compareSync(req.body.password, passwordHash)) {
                    console.log("User " + req.body.email + " has correct password!");
                    res.redirect('/');
                }
                else {
                    console.log("Wrong password");
                    res.redirect('/');
                }
            }
            else {
                console.log("Wrong userName or Password");
                res.redirect('/');
            }
        });
    }
    else {
        res.redirect('/');
    }
});














app.listen(process.env.PORT, function() {
    console.log("Server listening on: " + process.env.PORT);
});
