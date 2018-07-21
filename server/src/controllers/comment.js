import mongoose from 'mongoose';
import Comment from '../models/comment';

const ObjectId = mongoose.Types.ObjectId;

export const getComments = (req, res, next) => {
  const postId = req.query.post;
  const commentId = req.query.comment;

  const reference = postId ? 
                    { type: 'post', id: postId } : 
                    { type: 'comment', id: commentId };

  console.log('reference: ', reference);
  if(!reference.id) {
    // Both postId and commentId not specified
    Comment.find({})
      .populate('author', ['username', 'meta'])
      .then(comments => res.status(200).json(comments))
      .catch(err => next(err));
  } else {
    Comment.find({
      'reference.type': reference.type,
      'reference.id': reference.id
    })
      .populate('author', ['username', 'meta'])
      .then(comments => res.status(200).json(comments))
      .catch(err => next(err));
  }
}

export const getComment = (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => res.status(200).json(comment))
    .catch(err => next(err));
}

export const createComment = (req, res, next) => {
  const { content, reference } = req.body;
  const author = req.user._id;

  Comment.create({ content, reference, author })
    .then(comment => Comment.populate(comment, { path: 'author', select: ['username', 'meta']}))
    .then(comment => res.status(201).json(comment))
    .catch(err => next(err));
}

export const updateComment = (req, res, next) => {
  const { content } = req.body;

  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid comment identifier' });
    return;
  }

  Comment.findOneAndUpdate(
    { _id: req.params.id }, // Check if id is valid
    { $set: { content, updatedAt: Date.now() }}, 
    { new: true }
  )
    .populate('author', ['username', 'meta'])
    .then(comment => res.status(200).json(comment))
    .catch(err => next(err));
}

export const deleteComment = (req, res, next) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid comment identifier' });
    return;
  }

  Comment.deleteOne({ _id: req.params.id })
    .then(deleted => res.status(200).json(deleted))
    .catch(err => next(err));
}