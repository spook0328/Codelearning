const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  age: {
    type: Number,
    default: 18,
    max: [80, "年齡過大了..."],
    min: [0, "年齡不能小於0..."],
  },
  major: { type: String },
  scholarship: {
    merit: { type: Number, min: 0, max: [5000, "數目太大了...."] },
    other: { type: Number, min: 0, default: 0 },
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
