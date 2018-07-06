// Module dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Post schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  cover: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  // Comments
  // Likes
});

const Post = mongoose.model('Post', PostSchema);
export default Post;

