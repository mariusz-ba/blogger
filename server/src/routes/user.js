// Module dependencies
import express from 'express';

// Controllers
import * as userController from '../controllers/user';

const router = express.Router();
router
.get    ('/'    , userController.getUsers)
.get    ('/:id' , userController.getUser)
.post   ('/'    , userController.createUser)
.put    ('/:id' , userController.updateUser)
.delete ('/:id' , userController.deleteUser);

export default router;