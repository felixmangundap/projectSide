import mongoose from 'mongoose';

const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const ideaSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title can\'t be empty'],
  },
  ownerId: {
    type: ObjectId,
    required: [true, 'Owner ID can\'t be empty'],
    ref: 'Users',
  },
  description: {
    type: String,
    required: [true, 'Description can\'t be empty'],
  },
  tags: [{
    tag: {
      type: String,
      lowercase: true,
      required: true,
    },
  }],
}, { timestamps: true });


module.exports = mongoose.model('Projects', ideaSchema);
