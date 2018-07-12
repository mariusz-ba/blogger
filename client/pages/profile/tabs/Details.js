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
        <h1>Details edit</h1>
        <code><pre>{JSON.stringify(this.state, null, 2)}</pre></code>
        <form>
          <input 
            type="text" 
            placeholder="firstname" 
            name="firstname" 
            value={firstname} 
            onChange={(e) => this.changeStateProperty('firstname', e.target.value)}
          />
          <input 
            type="text" 
            placeholder="lastname" 
            name="lastname" 
            value={lastname} 
            onChange={(e) => this.changeStateProperty('lastname', e.target.value)}
          />
          <input 
            type="text" 
            placeholder="avatar" 
            name="avatar" 
            value={avatar} 
            onChange={(e) => this.changeStateProperty('avatar', e.target.value)}
          />
          <textarea 
            name="description" 
            onChange={(e) => this.changeStateProperty('description', e.target.value)}
            value={description}>
          </textarea>
          <button type="submit" onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}