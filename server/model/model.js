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
},
    {collection: 'Student'}
);

var teacherSchema = new mongoose.Schema({
    _id: Number,
    username: {type: String, unique: true},
    first_name: String,
    last_name: String,
    phone: String,
    email: {type: String, unique: true}
},
    {collection: 'Teacher'}
);

var classSchema = new mongoose.Schema({
    _id: Number,
    class_name: String,
    studentIds: [
        {
            studentId: { type: Number }
        }],
    teacherIds: [
        {
            teacherId: { type: Number }
    }]
    },
{collection: 'Class'}
);

var taskSchema = new mongoose.Schema({
    _id: Number,
    task_name: String,
    description: String
},
    {collection: 'Task'}
);

var periodSchema = new mongoose.Schema({
    _id: Number,
    period_name: String,
    start_date: Date,
    end_date: Date,
    max_points: Number,
    classIds: [
        {
            classId: { type: Number }
        }],
    dayIds: [
        {
            dayId: { type: Number }
        }],
    taskIds: [
        {
            taskId: { type: Number }
        }]
},
{collection: 'Period'}
);

var daySchema = new mongoose.Schema({
    _id: Number,
    date: Date,
    description: String,
    study_point: Number,
    studentIds: [
        {
            studentId: { type: Number }
        }]
},
{collection: 'Day'}
);


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