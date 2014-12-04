var express = require('express');
var mongoose = require('mongoose');
var model = require('./model');

module.exports.getStudents = function(callback) {
    console.log("getStudents metode!")
    model.StudentModel.find( function (error, students) {
        callback(students);
    });
};