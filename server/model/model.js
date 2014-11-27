var mongoose = require( 'mongoose' );

/*

Note:
To this test project as it is:

Start your MongoDB database.
Start mongo.exe and do:
  use testdb
  db.testusers.insert({userName : "Lars", email :"lam@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})

*/

/** Profile SCHEMA **/
/** SQL database **/
var profileSchema = new mongoose.Schema({
  _id: Number,
  userName : String,
  email: {type: String, unique: true},
  pw: String,
  created: { type: Date, default: new Date() },
  role: String
});

/** Student SCHEMA **/
/** Replace this Schema with your own(s) **/
var studentSchema = new mongoose.Schema({
  _id: Number,
  first_name: String,
  last_name: String,
  email: {type: String, unique: true},
  study_points: Number
});

/** Teacher SCHEMA **/
/** Replace this Schema with your own(s) **/
var teacherSchema = new mongoose.Schema({
  _id: Number,
  first_name: String,
  last_name: String,
  email: {type: String, unique: true}
});


exports.ProfileModel = mongoose.model( 'Profile', profileSchema);
exports.StudentModel = mongoose.model( 'Student', studentSchema);
exports.TeacherModel = mongoose.model( 'Teacher', teacherSchema);