import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/avatar';

export default class User extends Component {
  render() {
    const { 
      key, 
      userId, 
      username, 
      firstname, 
      lastname, 
      avatar, 
      description
    } = this.props;

    const displayName = firstname || lastname ? `${firstname} ${lastname}` : username;

    return (
      <li key={key} className="search-users__item">
        <Avatar img={avatar}/>
        <div className="user-data">
          <Link to={`/profile/${userId}`}>{displayName}</Link>
          <p className="user-description">{description}</p>
        </div>
      </li>
    )
  }
}