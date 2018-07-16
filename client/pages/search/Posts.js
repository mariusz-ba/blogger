import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Post from './Post';

export default class Posts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <ul className="search-posts">
        {
          posts.map(post => (
            <Post
              key={post._id}
              postId={post._id}
              title={post.title}
              content={post.content.slice(0, 500)}
              cover={post.cover}
              createdAt={post.createdAt}
            />
          ))
        }
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array
}

Posts.defaultProps = {
  posts: []
}