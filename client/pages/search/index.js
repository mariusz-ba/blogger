import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../../actions/postsActions';
import { fetchUsers } from '../../actions/usersActions';
import qs from 'querystring';
import { isEmpty } from 'lodash';

import Users from './Users';
import Posts from './Posts';

class Search extends Component {
  componentDidMount = () => {
    // Get route params and get users list and posts
    const { query } = qs.parse(this.props.location.search.slice(1));

    if(query) {
      this.props.fetchPosts({ search: query })
      this.props.fetchUsers({ search: query })
    }
  }
  
  render() {
    const { users, posts } = this.props;

    const notFound = isEmpty(users.users) && isEmpty(posts.posts) ? <div className="not-found">Nothing found...</div> : null;

    return (
      <div className="container">
        <div className="search-results">
          <h2>Searching results</h2>
          { (users.users && Object.values(users.users).length > 0) &&
            (
              <div className="users">
                <h3>Users</h3>
                <Users users={users.users ? Object.values(users.users) : []}/>
              </div>
            )
          }
          { (posts.posts && Object.values(posts.posts).length > 0) &&
            (
              <div className="posts">
                <h3>Posts</h3>
                <Posts posts={posts.posts ? Object.values(posts.posts) : []}/>
              </div>
            )
          }
          { notFound }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users, posts }) => ({ users, posts });

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchUsers })(Search));