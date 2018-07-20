// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Controllers
import * as commentsController from '../controllers/comment';

const router = express.Router();
router
.get    ('/'    , authenticate, commentsController.getComments)
.get    ('/:id' , authenticate, commentsController.getComment)
.post   ('/'    , authenticate, commentsController.createComment)
.put    ('/:id' , authenticate, commentsController.updateComment)
.delete ('/:id' , authenticate, commentsController.deleteComment);

export default router;