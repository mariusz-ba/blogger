import React, { Component } from 'react';
import axios from 'axios';

export default class Details extends Component {
  state = {
    meta: {
      firstname: '',
      lastname: '',
      avatar: '',
      description: ''
    },
    errors: null
  }

  componentDidMount() {
    // Get users meta data
    axios.get(`/api/users/${this.props.userId}`)
      .then(res => this.setState({ meta: res.data.meta }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  changeStateProperty = (property, value) => {
    this.setState({ ...this.state, meta: { ...this.state.meta, [property]: value }});
  }

  onSubmit = e => {
    e.preventDefault();
    // Update users meta data
    axios.put(`/api/users/${this.props.userId}`, this.state.meta)
      .then(res => this.setState({ meta: res.data }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { firstname, lastname, avatar, description } = this.state.meta;

    return (
      <div className="tab-details">
        <h2>Edit details</h2>
        <form className="form">
          <div className="form-field">
            <label htmlFor="input-firstname">Firstname</label>
            <input 
              id="input-firstname"
              type="text" 
              placeholder="firstname" 
              name="firstname" 
              value={firstname} 
              onChange={(e) => this.changeStateProperty('firstname', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="input-lastname">Lastname</label>
            <input 
              id="input-lastname"
              type="text" 
              placeholder="lastname" 
              name="lastname" 
              value={lastname} 
              onChange={(e) => this.changeStateProperty('lastname', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="input-avatar">Avatar</label>
            <input 
              id="input-avatar"
              type="text" 
              placeholder="avatar" 
              name="avatar" 
              value={avatar} 
              onChange={(e) => this.changeStateProperty('avatar', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="textarea-description">Description</label>
            <textarea
              rows="6"
              name="textarea-description" 
              onChange={(e) => this.changeStateProperty('description', e.target.value)}
              value={description}>
            </textarea>
          </div>
          <div className="form-field">
            <button type="submit" onClick={this.onSubmit}>Update</button>
          </div>
        </form>
      </div>
    )
  }
}