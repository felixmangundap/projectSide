import mongoose from 'mongoose';

const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title can\'t be empty'],
  },
  ownerId: {
    type: ObjectId,
    required: [true, 'Owner ID can\'t be empty'],
  },
  tagline: {
    type: String,
    required: [true, 'Owner ID can\'t be empty'],
  },
  description: {
    type: String,
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
  }],
  links: [{
    type: {
      type: String,
      lowercase: true,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
}, { timestamps: true });


module.exports = mongoose.model('Projects', projectSchema);
