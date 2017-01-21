var expect = require("chai").expect;
var app = require("../login.js");






describe("Check to see if userName is in DB:", function() {
    it("Email exists", function() {
        var input = app.userNameCheck("good-email");
        expect(input).to.equal(true);
    });

    it("Email doesn't exist", function() {
        var email = app.userNameCheck();
        expect(email).to.equal(false);
    })
})



describe("Successfully  login to account", function() {
    it("should take an email address, fakeMongodbUrl and fetcher function argument and return a promise for JSON data of the hashed password", function(done) {
        var fakeMongodbUrl = "mongodb url";
        var userName = "good-email";
        var fakeData = "password";
        var fakeFetcher = function() {
            return Promise.resolve(fakeData);
        };
        app.login(userName, fakeMongodbUrl, fakeFetcher).then(function(actual){
            expect(actual).to.equal(fakeData);
        })
        done();
    });
});
