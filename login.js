var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const mongodbUrl = 'mongodb://localhost:27017/data'; 



function userNameCheck(userName) {
    if (userName === "good-email") {
        return true;
    }
    return false;
};



function fetcherHashedPassword(userName, url, cb){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      cb();    
      db.close();
    });
}

module.exports.login = fetcherHashedPassword;
module.exports.userNameCheck = userNameCheck;
   /* 
     mongo.connect(mongodbUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            throw err; 
        }
        else {
            return db;
            console.log('Connection established to', mongodbUrl);
            db.collection('voting-app').find({
                'userName': userName
            }, {
                _id: 0,
                'password': 1
            }).toArray(function(err, documents) {
                if (err) {
                    console.log("convert toArray failed: "+ err);
                    throw err; 
                }
                return documents;
            });
        }
        db.close();
    });
}
*/

/*
function checkEmail(val, cb) {
    mongo.connect(mongodbUrl, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', mongodbUrl);
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
*/
