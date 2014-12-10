var express = require('express');
var dbhandler = require('../model/dbhandler');
var router = express.Router();

router.get('/periods', function(req, res) {
  console.log('PERIODS I ADMIN');
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getPeriods(function(periods){
    console.log("schedule stringy: " + JSON.stringify(periods));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(periods));
  })
});

router.post('/periods', function(req, res) {
  console.log('POST');
  var newPeriod = req.body;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.addPeriod(newPeriod, function(period){
    console.log("schedule stringy: " + JSON.stringify(period));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(period));
  })
});

module.exports = router;
