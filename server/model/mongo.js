var mongoose = require('mongoose');

module.exports.connect = function() {
    mongoose.connect("mongodb://test:test@ds056727.mongolab.com:56727/3_sem_pro_studypoints");

    mongoose.connection.once("open", function() {
        console.log("Connected to Northwind");
    });
};

module.exports.close = function() {
    mongoose.connection.close();
    console.log("Connection closed");
};