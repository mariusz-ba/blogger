import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class PostEdit extends Component {
  state = {
    title: '',
    cover: '',
    content: '',
    errors: null
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log('id:', id);
    // Load post data
    axios.get(`/api/posts/${id}`)
      .then(res => res.data)
      .then(post => this.setState({
        title: post.title,
        cover: post.cover,
        content: post.content
      }))
      .catch(err => this.setState({ errors: err.response.data.errors }));
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
    const { id } = this.props.match.params;

    axios.put(`/api/posts/${id}`, { title, cover, content })
      .then(res => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    const { title, cover, content } = this.state;

    return (
      <div>
        <div className="container">
          <div className="post-editor">
            <h2>Edit article</h2>
            <form class="form">
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
                <label htmlFor="input-content">Content <small>(HTML markup)</small></label>
                <textarea
                  rows="10" 
                  name="content" 
                  value={content} 
                  onChange={this.changeContent} 
                  id="input-content"></textarea>
              </div>
              <div className="form-field">
                <button type="submit" onClick={this.submit}>Publish</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PostEdit);