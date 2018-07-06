// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Controllers
import * as postsController from '../controllers/post';

const router = express.Router();
router
.get    ('/'    , postsController.getPosts)
.get    ('/:id' , postsController.getPost)
.post   ('/'    , authenticate, postsController.createPost)
.put    ('/:id' , authenticate, postsController.updatePost)
.delete ('/:id' , authenticate, postsController.deletePost);

export default router;