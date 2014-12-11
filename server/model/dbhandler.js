var express = require('express');
var model = require('./model');
var mongo = require('./mongo');


module.exports.getStudents = function(callback) {
    mongo.connect();
    console.log("getStudents metode!");
    model.StudentModel.find( function (error, students) {
        callback(null, students);
        mongo.close();
    });
};

module.exports.getStudentDetails = function(id, callback) {
    mongo.connect();
    console.log("getStudentDetail metode!");
    model.StudentModel.find( {_id: id }, function (error, student) {
        callback(null, student);
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
    console.log("getClassesInPeriod metode!");
    mongo.connect();

    model.PeriodModel.findOne({_id: periodId}, function(err, period){
        var classIds = [];
        console.log('period: ' + period);
        period.classIds.forEach(function(classId){
            console.log('classId: ' + period.classIds);
            console.log('name: ' + period.period_name);
            console.log('points: ' + period.max_points);
            classIds.push(classId.classId)
        });
        model.ClassModel.find( {'classIds.classId': {$in: classIds}}, function(err, classes){
            console.log('classes: ' + classes);
            callback(classes);
            mongo.close();
        })
    });
};

module.exports.getStudentsInClass = function(classId, callback) {
    mongo.connect();
    console.log("getStudentsInClass metode!");
    model.ClassModel.find({_id: classId}, function (error, class_) {
        var studentIds = [];
        class_.studentIds.forEach(function(sId){
            studentIds.push(sId.studentId)
        });
        model.StudentModel.find({'studentIds.studentId': {$in: studentIds}}, function(err, students){
            callback(students);
            mongo.close();
        })
    });
};