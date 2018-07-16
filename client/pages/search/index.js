import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../../actions/postsActions';
import { fetchUsers } from '../../actions/usersActions';
import qs from 'querystring';

import Users from './Users';

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

    return (
      <div>
        <code><pre>{JSON.stringify({ users, posts })}</pre></code>
        <h1>Searching page</h1>
        <div>
          <h2>Searching results</h2>
          <div>
            <h3>Users</h3>
            <Users users={users.users ? Object.values(users.users) : []}/>
          </div>
          <div>
            <h3>Posts</h3>
            <ul>
              { posts.posts && 
                Object.values(posts.posts).map(post => (
                  <li key={post._id}>{post.title}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users, posts }) => ({ users, posts });

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchUsers })(Search));