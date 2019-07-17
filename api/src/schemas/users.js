import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const userSchema = new Schema({
  id: {
    type: Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /\S+@\S+\.\S+/,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    minlength: 8,
    match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/,
    unique: true,
    required: true,
  },
  projects: [{
    projectId: {
      type: Types.ObjectId,
    },
  }],
}, { timestamps: true });


module.exports = mongoose.model('Users', userSchema);
