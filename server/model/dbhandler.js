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

module.exports.addClassToPeriod = function(pid, classToAdd, callback) {
    mongo.connect();
    console.log("addClassToPeriod metode!");
    console.log('classID: ' + classToAdd._id);
        model.PeriodModel.update({_id: pid}, {$push: {'classIds': {'classId':classToAdd}}}, function (erro, class_) {
            callback(class_);
            mongo.close();
        });
};

module.exports.addPeriod = function(newPeriod, callback) {
    mongo.connect();
    var date = new Date(newPeriod.start_date);
    console.log('date ' + date);
    var lastDate = new Date(newPeriod.end_date);
    console.log('lastDate: ' + lastDate);

    var periodDays = [];

    while (date <= lastDate) {
        periodDays.push(new Date(date));
        date.setTime(date.getTime() + (1000*60*60*24));
    }
    console.log(periodDays);



    console.log("addPeriod metode!");
    model.PeriodModel.create(newPeriod, function (error, addedPeriod) {
        model.PeriodModel.update({_id: newPeriod._id}, {$push: {'dayIds': {$each: periodDays}}}, function (error, rowsUpdated) {
            console.log('dateSet time ' + date);
            model.SemesterModel.update({_id: 1}, {$push: {'periodIds': {'periodId':newPeriod._id}}}, function (error, rowsUpdated) {
                console.log("rows updated: " + rowsUpdated);
                callback(addedPeriod);
                mongo.close();
            });
        });



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

module.exports.getPeriodDays = function(periodId, callback){
    mongo.connect();
    console.log("getPeriodDays metode!");
    model.PeriodModel.findOne( {_id: periodId }, function (error, period) {
        model.DayModel.find({_id: {$gte: period.start_date, $lte: period.end_date}}, function (error, periodDays) {
            callback(periodDays);
            mongo.close();
        });
    });
}

//module.exports.addDays = function(newDays, callback) {
//    mongo.connect();
//    console.log("addDays metode!");
//    console.log('NEWDAYS: ' + newDays);
//
//    var addedDays = [];
//    newDays.forEach(function(newDay){
//        model.DayModel.create(newDay, function(error, newDay){
//            addedDays.push(newDay);
//
//        });
//    },callback(addedDays))
//};

module.exports.getClassesInPeriod = function(periodId, callback) {
    console.log("getClassesInPeriod metode!");
    console.log("periodId: " + periodId);
    mongo.connect();

    model.PeriodModel.findOne({_id: periodId}, function(err, period){
        var classIds = [];
        console.log('period: ' + period);
        period.classIds.forEach(function(classId){
            console.log('classIds: ' + period.classIds);
            console.log('classId: ' + period.classIds.classId);
            console.log('name: ' + period.period_name);
            console.log('points: ' + period.max_points);
            console.log('classId.classId: ' + classId.classId);
            classIds.push(classId.classId)
        });
        model.ClassModel.find( {_id: {$in: classIds}}, function(err, classes){
            console.log('classes: ' + classes);
            callback(classes);
            mongo.close();
        })
    });
};

module.exports.getStudentsInClass = function(classId, callback) {
    mongo.connect();
    console.log("getStudentsInClass metode!");

    model.ClassModel.findOne({_id: classId}, function (error, class_) {
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