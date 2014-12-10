var express = require('express');
var model = require('./model');
var mongo = require('./mongo');


module.exports.getStudents = function(callback) {
    mongo.connect();
    console.log("getStudents metode!")
    model.StudentModel.find( function (error, students) {
        //console.log("students: " + students)
        callback(students);
        mongo.close();
    });
};

module.exports.getStudentDetails = function(id, callback) {
    mongo.connect();
    //console.log("getStudentDetail metode!")
    model.StudentModel.find( {_id: id }, function (error, student) {
        //console.log("student: " + student)
        callback(student);
        mongo.close();
    });
};

module.exports.getPeriods = function(callback) {
    mongo.connect();
    console.log("getPeriods metode!")
    model.PeriodModel.find( function (error, periods) {
        callback(periods);
        mongo.close();
    });
};