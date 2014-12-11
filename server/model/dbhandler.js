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
    var classIds = [];
    console.log("getClassesInPeriod metode!");
    mongo.connect();

    model.PeriodModel.find({_id: periodId}).populate('Class').exec(function(err, periods){
        model.ClassModel.find({})
    })


    model.PeriodModel.find( {_id: periodId }, function (error, period) {
        console.log('period1: ' + period);
        model.ClassModel.find( {_id: {$in:classIds}}, function(err, classes){
            console.log('period2: ' + period);
            console.log('period_name ' + period.period_name);
            console.log('max_points ' + period.max_points);
            //period.classIds.forEach(function(classId){
            //    classIds.push(classId.classId)
            //});
            callback(classes);
            console.log('classes: ' + classes);
            mongo.close();
        });
    });
};