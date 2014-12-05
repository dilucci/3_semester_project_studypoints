var express = require('express');
var model = require('./model');
var mongo = require('./mongo');


module.exports.getStudents = function(callback) {
    mongo.connect();
    console.log("getStudents metode!")
    model.StudentModel.find( function (error, students) {
        console.log("students: " + students)
        callback(students);
        mongo.close();
    });
};