// Module dependencies
import mongoose from 'mongoose';
import User from '../models/user';

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

  User.find({
    $or: query
  }, { password: false })
    .then(users => res.status(200).json(users))
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

export const updateUser = (req, res) => {
  res.json({})
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