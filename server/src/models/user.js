// Module dependencies
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { saltRounds } from '../../config';
const Schema = mongoose.Schema;


// User schema
const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }},
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
});


// Pre hook, hash password before inserting into database
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if(err) return next(err);

    this.password = hash;
    next();
  })
});


const User = mongoose.model('User', UserSchema);
export default User;