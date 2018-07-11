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
  // Determing if user wants to receive his followers or
  // users he's following

  // If req.query.followers is specified followers of given user
  // will be returned.  
  const condition = 
    req.query.followers ? 
    { populate: 'follower', query: { following: req.params.id }} :
    { populate: 'following', query: { follower: req.params.id }};

  Follower.find(condition.query)
    .populate(condition.populate, ['_id', 'meta.firstname', 'meta.lastname', 'meta.avatar'])
    .then(pairs => res.status(200).json(pairs.map(pair => pair[condition.populate])))
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

      return Follower.findOneAndUpdate(
        {
          follower: req.params.id,
          following: req.body.user
        },
        {
          follower: req.params.id,
          following: req.body.user
        }, { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true })
      .populate('follower', ['_id', 'meta.firstname', 'meta.lastname', 'meta.avatar'])
    })
    .then(pair => res.status(200).json(pair.follower))
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
    following: req.query.user
  })
    .then(deleted => res.status(200).json(deleted))
    .catch(err => next(err));
}