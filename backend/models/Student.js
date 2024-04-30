const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  totalMarks: Number
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
