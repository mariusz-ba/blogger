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
        <h1>Change password</h1>
        <code><pre>{JSON.stringify(this.state, null, 2)}</pre></code>
        <form>
          <input 
            type="password" 
            placeholder="old password" 
            name="old-password" 
            value={password.old} 
            onChange={(e) => this.changeStateProperty('old', e.target.value)}
          />
          <input 
            type="password" 
            placeholder="new password" 
            name="new-password" 
            value={password.new} 
            onChange={(e) => this.changeStateProperty('new', e.target.value)}
          />
          <input 
            type="password" 
            placeholder="confirm password" 
            name="confirm-password" 
            value={password.confirm} 
            onChange={(e) => this.changeStateProperty('confirm', e.target.value)}
          />
          <button type="submit" onClick={this.onSubmit} disabled={this.state.submitDisabled}>Submit</button>
        </form>
      </div>  
    )
  }
}