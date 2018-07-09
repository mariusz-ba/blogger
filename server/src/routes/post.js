// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Controllers
import * as postsController from '../controllers/post';

const router = express.Router();
router
.get    ('/'    , authenticate, postsController.getPosts)
.get    ('/:id' , authenticate, postsController.getPost)
.post   ('/'    , authenticate, postsController.createPost)
.put    ('/:id' , authenticate, postsController.updatePost)
.delete ('/:id' , authenticate, postsController.deletePost);

export default router;