// Module dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Follower schema
const FollowerSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  following: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

FollowerSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follower = mongoose.model('Follower', FollowerSchema);
export default Follower;