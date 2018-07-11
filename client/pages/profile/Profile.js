import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import axios from 'axios';
import { fetchPosts } from '../../actions/postsActions';
import { prettify } from '../../utils/prettyDate';

class Profile extends Component {
  state = {
    user: null,
    errors: null
  }

  componentDidMount() {
    // If :id route param was specified by the user
    // we need to render :id profile page. Otherwise
    // currently signed users profile should be displayed.
    // All this function has to do is to set appripiate id
  
    const { isAuthenticated, user } = this.props.auth;
    let { id } = this.props.match.params;

    if(!id) {
      // Render current user profile
      if(isAuthenticated)
        id = user._id;
      else
        id = null;
    }

    if(id) {
      axios.get(`/api/users/${id}`)
        .then(res => this.setState({ user: res.data }))
        .catch(err => this.setState({ errors: err.response.data }));
      this.props.fetchPosts({ author: id });
    }
  }

  render() {
    const { auth } = this.props;
    const { user } = this.state;
    const { posts } = this.props.posts;

    const actions = ((auth.user && user && auth.isAuthenticated) && auth.user._id === user._id) ?
      ( 
        <React.Fragment>
          <Link to="/profile/settings" className="actions__settings"><i class="fas fa-cog"></i>Settings</Link>
          <button className="actions__followers">Followers</button>
          <button className="actions__following">Following</button>
        </React.Fragment>
      ) :
      ( <button className="actions__follow">Follow</button> );

    return (
      <div className="profile">
        <div className="container">
          <header className="header">
            <img className="header__avatar" src={user && user.meta.avatar} alt="Profile"/>
            <h2 className="header__name">{user && `${user.meta.firstname} ${user.meta.lastname}`}</h2>
            <p className="header__description">{ user && user.meta.description }</p>
            <div className="actions">{ actions }</div>
          </header>
          <div className="posts">
            <ul className="posts__list">

              { posts &&
                Object.values(posts).map(post => (
                  <li className="posts__list-item">
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

export default withRouter(connect(mapStateToProps, { fetchPosts })(Profile));