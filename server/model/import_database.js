var fs = require('fs');
var async = require('async');
var mongoose = require('mongoose');
var model = require('./model');

var dbURI = 'mongodb://test:test@ds056727.mongolab.com:56727/3_sem_pro_studypoints';

//This is set by the backend tests
//if( typeof global.TEST_DATABASE != "undefined" ) {
//    dbURI = global.TEST_DATABASE;
//}
//else{
//    dbURI = 'mongodb://test:test@ds056727.mongolab.com:56727/3_sem_pro_studypoints';
//}

function readData(path) {
    var file = fs.readFileSync(path, 'utf8');
    var lines = file.split(/[\r]?[\n]/);
    var headers = lines[0].split(',');
    var data = JSON.parse(lines[1]);
    var result = data.map(function(e) {
        var res = {};
        for(var i = 0; i < e.length; i++) {
            if(e[i] !== 'NULL')
                res[headers[i]] = e[i];
        }
        return res;
    })
    console.log(path + ": " + result.length);
    return result;
}

function getStudents() {
    return students.map(function(student) {
        return {
            _id: student.studentID,
            username: student.username,
            email: student.email,
            study_points: student.study_points
        };
    });
};

function getTeachers() {
    return teachers.map(function(teacher) {
        return {
            _id: teacher.teacherID,
            username: teacher.username,
            email: teacher.email
        };
    });
};

var students = readData('students.json');
var teachers = readData('teachers.json');

var db = mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

model.StudentModel.remove({}).exec();
model.TeacherModel.remove({}).exec();

function closeDatabase() {
    db.connection.close();
}

var asyncTasks = [];

function addData(data, dataModel) {
    data.forEach(function(item){
        asyncTasks.push(function(callback){
            var element = new dataModel(item);
            element.save(function(err, order) {
                if(err) console.log(err);
                callback();
            });
        });
    });
}

addData(getStudents(), model.StudentModel);
addData(getTeachers(), model.TeacherModel);

async.series(asyncTasks, function(){
    closeDatabase();
});