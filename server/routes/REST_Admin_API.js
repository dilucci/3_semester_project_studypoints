var express = require('express');
var dbhandler = require('../model/dbhandler');
var router = express.Router();

router.get('/periods', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getPeriods(function(periods){
    console.log("periods stringy: " + JSON.stringify(periods));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(periods));
  })
});

router.post('/periods', function(req, res) {
  var newPeriod = req.body;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.addPeriod(newPeriod, function(period){
    console.log("addPeriod stringy: " + JSON.stringify(period));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(period));
  })
});

router.get('/periodDays/:id', function(req, res) {
  var periodId = req.params.id;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getPeriodDays(periodId, function(periodDays){
    console.log("getPeriodDays stringy: " + JSON.stringify(periodDays));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(periodDays));
  })
});

router.get('/students/day/:day', function(req, res) {
  var day = req.params.day;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getStudentsInDay(day, function(students){
    console.log("getStudentsInDay stringy: " + JSON.stringify(students));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(students));
  })
});

router.get('/students/class/:class', function(req, res) {
  var class_ = req.params.class;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getStudentsInClass(class_, function(students){
    console.log("getStudentsInDay stringy: " + JSON.stringify(students));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(students));
  })
});

//router.post('/days', function(req, res) {
//  var newDays = req.body;
//  if(typeof global.mongo_error !== "undefined"){
//    res.status(500);
//    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
//    return;
//  }
//  dbhandler.addDays(newDays, function(newDays){
//    console.log("addDays stringy: " + JSON.stringify(newDays));
//    res.header("Content-type","application/json");
//    res.end(JSON.stringify(newDays));
//  })
//});

router.get('/students', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getStudents(function(students){
    console.log("Students stringy: " + JSON.stringify(students));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(students));
  })
});

router.post('/students', function(req, res) {
  var newStudent = req.body;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.addStudent(newStudent, function(student){
    console.log("Students stringy: " + JSON.stringify(student));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(student));
  })
});

router.get('/tasks', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getTasks(function(tasks){
    console.log("Students stringy: " + JSON.stringify(tasks));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(tasks));
  })
});

router.post('/tasks', function(req, res) {
  var newTask = req.body;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.addTask(newTask, function(task){
    console.log("Students stringy: " + JSON.stringify(task));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(task));
  })
});

router.put('/student/:studentId/day/:day', function(req, res) {
  var student = req.body;
  var day = req.params.day;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.incrementPoints(day, student, function(students){
    console.log("Students stringy: " + JSON.stringify(students));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(students));
  })
});

router.get('/classes', function(req, res) {
  console.log('classes i admin');
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getClasses(function(classes){
    console.log("Classes stringy: " + JSON.stringify(classes));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(classes));
  })
});

router.get('/periods/:id', function(req, res) {
  var periodId = req.params.id;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getPeriod(periodId, function(period){
    console.log("Period stringy: " + JSON.stringify(period));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(period));
  })
});

router.get('/periods/:id/classes', function(req, res) {
  var periodId = req.params.id;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
    dbhandler.getClassesInPeriod(periodId, function(classes){
      console.log("classesInPeriod stringy: " + JSON.stringify(classes));
      res.header("Content-type","application/json");
      res.end(JSON.stringify(classes));
    })
});

router.put('/periods/:pid/classes', function(req, res) {
  var classToAdd = req.body;
  var pid = req.params.pid;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.addClassToPeriod(pid, classToAdd, function(class_){
    console.log("addClassToPeriod stringy: " + JSON.stringify(class_));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(class_));
  })
});

router.put('/periods/:pid/tasks', function(req, res) {
  var taskToAdd = req.body;
  var pid = req.params.pid;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.addTaskToPeriod(pid, taskToAdd, function(task){
    console.log("addClassToPeriod stringy: " + JSON.stringify(task));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(task));
  })
});

router.get('/students/class/:id', function(req, res) {
  var classId = req.params.id;
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+"Make sure you have started the database");
    return;
  }
  dbhandler.getStudentsInClass(classId, function(students){
    console.log("StudentsInClass stringy: " + JSON.stringify(students));
    res.header("Content-type","application/json");
    res.end(JSON.stringify(students));
  })
});

module.exports = router;
