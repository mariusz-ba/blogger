import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { prettify } from '../../utils/prettyDate';
import PropTypes from 'prop-types';

const Cover = (props) => (
  <div className="cover">
    <img src={props.img} alt={props.img}/>
  </div>
)

export default class Post extends Component {
  render() {
    const {
      key,
      postId,
      title,
      content,
      cover,
      createdAt
    } = this.props;

    return (
      <li key={key} className="search-posts__item">
        <Cover img={cover}/>
        <div className="post-data">
          <Link to={`/posts/${postId}`}>{title}</Link>
          <p className="post-preview">{content}</p>
          <p className="post-date"><small>{prettify(createdAt)}</small></p>
        </div>
      </li>
    )
  }
}

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  cover: PropTypes.string,
  createdAt: PropTypes.number
}

Post.defaultProps = {
  content: "",
  cover: "",
  createdAt: 0
}