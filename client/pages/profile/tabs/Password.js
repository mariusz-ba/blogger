import React, { Component } from 'react';
import axios from 'axios';

export default class Password extends Component {
  state = {
    password: {
      old: '',
      new: '',
      confirm: ''
    },
    submitDisabled: false,
    errors: null
  }

  changeStateProperty = (property, value) => {
    this.setState({ ...this.state, password: { ...this.state.password, [property]: value }});
  }

  onSubmit = e => {
    e.preventDefault();
    // Update users password
    this.setState({ submitDisabled: true })
    axios.put(`/api/users/${this.props.userId}`, this.state.password)
      .then(res => this.setState({ submitDisabled: false }))
      .catch(err => this.setState({ errors: err.response.data.errors, submitDisabled: false })); 
  }

  render() {
    const { password } = this.state;

    return (
      <div className="tab-password">
        <h2>Change password</h2>
        <form className="form">
          <div className="form-field">
            <label htmlFor="old-password">Old password</label>
            <input
              id="old-password"
              type="password" 
              placeholder="Your current password" 
              name="old-password" 
              value={password.old} 
              onChange={(e) => this.changeStateProperty('old', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="new-password">New password</label>
            <input 
              id="new-password"
              type="password" 
              placeholder="Your new password" 
              name="new-password" 
              value={password.new} 
              onChange={(e) => this.changeStateProperty('new', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="confirm-password">Confirm password</label>
            <input 
              id="confirm-password"
              type="password" 
              placeholder="Type new password once again" 
              name="confirm-password" 
              value={password.confirm} 
              onChange={(e) => this.changeStateProperty('confirm', e.target.value)}
            />
          </div>
          <div className="form-field">
            <button type="submit" onClick={this.onSubmit} disabled={this.state.submitDisabled}>Change my password</button>
          </div>
        </form>
      </div>  
    )
  }
}