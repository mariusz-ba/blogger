// Module dependencies
import mongoose from 'mongoose';
import User from '../models/user';

import bcrypt from 'bcrypt';
import { saltRounds } from '../../config';

const ObjectId = mongoose.Types.ObjectId;

export const getUsers = (req, res, next) => {
  // Get filter from req
  User.find({}, { password: false })
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
}

export const getUser = (req, res, next) => {
  // Get user by id or username
  const query = [{ username: req.params.id }];

  if(ObjectId.isValid(req.params.id))
    query.push({ _id: req.params.id })

  User.findOne({
    $or: query
  }, { password: false })
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
}

export const createUser = (req, res, next) => {
  // Creating new user
  const { username, email, password } = req.body;

  User.findOne({
    $or: [
      { username: username },
      { email: email }
    ]
  })
  .then(user => {
    if(user) {
      // User already exists
      const usr = (user.username === username ? { username: 'User with this username already exists' } : null);
      const ema = (user.email === email ? { email: 'User with this email already exists' } : null);
      res.status(405).json({
        errors: { ...usr, ...ema }
      })
    } else {
      // Create new user
      User.create({ username, email, password })
        .then(user => res.status(201).json({
          username,
          ok: true
        }))
    }
  })
  .catch(err => next(err));
}

export const updateUser = (req, res, next) => {
  // Check if we want to update users meta or password
  // Use can only update his own profile
  if(!req.user._id.equals(req.params.id)) {
    res.status(403).json({ message: "You're not allowed"});
    return next(new Error('Tried to edit other users profile'));
  }

  if(req.body.new) {
    // That means we want to update password
    
    // Compare old password with given one
    if(bcrypt.compareSync(req.body.old, req.user.password)) {
      // Passwords are the same hash new password
      bcrypt.hash(req.body.new, saltRounds, (err, hash) => {
        if(err) return next(err);

        User.updateOne({ _id: req.params.id }, { $set: { password: hash }})
          .then(user => res.status(200).json({ ok: 1 }))
          .catch(err => next(err));
      })
    }

  } else {
    // Update users meta data
    User.findOneAndUpdate({ _id: req.params.id }, { $set: { meta: req.body }}, { new: true })
      .then(user => { console.log('user', user); res.status(200).json(user.meta)})
      .catch(err => next(err));
  }
}

export const deleteUser = (req, res, next) => {
  if(ObjectId.isValid(req.params.id)) {
    User.deleteOne({ _id: req.params.id })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => next(err))
  } else {
    res.status(500).json({ message: 'Invalid user id' })
  }
}