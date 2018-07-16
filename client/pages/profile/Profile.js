import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import axios from 'axios';
import { fetchPosts } from '../../actions/postsActions';
import { prettify } from '../../utils/prettyDate';

import UsersList from '../../components/users-list/UsersList';
import Modal from '../../components/modal/Modal';

class Profile extends Component {
  state = {
    user: null,
    followers: [],
    following: [],
    showFollowers: false,
    showFollowing: false,
    errors: null,
  }

  loadUserProfile = (id) => {
    // Get users data
    axios.get(`/api/users/${id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => this.setErrors(err.response.data));
    // Get users followers
    axios.get(`/api/followers/${id}`, { params: { followers: true }})
      .then(res => this.setState({ followers: res.data }))
      .catch(err => this.setErrors(err.response.data));
    // Get users followed by user
    axios.get(`/api/followers/${id}`)
      .then(res => this.setState({ following: res.data }))
      .catch(err => this.setErrors(err.response.data));
    this.props.fetchPosts({ author: id });
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

    if(id)
      this.loadUserProfile(id);
  }

  componentWillReceiveProps(nextProps) {
    const nextProfile = nextProps.match.params.id;
    if(nextProfile !== this.props.match.params.id) {
      // Route has hanged, load user
      const { isAuthenticated, user } = this.props.auth;
      let id = nextProfile;
    
      if(!id) {
        // Render current user profile
        if(isAuthenticated)
          id = user._id;
        else
          id = null;
      }
      this.loadUserProfile(id);
    }
  }

  setErrors = errors => {
    this.setState({ errors })
  }

  onFollow = (user) => {
    axios.post(`/api/followers/${this.props.auth.user._id}`, { user })
      .then(res => this.setState({ followers: [ ...this.state.followers, res.data]}))
      .catch(err => this.setErrors(err.response.data))
  }

  onUnfollow = (user) => {
    const { followers } = this.state;
    const index = followers.map(entry => entry._id).indexOf(this.props.auth.user._id);

    axios.delete(`/api/followers/${this.props.auth.user._id}`, { params: { user }})
      .then(res => {
        if(res.data.n === 1 && res.data.ok === 1)
          this.setState(
            { followers: [ 
              ...followers.slice(0, index),
              ...followers.slice(index + 1)
            ]}
          )
      })
      .catch(err => this.setErrors(err.response.data));
  }

  render() {
    const { auth } = this.props;
    const { user, followers, following } = this.state;
    const { posts } = this.props.posts;
    const { showFollowers, showFollowing } = this.state;

    let actions;

    if(auth.user && user && auth.isAuthenticated) {
      // Make sure user is authenticated and user isn't null

      if(auth.user._id === user._id) {
        // User is on his profile
        actions = ( 
          <React.Fragment>
            <Link to="/profile/settings" className="actions__settings"><i class="fas fa-cog"></i>Settings</Link>
            <button className="actions__followers" onClick={() => this.setState({ showFollowers: true })}>{followers.length} Followers</button>
            <button className="actions__following" onClick={() => this.setState({ showFollowing: true })}>{following.length} Following</button>
          </React.Fragment>
        );
      } else {
        // Other users profile
        // Check if user A is following user B
        if(this.state.followers && this.state.followers.map(entry => entry._id).includes(auth.user._id))
          actions = ( <button className="actions__follow--unfollow" onClick={() => this.onUnfollow(user._id)}>Unfollow</button> );
        else
          actions = ( <button className="actions__follow" onClick={() => this.onFollow(user._id)}>Follow</button> );
      }
    }

    return (
      <div className="profile">
        <div className="container">
          <header className="header">
            <img className="header__avatar" src={user && user.meta.avatar} alt="Profile"/>
            <h2 className="header__name">{user && `${user.meta.firstname} ${user.meta.lastname}`}</h2>
            <p className="header__description">{ user && user.meta.description }</p>
            <div className="actions">{ actions }</div>

            { showFollowers && <Modal onClose={() => this.setState({ showFollowers: false })}><UsersList users={followers}/></Modal> }
            { showFollowing && <Modal onClose={() => this.setState({ showFollowing: false })}><UsersList users={following}/></Modal> }
          </header>
          <div className="posts">
            <ul className="posts__list">

              { posts &&
                Object.values(posts).map(post => (
                  <li key={post._id} className="posts__list-item">
                    <Link to={`/posts/${post._id}`}>
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