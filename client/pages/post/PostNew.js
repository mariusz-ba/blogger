import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class PostNew extends Component {
  state = {
    title: '',
    cover: '',
    content: '',
    errors: null
  }

  changeTitle = e => {
    this.setState({ title: e.target.value });
  }

  changeCover = e => {
    this.setState({ cover: e.target.value });
  }

  changeContent = e => {
    this.setState({ content: e.target.value });
  }

  submit = e => {
    e.preventDefault();
    // Publish post
    const { title, cover, content } = this.state;
    axios.post('/api/posts', { title, cover, content })
      .then(res => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    const { title, cover, content } = this.state;

    return (
      <div className="container">
        <div className="post-editor">
          <h2>Create new article</h2>
          <form className="form">
            <div className="form-field">
              <label htmlFor="input-title">Title</label>
              <input 
                name="title"
                value={title} 
                onChange={this.changeTitle} 
                id="input-title"/>
            </div>
            <div className="form-field">
              <label htmlFor="input-cover">Cover</label>
              <input 
                name="cover" 
                value={cover} 
                onChange={this.changeCover} 
                id="input-cover"/>
            </div>
            <div className="form-field">
              <label htmlFor="textarea-content">Content <small>(HTML markup)</small></label>
              <textarea 
                rows="10"
                name="content" 
                value={content} 
                onChange={this.changeContent} 
                id="textarea-content"></textarea>
            </div>
            <div className="form-field">
              <button type="submit" onClick={this.submit}>Publish</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(PostNew);