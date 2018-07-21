import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { prettify } from '../../utils/prettyDate';
import Avatar from '../avatar';

export default class Comment extends Component {
  render() {
    const { author, content, createdAt, reference } = this.props;

    const ccomment = reference.type === 'comment' ? 'comment--indentation' : '';

    return (
      <div className={`comment ${ccomment}`}>
        <div className="comment__avatar">
          <Avatar img={author.meta.avatar}/>
        </div>
        <div className="comment__content">
          <div className="comment__header">
            <h4 className="comment__author"><Link to={`/profile/${author._id}`}>{author.meta.firstname} {author.meta.lastname}</Link></h4>
            <p className="comment__date"><small>{prettify(createdAt)}</small></p>
          </div>
          <div className="comment__body">
            <p>{content}</p>
          </div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  _id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      avatar: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string
    })
  }),
  reference: PropTypes.shape({
    type: PropTypes.string.isRequired
  })
}