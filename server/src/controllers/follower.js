import mongoose from 'mongoose';
import Follower from '../models/follower';

/**
 * This function is responsible for returning list
 * of users that user specified by req.id is following
 * 
 * @param {Object} req - Router request object
 * @param {Object} res - Router response object
 */
export const getFollowers = (req, res, next) => {
  Follower.find({ follower: req.params.id }, { follower: false })
    .populate('following')
    .then(followers => res.status(200).json(followers))
    .catch(err => next(err));
}

/**
 * Use this function to create new follower pair.
 * User specified as :id in route param will be assigned
 * as a follower of req.body.user
 * 
 * @param req 
 * @param res 
 */''
export const createFollower = (req, res) => {
  Follower.findOne({
    follower: req.params.id,
    following: req.body.user
  })
    .then(follower => {
      if(follower) {
        res.status(400).json({ message: 'You are already following this user'});
        throw 'Already following';
      }

      return Follower.create({
        follower: req.params.id,
        following: req.body.user
      })
    })
    .then(follower => res.status(200).json(follower))
    .catch(err => next(err));
}

/**
 * Use this function to unfollow certain user.
 * User specified by :id in route param will no longer
 * be following req.body.user
 * 
 * @param req 
 * @param res 
 */
export const deleteFollower = (req, res) => {
  Follower.deleteOne({
    follower: req.params.id,
    following: req.body.user
  })
    .then(deleted => res.status(200).json(deleted))
    .catch(err => next(err));
}