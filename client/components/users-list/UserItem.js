import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserItem extends Component {
  render() {
    const { userId, username, fullName, avatar } = this.props;
    const { onFollowClicked } = this.props;

    return (
      <li className="users-list__item">
        <img className="users-list__avatar" src={avatar} alt="Avatar"/>
        <div className="users-list__name-container">
          <span class="fullname">{fullName}</span>
          <span class="username">{username}</span>
        </div>
        <button onClicked={onFollowClicked}>Follow</button>
      </li>
    )
  }
}

UserItem.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onFollowClicked: PropTypes.func.isRequired
}