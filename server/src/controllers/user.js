// Module dependencies
import User from '../models/user';

export const getUsers = (req, res) => {
  res.json({})
}

export const getUser = (req, res) => {
  res.json({})
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

export const deleteUser = (req, res) => {
  res.json({})
}