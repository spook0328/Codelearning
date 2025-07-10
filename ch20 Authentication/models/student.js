const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
