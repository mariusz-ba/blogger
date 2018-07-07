import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/usersActions';

class Profile extends Component {
  componentDidMount() {
    // Fetch user data
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        <h1>User profile (user id: { id })</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default withRouter(connect(mapStateToProps, { fetchUser })(Profile));