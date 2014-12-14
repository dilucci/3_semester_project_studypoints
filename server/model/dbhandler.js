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

module.exports.addClassToPeriod = function(pid, classToAdd, callback) {
    mongo.connect();
    console.log("addClassToPeriod metode!");
    console.log('classID: ' + classToAdd._id);
        model.PeriodModel.update({_id: pid}, {$push: {'classIds': {'classId': classToAdd}}}, function (erro, class_) {
            callback(class_);
            mongo.close();
        });
};

module.exports.getPeriod = function(periodId, callback) {

    mongo.connect();
    console.log("getPeriod metode!");
    model.PeriodModel.find( {_id: periodId}).populate('dayIds.dayId').exec(function (error, period) {
            callback(period);
            mongo.close();
    });
};

module.exports.incrementPoints = function(day, student, callback) {
    mongo.connect();
    console.log("incrementPoints metode!");
    model.StudentModel.findOne( {_id: student._id}, function (error, student) {
        model.StudentModel.update({_id: student._id}, {study_points_total: student.study_points_total++}, function(error, updates){
            model.DayModel.update({_id: day}, {$push: {'studentIds': {'studentId': student._id}}}, function(error, rowsUpdated){
                callback(student);
                mongo.close();
            });
        })
    });
};

module.exports.addPeriod = function(newPeriod, callback) {
    mongo.connect();
    var date = new Date(newPeriod.start_date);
    //console.log('date ' + date);
    var lastDate = new Date(newPeriod.end_date);
    //console.log('lastDate: ' + lastDate);

    console.log("addPeriod metode!");
    model.PeriodModel.create(newPeriod, function (error, addedPeriod) {
        model.SemesterModel.update({_id: 1}, {$push: {'periodIds': {'periodId':addedPeriod._id}}}, function (error, rowsUpdated) {
            while (date <= lastDate) {
                model.PeriodModel.update({_id: addedPeriod._id}, {$push: {'dayIds': {'dayId': date.toISOString().substring(0,10)}}}, function (error, rowsUpdated) {
                    if(date == lastDate){
                        mongo.close();
                    }
                });
                date.setTime(date.getTime() + (1000*60*60*24));
            }
            callback(addedPeriod);
        });
    });
};

module.exports.getStudentsInDay = function(day, callback) {
    mongo.connect();
    model.DayModel.findOne( {_id: day }, function (error, day) {
        console.log("getStudentsInDay metode!");
        var studentIds = [];
        day.studentIds.forEach(function(sId){
            studentIds.push(sId.studentId)
        });

        model.StudentModel.find({_id: {$in: studentIds}}, function(err, students){
            console.log(students);
            callback(students);
            mongo.close();
        });
    });
};

module.exports.getPeriodDays = function(periodId, callback){
    mongo.connect();
    console.log("getPeriodDays metode!");

    model.PeriodModel.findOne( {_id: periodId }, function (error, period) {
        console.log(JSON.stringify(period));
        var date = new Date(period.start_date);
        var endDate = new Date(period.end_date);
        console.log("start date: " + date);
        console.log("end date: " + endDate);
        var days = [];

        //while (date <= endDate) {
        //    days.push(new Date(date));
        //    date.setTime(date.getTime() + (1000*60*60*24));
        //}
        //console.log(date.toISOString())
        //console.log(days);
        //
        //model.DayModel.find( {_id: date.toISOString().substring(0,10)}).populate('studentId').exec(function (error, periodDays) {
        //    console.log("periodDays: " + periodDays);
        //    callback(periodDays);
        //    mongo.close();
        //});



        //
        period.dayIds.forEach(function(dId){
            days.push(dId.dayId)
        });
        console.log(days)

        model.DayModel.find({_id: {$in: days}}).populate('studentId').exec(function(err, periodDays){
            console.log(periodDays)
            callback(periodDays);
            mongo.close();
        });

        //while (date <= endDate) {
        //    model.DayModel.find({_id: date.toISOString().substring(0,10)}).populate('studentIds.studentId').exec(function (error, periodDay) {
        //        days.push(periodDay);
        //        date.setTime(date.getTime() + (1000*60*60*24));
        //    });
        //    callback(days);
        //    mongo.close();
        //}

    });
};

module.exports.addDays = function(newDays, callback) {
    mongo.connect();
    console.log("addDays metode!");
    console.log('NEWDAYS: ' + newDays);

    var addedDays = [];
    newDays.forEach(function(newDay){
        model.DayModel.create(newDay, function(error, newDay){
            addedDays.push(newDay);

        });
    },callback(addedDays))
};

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
        model.StudentModel.find({_id: {$in: studentIds}}, function(err, students){
            callback(students);
            mongo.close();
        })
    });
};