var express = require('express');
var dbhandler = require('../model/dbhandler');

var router = express.Router();

router.get('/schedule', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+"Make sure you have started the database");
        return;
    }
    dbhandler.getStudents(function(students){
        //console.log("schedule stringy: " + JSON.stringify(students));
        res.header("Content-type","application/json");
        res.end(JSON.stringify(students));
    })
});

router.get('/schedule/:id', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+"Make sure you have started the database");
        return;
    }
    var id = req.params.id;
    dbhandler.getStudentDetails(id, function(student){
        //console.log("schedule stringy: " + JSON.stringify(student));
        res.header("Content-type","application/json");
        res.end(JSON.stringify(student));
    })
});

router.get('/periods', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+"Make sure you have started the database");
        return;
    }
    dbhandler.getPeriods(function(periods){
        console.log("Periods stringy: " + JSON.stringify(periods));
        res.header("Content-type","application/json");
        res.end(JSON.stringify(periods));
    })
});

module.exports = router;
