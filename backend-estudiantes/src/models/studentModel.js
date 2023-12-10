// studentModel.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  courses: [{
    courseName: String,
    partialGrades: [Number],
    finalGrade: Number,
  }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
