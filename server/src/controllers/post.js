// Module dependencies
import mongoose from 'mongoose';
import Post from '../models/post';
import Follower from '../models/follower';
import { pick } from 'lodash';

const ObjectId = mongoose.Types.ObjectId;

export const getPosts = (req, res, next) => {
  // Get filter from req
  //const filter = pick(req.query, ['author']);

  const filter = req.query.author ? { author: req.query.author } : {};

  if(req.query.follower) {
    // Order and limit
    const modifiers = req.query.limit ? { limit: parseInt(req.query.limit) } : {};
    
    console.log('follower: ', req.query.follower);

    // Get all people that filter.follower is following
    Follower.find({ follower: req.query.follower })
      .then(pair => pair.map(entry => entry.following))
      .then(following => Post.find({
        author: { $in: following }
      }, ['title', 'createdAt', 'cover'], modifiers))
      .then(posts => res.status(200).json(posts))
      .catch(err => next(err));
  } else {
    Post.find(filter)
      .populate('author', 'username')
      .then(posts => res.status(200).json(posts))
      .catch(err => next(err));
  }
}

export const getPost = (req, res, next) => {
  // Get post by id
  const { id } = req.params;

  if(!ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Not found' });
    return next(new Error('Invalid post id'));
  }

  Post.findOne({ _id: id })
    .populate('author', 'username')
    .then(post => res.status(200).json(post))
    .catch(err => next(err));
}

export const createPost = (req, res, next) => {
  console.log(req.body);
  const { title, content, cover } = req.body;
  const author = req.user._id;
  // User must be authenticated. We can take user id
  // from req.user
  Post.create({ title, content, cover, author })
    .then(post => res.status(201).json(post))
    .catch(err => next(err));
}

export const updatePost = (req, res, next) => {
  const { id } = req.params;
  const { title, content, cover } = req.body;
  const user = req.user._id;
  // Check if authenticated user is the
  // post author.
  Post.findById(id)
    .then(post => {
      if(!post.author.equals(user)) {
        res.status(401).json({ message: "You can't edit this post" });
        throw 'Access Denied - Editing post';
      }
      return post;
    })
    .then(post => Post.updateOne({ _id: post._id }, { title, content, cover, updatedAt: Date.now() }, { new: true }))
    .then(post => res.status(200).json(post))
    .catch(err => next(err));
}

export const deletePost = (req, res, next) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Not found' });
    throw new Error('Invalid post id')
  }

  Post.deleteOne({ _id: id })
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}