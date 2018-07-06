import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config';

import User from '../models/user';

export default (req, res, next) => {
  // Check user token
  const authorizationHeader = req.headers['authorization'];
  let token;

  if(authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if(token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        User.findOne({ _id: decoded._id })
          .then(user => {
            req.user = user;
            next();
          })
          .catch(err => res.status(404).json({ error: 'No such user' }))
      }
    })
  } else {
    res.status(403).json({
      error: 'No token provided'
    })
  }
}