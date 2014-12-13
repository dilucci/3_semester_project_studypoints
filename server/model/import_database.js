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
            first_name: student.first_name,
            last_name: student.last_name,
            address: student.address,
            phone: student.phone,
            email: student.email,
            study_points_total: student.study_points_total
        };
    });
};

function getTeachers() {
    return teachers.map(function(teacher) {
        return {
            _id: teacher.teacherID,
            username: teacher.username,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            phone: teacher.phone,
            email: teacher.email
        };
    });
};

function getClasses() {
    return classes.map(function(class_) {
        return {
            _id: class_.classID,
            class_name: class_.class_name,
            studentIds: [{
               studentId: class_.studentID
            }],
            teacherIds: [{
                teacherId: class_.teacherID
            }]
        };
    });
};

function getPeriods() {
    return periods.map(function(period) {
        return {
            _id: period.periodID,
            period_name: period.period_name,
            start_date: period.start_date,
            end_date: period.end_date,
            max_points: period.max_points,
            classIds: [{
                classId: period.classId
            }],
            days: [{
                day: period.day,
                studentIds: period.studentId
            }],
            taskIds: [{
                taskId: period.taskId
            }]
        };
    });
};

function getTasks() {
    return tasks.map(function(task) {
        return {
            _id: task.taskID,
            task_name: task.task_name,
            description: task.description,
            max_points: task.max_points
        };
    });
};

function getDays() {
    return days.map(function(day) {
        return {
            _id: day.dayID,
            date: day.date,
            studentIds: [{
                studentId: day.studentID
            }]
        };
    });
};

function getSemesters() {
    return semesters.map(function(semester) {
        return {
            _id: semester.semesterID,
            semester_name: semester.semester_name,
            req_points: semester.req_points,
            max_points: semester.max_points
        };
    });
};


var students = readData('students.json');
var teachers = readData('teachers.json');
var classes = readData('classes.json');
var tasks = readData('tasks.json');
//var days = readData('days.json');
//var periods = readData('periods.json');
var semesters = readData('semesters.json');


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
model.ClassModel.remove({}).exec();
model.TaskModel.remove({}).exec();
//model.DayModel.remove({}).exec();
//model.PeriodModel.remove({}).exec();
model.SemesterModel.remove({}).exec();

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
addData(getClasses(), model.ClassModel);
addData(getTasks(), model.TaskModel);
//addData(getDays(), model.DayModel);
//addData(getPeriods(), model.PeriodModel);
addData(getSemesters(), model.SemesterModel);

async.series(asyncTasks, function(){
    closeDatabase();
});