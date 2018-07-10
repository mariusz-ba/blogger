import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../actions/usersActions';

// Editing users details (fullname, password, etc...)
class ProfileSettings extends Component {
  state = {
    user: null,
    errors: null
  }

  componentDidMount() {
    const { _id } = this.props.auth.user;

    axios.get(`/api/users/${_id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <code>
          <pre>{user && JSON.stringify(user, null, 2)}</pre>
        </code>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { updateUser })(ProfileSettings);