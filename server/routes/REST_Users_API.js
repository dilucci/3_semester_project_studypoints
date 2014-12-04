var express = require('express');
var dbhandler = require('../model/dbhandler');

var router = express.Router();
router.get('/students', function(req, res) {
    dbhandler.getStudents(function(students){
        res.header("Content-type","application/json");
        console.log(JSON.stringify(students));
        res.end(JSON.stringify(students));
    })
});

module.exports = router;
