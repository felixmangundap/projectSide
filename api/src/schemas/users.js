import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email'],
    index: {
      unique: [true, 'Email already exists'],
    },
    required: [true, 'Email can\'t be empty'],
  },
  password: {
    type: String,
    minlength: [8, 'Invalid Password'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/, 'Invalid password'],
    required: [true, 'Password can\'t be empty'],
  },
  projects: [{
    projectId: {
      type: Types.ObjectId,
    },
  }],
}, { timestamps: true });


module.exports = mongoose.model('Users', userSchema);
