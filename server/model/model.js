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
                studentId: {type: Number, ref: 'Student'}
            }],
        teacherIds: [
            {
                teacherId: {type: Number, ref: 'Teacher'}
            }
        ]
    },
    {collection: 'Class'}
);

var taskSchema = new mongoose.Schema({
        _id: Number,
        task_name: String,
        description: String,
        max_points: Number
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
                classId: {type: Number, ref: 'Class'}
            }],
        dayIds: [
            {
                dayId: {type: Date, ref: 'Day'}

            }],
        taskIds: [
            {
                taskId: {type: Number, ref: 'Task'}
            }]
    },
    {collection: 'Period'}
);

var daySchema = new mongoose.Schema({
    _id: {type: Date, unique: true},
    studentIds: [
        {
            studentId: { type: Number, ref:'Student' }
        }]
},
    {collection: 'Day'}
);


var semesterSchema = new mongoose.Schema({
        _id: Number,
        semester_name: String,
        req_points: Number,
        periodIds: [
            {
                periodId: { type: Number, ref:'Period' }
            }]
    },
    {collection: 'Semester'}
);


exports.StudentModel = mongoose.model('Student', studentSchema);
exports.TeacherModel = mongoose.model('Teacher', teacherSchema);
exports.ClassModel = mongoose.model('Class', classSchema);
exports.TaskModel = mongoose.model('Task', taskSchema);
exports.DayModel = mongoose.model( 'Day', daySchema);
exports.PeriodModel = mongoose.model('Period', periodSchema);
exports.SemesterModel = mongoose.model('Semester', semesterSchema);

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

//var periodSchema = new mongoose.Schema({
//        _id: Number,
//        period_name: String,
//        start_date: Date,
//        end_date: Date,
//        max_points: Number,
//        classIds: [
//            {
//                classId: {type: Number, ref: 'Class'}
//            }],
//        days: [
//            {
//                day: Date,
//                studentIds: [
//                    {
//                        studentId: {type: Number, ref: 'Student'}
//                    }]
//
//            }],
//        taskIds: [
//            {
//                taskId: {type: Number, ref: 'Task'}
//            }]
//    },
//    {collection: 'Period'}
//);