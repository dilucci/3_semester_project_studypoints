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
    _id: String,
    students: [
        {
            student: { type: Number, ref: 'Student' }
        }],
    teachers: [
        {
            teacher: { type: Number, ref: 'Teacher'}
    }]
});

var semesterSchema = new mongoose.Schema({
    _id: String,
    classes: [
        {
            class: { type: String, ref: 'Class' }
        }],
    periods: [
        {
            period_id: String,
            weeks: [
                {
                    week_id: String,
                    days: [
                        {
                            date: Date,
                            study_point: Number,
                            students: [
                                {
                                    student: { type: Number, ref: 'Student' }
                                }]

                        }]
                }]
        }],
    tasks: [
        {
            task: { type: Number, ref: 'Task' }
        }]
});
var taskSchema = new mongoose.Schema({
    _id: Number,
    task_name: String,
    description: String
});


exports.StudentModel = mongoose.model('Student', studentSchema);
exports.TeacherModel = mongoose.model('Teacher', teacherSchema);
exports.ClassModel = mongoose.model('Class', classSchema);
exports.SemesterModel = mongoose.model( 'Semester', semesterSchema);
exports.TaskModel = mongoose.model( 'Task', taskSchema);
