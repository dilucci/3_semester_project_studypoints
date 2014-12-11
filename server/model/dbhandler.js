var express = require('express');
var model = require('./model');
var mongo = require('./mongo');


module.exports.getStudents = function(callback) {
    mongo.connect();
    console.log("getStudents metode!");
    model.StudentModel.find( function (error, students) {
        callback(students);
        mongo.close();
    });
};

module.exports.getStudentDetails = function(id, callback) {
    mongo.connect();
    console.log("getStudentDetail metode!");
    model.StudentModel.find( {_id: id }, function (error, student) {
        callback(student);
        mongo.close();
    });
};

module.exports.getPeriods = function(callback) {
    mongo.connect();
    console.log("getPeriods metode!");
    model.PeriodModel.find( function (error, periods) {
        callback(periods);
        mongo.close();
    });
};

module.exports.getClasses = function(callback) {
    mongo.connect();
    console.log("getClasses metode!");
    model.ClassModel.find( function (error, classes) {
        callback(classes);
        mongo.close();
    });
};

module.exports.addPeriod = function(newPeriod, callback) {
    mongo.connect();
    console.log("addPeriod metode!");
    model.PeriodModel.create(newPeriod, function (error, newPeriod) {
        callback(newPeriod);
        mongo.close();
    });
};

module.exports.getPeriod = function(periodId, callback) {
    mongo.connect();
    console.log("getPeriod metode!");
    model.PeriodModel.find( {_id: periodId }, function (error, period) {
        callback(period);
        mongo.close();
    });
};

module.exports.getClassesInPeriod = function(periodId, callback) {
    mongo.connect();
    console.log("getPeriod metode!");
    model.PeriodModel.find( {_id: periodId }).populate('class').exec(function (error, periods) {
        var classes = [];
        periods.forEach(function(period){
            classes.push(period.class)
        });
        callback(classes);
        mongo.close();
    });
};