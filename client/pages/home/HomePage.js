import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postsActions';
import { prettify } from '../../utils/prettyDate';
import axios from 'axios';

class HomePage extends Component {
  state = {
    popularOther: [],
    popularFollowing: [],
    errors: null
  }

  componentDidMount() {
    const { user } = this.props.auth;
    // Fetch most popular posts of followed and not followed users
    axios.get('/api/posts', { params: { follower: user._id, popular: true, limit: 3 }})
      .then(res => this.setState({ popularFollowing: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));

    axios.get('/api/posts', { params: { popular: true, limit: 3}})
      .then(res => this.setState({ popularOther: res.data }))
      .catch(err => this.setState({ errors: err.response.data }));

    this.props.fetchPosts({ follower: user._id, limit: 6 });
  }

  render() {
    const { popularOther, popularFollowing } = this.state;
    const { posts } = this.props.posts;

    return (
      <div className="container">
        <div className="home">
          <div className="home-posts">
            <h2>Discover other people</h2>

            <ul className="posts__list">
              { popularOther &&
                popularOther.map(post => (
                  <li key={post._id} className="posts__list-item">
                    <Link to="#">
                      <img src={post.cover} alt="Post"/>
                      <div className="overlay"></div>
                      <small>{prettify(post.createdAt)}</small>
                      <h3>{post.title}</h3>
                    </Link>
                  </li>
                ))
              }
            </ul>

          </div>

          <div className="home-posts">
            <h2>Most popular posts of people you follow</h2>

            <ul className="posts__list">
              { popularFollowing &&
                popularFollowing.map(post => (
                  <li key={post._id} className="posts__list-item">
                    <Link to="#">
                      <img src={post.cover} alt="Post"/>
                      <div className="overlay"></div>
                      <small>{prettify(post.createdAt)}</small>
                      <h3>{post.title}</h3>
                    </Link>
                  </li>
                ))
              }
            </ul>

          </div>

          <div className="home-posts">
            <h2>Recent posts of people you follow</h2>

            <ul className="posts__list">
              { posts &&
                Object.values(posts).map(post => (
                  <li key={post._id} className="posts__list-item">
                    <Link to="#">
                      <img src={post.cover} alt="Post"/>
                      <div className="overlay"></div>
                      <small>{prettify(post.createdAt)}</small>
                      <h3>{post.title}</h3>
                    </Link>
                  </li>
                ))
              }
            </ul>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, posts }) => ({ auth, posts });

export default connect(mapStateToProps, { fetchPosts })(HomePage);