// Module dependencies
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';

// Models
import User from '../models/user';

// Router
const router = express.Router();
router
.post('/', (req, res, next) => {
  
  const { identifier, password } = req.body;

  User.findOne({
    $or: [
      { username: identifier },
      { email: identifier }
    ]
  })
  .then(user => {
    if(user) {
      if(bcrypt.compareSync(password, user.password)) {
        delete user._doc.password;
        const token = jwt.sign({
          ...user._doc
        }, jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid credentials' }});
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid credentials' }});
    }
  })
})

export default router;