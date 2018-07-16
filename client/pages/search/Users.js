import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User';

export default class Users extends Component {
  render() {
    const { users } = this.props;

    return (
      <ul className="search-users">
        {
          users.map(user => (
            <User
              key={user._id}
              userId={user._id}
              username={user.username}
              firstname={user.meta.firstname}
              lastname={user.meta.lastname}
              avatar={user.meta.avatar}
              description={user.meta.description}
            />
          ))
        }
      </ul>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array
}

Users.defaultProps = {
  users: []
}