import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

export default class UsersList extends Component {
  onFollowClicked = () => {
    // Perform follow/unfollow operation
    console.log('Follow/Unfollow');
  }

  render() {
    const { users } = this.props;

    return (
      <ul className="users-list">
        { users &&
          users.map(user => (
            <UserItem
              userId={user._id}
              username={user.username}
              fullName={`${user.meta.firstname} ${user.meta.lastname}`}
              avatar={user.meta.avatar}
              onFollowClicked={() => this.onFollowClicked(user._id)}
            />
          ))
        }
      </ul>
    )
  }
}

UsersList.propTypes = {
  // Array of users from from server response
  users: PropTypes.array.isRequired
}