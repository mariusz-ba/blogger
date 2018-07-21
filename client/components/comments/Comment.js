import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { prettify } from '../../utils/prettyDate';
import Avatar from '../avatar';

import Editor from './Editor';

export default class Comment extends Component {
  state = {
    edit: false
  }

  onEditComment = () => {
    this.setState({ edit: !this.state.edit })
  }

  onCommentEdited = (comment) => {
    this.setState({ edit: false })
    this.props.onUpdateComment({
      _id: this.props._id,
      content: comment.content
    })
  }

  render() {
    const { _id, author, content, createdAt, reference } = this.props;
    const { actions } = this.props;

    const ccomment = reference.type === 'comment' ? 'comment--indentation' : '';

    const commentBody = this.state.edit ?
      ( <Editor content={content} onCommentSubmit={this.onCommentEdited} /> ) :
      ( <p>{content}</p> );

    return (
      <div className={`comment ${ccomment}`}>
        <div className="comment__avatar">
          <Avatar img={author.meta.avatar}/>
        </div>
        <div className="comment__content">
          <div className="comment__header">
            <h4 className="comment__author"><Link to={`/profile/${author._id}`}>{author.meta.firstname} {author.meta.lastname}</Link></h4>
            <p className="comment__date"><small>{prettify(createdAt)}</small></p>
            <div className="comment__actions">
              <button className="comment__actions-open">Open</button>
              <ul>
                { actions &&
                  actions.map((action, index) => {
                    if(action.name === 'Edit')
                      action.handler = this.onEditComment;
                    
                    return (
                      <li key={index} className="comment__action">
                        <button className="comment__action-button" onClick={() => action.handler(_id)}>{action.name}</button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="comment__body">
            { commentBody }
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
  }),
  actions: PropTypes.array
}