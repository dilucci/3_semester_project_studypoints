var mongoose = require('mongoose');

/** SCHEMAS **/
//var studentSchema = new mongoose.Schema({
//    _id: Number,
//    username: String,
//    email: {type: String, unique: true},
//    study_points_total: Number
//});
//
//var teacherSchema = new mongoose.Schema({
//    _id: Number,
//    username: String,
//    email: {type: String, unique: true}
//});
//
//var classSchema = new mongoose.Schema({
//    class_id: Number,
//    semester_id: Number,
//    period: [
//        {
//            period_id: String,
//            week: [
//                {
//                    week_id: String,
//                    day: [
//                        {
//                            date: Date,
//                            study_point: Number,
//                            students: [
//                                {
//                                    student: { type: Number, ref: 'Student' }
//                                }]
//
//                        }]
//                }]
//        }],
//    students: [
//        {
//            student: { type: Number, ref: 'Student' }
//        }]
//});
//
//var semesterSchema = new mongoose.Schema({
//    semester_id: Number,
//            period: [
//                {
//                    period_id: String,
//                    week: [
//                        {
//                            week_id: String,
//                            day: [
//                                {
//                                    date: Date,
//                                    study_point: Number,
//                                            students: [
//                                                {
//                                                    student: { type: Number, ref: 'Student' }
//                                                }]
//
//                                }]
//                        }]
//                }]
//});
var studentSchema = new mongoose.Schema({
    _id: Number,
    username: {type: String, unique: true},
    first_name: String,
    last_name: String,
    address: String,
    phone: String,
    email: {type: String, unique: true},
    study_points_total: Number
});

var teacherSchema = new mongoose.Schema({
    _id: Number,
    username: {type: String, unique: true},
    first_name: String,
    last_name: String,
    phone: String,
    email: {type: String, unique: true}
});

var classSchema = new mongoose.Schema({
    _id: Number,
    class_name: String,
    students: [
        {
            student: { type: Number, ref: 'Student' }
        }],
    teachers: [
        {
            teacher: { type: Number, ref: 'Teacher'}
    }]
});

var taskSchema = new mongoose.Schema({
    _id: Number,
    task_name: String,
    description: String
});

var periodSchema = new mongoose.Schema({
    _id: Number,
    period_name: String,
    start_date: Date,
    end_date: Date,
    max_points: Number,
    classes: [
        {
            class: { type: Number, ref: 'Class' }
        }],
    days: [
        {
            day: { type: Number, ref: 'Day'}
        }],
    tasks: [
        {
            task: { type: Number, ref: 'Task' }
        }]
});

var daySchema = new mongoose.Schema({
    _id: Number,
    date: Date,
    description: String,
    study_point: Number,
    students: [
        {
            student: { type: Number, ref: 'Student' }
        }]
});


exports.StudentModel = mongoose.model('Student', studentSchema);
exports.TeacherModel = mongoose.model('Teacher', teacherSchema);
exports.ClassModel = mongoose.model('Class', classSchema);
exports.TaskModel = mongoose.model( 'Task', taskSchema);
exports.DayModel = mongoose.model( 'Day', daySchema);
exports.PeriodModel = mongoose.model( 'Period', periodSchema);

//var semesterSchema = new mongoose.Schema({
//    _id: String,
//    classes: [
//        {
//            class: { type: String, ref: 'Class' }
//        }],
//    periods: [
//        {
//            period_id: String,
//            weeks: [
//                {
//                    week_id: String,
//                    days: [
//                        {
//                            date: Date,
//                            study_point: Number,
//                            students: [
//                                {
//                                    student: { type: Number, ref: 'Student' }
//                                }]
//
//                        }]
//                }]
//        }],
//    tasks: [
//        {
//            task: { type: Number, ref: 'Task' }
//        }]
//});