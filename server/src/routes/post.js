// Module dependencies
import express from 'express';

// Controllers
import * as postsController from '../controllers/post';

const router = express.Router();
router
.get    ('/'    , postsController.getPosts)
.get    ('/:id' , postsController.getPost)
.post   ('/'    , postsController.createPost)
.put    ('/:id' , postsController.updatePost)
.delete ('/:id' , postsController.deletePost);

export default router;