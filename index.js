var express = require("express");
var session = require('client-sessions');
var path = require('path');
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt'); // Load the bcrypt module
var MongoClient = require('mongodb').MongoClient

var app = express();
const salt = bcrypt.genSaltSync(10); // Generate a salt
const mongodbUrl = 'mongodb://localhost:27017/data' || process.env.MONGOLAB_URL;
const sessionSecret = process.env.SESSION_SECRET;
const collectionName = 'voting-app';

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.use(session({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: sessionSecret, // should be a large unguessable string
    duration: 30 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 5 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

app.use('/public', express.static(path.join(__dirname, '/public')));

//general mongodb function
var db = function(url, name, query, cb) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            throw err;
        }
        //console.log('Connection established to:', url);
        switch (query.type) {
            case 'insert':
                db.collection(name).insert(query.value, function(err, dataResponse) {
                    if (err) {
                        throw err;
                    }
                });
                break;
            case 'update':
                db.collection(name).update(query.search, query.value, query.options, function(err, dataResponse) {
                    if (err) {
                        throw err;
                    }
                });
                break;

            default:
                db.collection(name).find(query.search, query.filter).toArray(function(err, documents) {
                    if (err) {
                        console.log('Unable to convert data toArray:', err);
                        throw err;
                    }
                    cb(documents);
                });
        }
        db.close();
    });
};


function checkEmail(email, cb) {
    var query = {
        type: 'search',
        search: {
            'userName': email
        },
        filter: {
            _id: 0,
            'password': 1
        }
    };

    db(mongodbUrl, collectionName, query, function(data) {
        cb(data[0]);
    });
}


function storeData(insertData, cb) {
    var query = {
        type: 'insert',
        value: insertData
    };

    db(mongodbUrl, collectionName, query, function(data) {
        cb(data[0]);
    });
}


function findPollsByUser(email, cb) {
    var query = {
        type: 'search',
        search: {
            'userName': email
        },
        filter: {
            _id: 0,
            'questions': 1
        }
    };

    db(mongodbUrl, collectionName, query, function(data) {
        cb(data[0]);
    });
}


function findAllPolls(cb) {
    var query = {
        type: 'search',
        search: {},
        filter: {
            _id: 0,
            userName: 1,
            'questions': 1
        }
    };

    db(mongodbUrl, collectionName, query, function(data) {
        cb(data[0]);
    });
}

function createUserData(user, pass) {
    var output = {
        userName: user,
        password: bcrypt.hashSync(pass, salt)
    };
    return output;
}

function checkSession(input) {
    if (input !== undefined) {
        return true;
    }
    return false;
}


app.get('/', function(req, res) {
    findAllPolls(function(data) {
        //console.log(data);
        //console.log(cb.questions.length);
        for (var each of data.questions) {
            console.log(each.question);
        }
    });
    
    res.sendFile('all.html', {
        root: path.join(__dirname, '/public')
    });
    
    if (checkSession(req.session.user)) {
        console.log("has logged in");
        
        //if you are logged in, get the polls for a specific user
        findPollsByUser(req.session.user,function(data){
           console.log(data); 
        });
    }
    else {
        console.log("hasn't logged in");
    }
    
});






app.post("/register", urlencodedParser, function(req, res) {
    var userName = req.body.emailRegister;
    var password = req.body.password1;

    console.log("hit register");

    function fail() {
        console.log('Register failed');
        res.sendStatus(403);
    }

    checkEmail(userName, function(cb) {
        if (cb === undefined && userName !== undefined) {
            var userData = createUserData(userName, password);
            storeData(userData);
            console.log("I've registered a new user");
            res.sendStatus(200);
        }
        else {
            fail();
        }
    });

});

app.post("/login", urlencodedParser, function(req, res) {
    var userNameEntered = req.body.email;
    var passwordEntered = req.body.password;

    if (checkSession(req.session.user)) {
        console.log("already logged in, must logout before can login as another user");
    }
    else {
        console.log("hit logging in");
        checkEmail(userNameEntered, function(cb) {
            if (cb !== undefined && userNameEntered !== undefined) {
                var passwordHash = cb.password;
                if (bcrypt.compareSync(passwordEntered, passwordHash)) {
                    console.log("User " + req.body.email + " has correct password!");
                    //this sets the session
                    req.session.user = userNameEntered;
                    
                    //this get's the poll data for a specific user
                    findPollsByUser(userNameEntered,function(data){
                       console.log(data); 
                    });
                    
                    res.sendStatus(200);
                }
                else {
                    console.log("Wrong password");
                    res.sendStatus(403);
                }
            }
            else {
                console.log("Can't find userName");
                res.sendStatus(403);
            }
        });
    }
});

app.post("/logout", function(req, res) {
    req.session.reset();
    res.redirect("/");
});



function updateDataWithQuestion(email, insertData, cb) {
    var query = {
        type: 'update',
        search: {
            'userName': email
        },
        value: {
            $addToSet: {
                questions: insertData
            }
        },
        options: {
            upsert: false,
            multi: false,
        }
    };

    db(mongodbUrl, collectionName, query, function(data) {
        cb(data[0]);
    });
}

app.post("/newPoll", urlencodedParser, function(req, res) {
    console.log('hit new poll');
    if (checkSession(req.session.user)){
        var email = req.session.user;
        var data = {
            "question": req.body.question,
            "options": req.body.option
        };
        updateDataWithQuestion(email, data, function(data){
            console.log(data);
        });
        res.sendStatus(200);    
    }
    else{
        console.log("can't create new poll because not logged in");
        res.sendStatus(403);
    }
});






/*
app.post('/', function(req, res) {
    if (req.session.user) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(403);
    }
});
*/


/*
app.get('/result', function(req, res) {
    res.redirect('/result.html');
});
*/

// create application/json parser 
//var jsonParser = bodyParser.json();


/*
app.use(function(req, res, data) {
    console.log(data);
    
});
*/



app.listen(process.env.PORT, function() {
    console.log("Server listening on: " + process.env.PORT);
});
