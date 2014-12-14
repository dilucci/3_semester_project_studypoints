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

module.exports.getStudentDetails = function(username, callback) {
    mongo.connect();
    console.log("getStudentDetail metode!");
    model.StudentModel.find( {username: username }, function (error, student) {
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

module.exports.getTasks = function(callback) {
    mongo.connect();
    console.log("getTasks metode!");
    model.TaskModel.find( function (error, tasks) {
        callback(tasks);
        mongo.close();
    });
};

module.exports.addTask = function(newTask, callback) {
    mongo.connect();
    console.log("getPeriods metode!");
    model.TaskModel.create(newTask, function (error, task) {
        callback(task);
        mongo.close();
    });
};

module.exports.addTaskToPeriod = function(pid, taskToAdd, callback) {
    mongo.connect();
    console.log("addTaskToPeriod metode!");
    model.TaskModel.create(taskToAdd, function (error, task) {
        model.PeriodModel.update({_id: pid}, {$push: {'taskIds': {'tasksId': task}}}, function (erro, task) {
            callback(task);
            mongo.close();
        });
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
        student.study_points_total = student.study_points_total + 1;
        model.StudentModel.update({_id: student._id}, {study_points_total: student.study_points_total}, function(error, updates){
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
    console.log('date ' + date);
    var lastDate = new Date(newPeriod.end_date);
    console.log('lastDate: ' + lastDate);

    console.log("addPeriod metode!");
    model.PeriodModel.create(newPeriod, function (error, addedPeriod) {
        model.SemesterModel.update({_id: 1}, {$push: {'periodIds': {'periodId':addedPeriod._id}}}, function (error, rowsUpdated) {
            while (date <= lastDate) {
                model.PeriodModel.update({_id: addedPeriod._id}, {$push: {'dayIds': {'dayId': date.toISOString().substring(0,10)}}});
                date.setTime(date.getTime() + (1000*60*60*24));
            }
            callback(addedPeriod);
            mongo.close();
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

module.exports.getStudentsInClass = function(classId, callback) {
    mongo.connect();
    model.ClassModel.findOne( {_id: classId }, function (error, class_) {
        console.log("getStudentsInClass metode!");
        var studentIds = [];
        class_.studentIds.forEach(function(sId){
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

module.exports.addStudent = function(newStudent, callback) {
    mongo.connect();
    console.log("addStudent metode!");
        model.StudentModel.create(newStudent, function(error, student){
            callback(student);
            mongo.close();
        });
};

module.exports.getClassesInPeriod = function(periodId, callback) {
    console.log("getClassesInPeriod metode!");
    console.log("periodId: " + periodId);
    mongo.connect();

    model.PeriodModel.findOne({_id: periodId}, function(err, period){
        var classIds = [];
        period.classIds.forEach(function(classId){
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
        console.log('StudentIds in class: ' + studentIds);
        model.StudentModel.find({_id: {$in: studentIds}}, function(err, students){
            callback(students);
            mongo.close();
        })
    });
};