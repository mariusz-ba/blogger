import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import axios from 'axios';

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

    if(id)
      axios.get(`/api/users/${id}`)
        .then(res => this.setState({ user: res.data }))
        .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { user } = this.state;
    console.log(user);

    return (
      <div className="profile">
        <div className="container">
          <header className="header">
            <img className="header__avatar" src="https://source.unsplash.com/random" alt="Profile"/>
            <h2 className="header__name">John Doe</h2>
            <p className="header__description">
              Hi. I am a junior Full-Stack developer. 
              I like to create powerful good-looking web applications with JavsScript.
            </p>
            <div className="actions">
              <button className="actions__follow">Follow</button>
            </div>
          </header>
          <div className="posts">
            <ul className="posts__list">

              <li className="posts__list-item">
                <Link to="#">
                  <img src="https://source.unsplash.com/random" alt="Post"/>
                  <div className="overlay"></div>
                  <small>24-06-2018</small>
                  <h3>Post title</h3>
                </Link>
              </li>

              <li className="posts__list-item">
                <Link to="#">
                  <img src="https://source.unsplash.com/random" alt="Post"/>
                  <div className="overlay"></div>
                  <small>24-06-2018</small>
                  <h3>I like to create powerful good-looking web applications with JavsScript.</h3>
                </Link>
              </li>

              <li className="posts__list-item">
                <Link to="#">
                  <img src="https://source.unsplash.com/random" alt="Post"/>
                  <div className="overlay"></div>
                  <small>24-06-2018</small>
                  <h3>Post title</h3>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps)(Profile));