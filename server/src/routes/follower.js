// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Controllers
import * as followerController from '../controllers/follower';

const router = express.Router();
router
.get    ('/:id', authenticate, followerController.getFollowers)
.post   ('/:id', authenticate, followerController.createFollower)
.delete ('/:id', authenticate, followerController.deleteFollower);

export default router;