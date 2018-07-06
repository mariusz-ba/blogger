// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Controllers
import * as userController from '../controllers/user';

const router = express.Router();
router
.get    ('/'    , userController.getUsers)
.get    ('/:id' , userController.getUser)
.post   ('/'    , userController.createUser)
.put    ('/:id' , authenticate, userController.updateUser)
.delete ('/:id' , authenticate, userController.deleteUser);

export default router;