import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchPost } from '../../actions/postsActions';
import { prettify } from '../../utils/prettyDate';
import axios from 'axios';

class Post extends Component {
  state = {
    recentPosts: [],
    errors: null
  }

  componentDidMount() {
    // Fetch this post
    this.props.fetchPost(this.props.match.params.id)
      .then((action) => {
        // Get authors id and fetch his recent posts
        axios.get(`/api/posts`, { params: { author: action.payload.author._id, limit: 3 }})
          .then(res => this.setState({ recentPosts: res.data }))
          .catch(err => this.setState({ errors: err.response.data }));
      })
  }

  render() {
    const { id } = this.props.match.params;
    const { isFetching, posts } = this.props.posts;
    const { recentPosts } = this.state;

    if(isFetching) {
      // render loading screen
      return (<h1>Loading...</h1>);
    }

    const post = posts ? posts[id] : null;

    if(!post || !post.author || !post.author.meta) {
      // after fetching post doesn't exist
      return (<h1>404. Not found</h1>);
    }

    return (
      <div className="container">
        <div className="post-layout">
          <div className="post">
            <div className="post__header">
              <img className="post__cover" src={post.cover} alt="Cover"/>
            </div>
            <div className="post__content">
              <h5 className="post__subheading">{prettify(post.createdAt)}</h5>
              <h2 className="post__heading">{post.title}</h2>
              <div className="post__content-wrapper" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
          </div>
          <div className="author">
            <h5 className="heading-lined">
              <span>ABOUT AUTHOR</span>
            </h5>
            <img className="author__image" src={post.author.meta.avatar} alt="Author"/>
            <p className="author__description author__description--center"><strong><Link to={`/profile/${post.author._id}`}>{`${post.author.meta.firstname} ${post.author.meta.lastname}`}</Link></strong></p>
            <p className="author__description"><small>{post.author.meta.description}</small></p>
          </div>
          <div className="recent">
            <h5 className="heading-lined">
              <span>RECENT POSTS</span>
            </h5>
            <ul className="recent-list">
              { recentPosts &&
                recentPosts.map(post => (
                  <li className="recent-list__item">
                    <Link to={`/posts/${post._id}`}>
                      <div className="recent-item">
                        <img className="recent-item__cover" src={post.cover} alt="Cover"/>
                        <h5 className="recent-item__heading">{post.title}</h5>
                        <p className="recent-item__subheading"><small>{prettify(post.createdAt)}</small></p>
                      </div>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="advert">
            <img className="advert__image" src="https://15xomi2v386wytrb8nbsoq34-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/300x200-Placeholder-1.png" alt="Advertisement"/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default withRouter(connect(mapStateToProps, { fetchPost })(Post));