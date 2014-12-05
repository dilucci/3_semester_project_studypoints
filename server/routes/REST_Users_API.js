var express = require('express');
var dbhandler = require('../model/dbhandler');

var router = express.Router();
router.get('/students', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of wikis here, make sure you have started the database and set up some test wikis (see model-->db.js for instructions)");
        return;
    }
    dbhandler.getStudents(function(students){
        console.log("students stringy: " + JSON.stringify(students));
        res.header("Content-type","application/json");
        res.end(JSON.stringify(students));
    })
});

module.exports = router;
