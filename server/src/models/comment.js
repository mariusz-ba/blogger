// Module dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Comment schema
const CommentSchema = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  reference: {
    type: { type: String, required: true, default: 'post' },
    id: { type: Schema.Types.ObjectId, required: true }
  },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;


