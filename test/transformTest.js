var expect = require("chai").expect;
var app = require("../transform.js");

describe("Transform DB data into something better", function() {
    it("shows only questions by userName", function() {
        var fakeData = [{
            userName: '1@aol.com',
            questions: [{
                "question": "Who is the best NFL player?",
                "options": ["player a", "player b", "player c"]
            }, {
                "question": "Which is better, cat or dog?",
                "options": ["cat", "dog", "neither"]
            }, {
                "question": "new poll question",
                "options": ["options 1", "option 2"]
            }]
        }, {
            userName: '2@aol.com',
            questions: [{
                "question": "Is this user two?",
                "options": ["yes", "no"]
            }]
        }];
        var userName = '1@aol.com';
        var expected = [{
                "question": "Who is the best NFL player?",
                "options": ["player a", "player b", "player c"]
            }, {
                "question": "Which is better, cat or dog?",
                "options": ["cat", "dog", "neither"]
            }, {
                "question": "new poll question",
                "options": ["options 1", "option 2"]
            }];
            
            
        var actual = app.transform(userName, fakeData);
        /*
        For expect, .equal will compare objects rather than their data
        , and in your case it is two different arrays.
        Use .eql in order to deeply compare values. 
        */
        //console.log(actual);
        expect(actual).to.eql(expected);
        
        
        
    });
});
