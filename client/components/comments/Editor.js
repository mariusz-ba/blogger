import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Editor extends Component {
  state = {
    content: ''
  }

  componentDidMount = () => {
    // Set content if specified
    if(this.props.content)
      this.setState({ content: this.props.content });
  }

  contentChange = e => {
    this.setState({ content: e.target.value });
  }

  submitComment = e => {
    e.preventDefault();
    this.props.onCommentSubmit({ content: this.state.content });
    this.setState({ content: '' });
  }

  render() {
    const { content } = this.state;

    const submitText = this.props.submitText ? this.props.submitText : 'Add comment';
    const editorClass = this.props.className ? this.props.className : '';

    return (
      <div className={`comment-editor ${editorClass}`}>
        <form class="form">
          <div className="form-field">
            <textarea
              rows="4"
              className="comment-editor__content"
              placeholder="What do You think about this..."
              value={content}
              onChange={this.contentChange}>
            </textarea>
          </div>
          <div className="form-field">
            <button type="submit" onClick={this.submitComment}>
              { submitText }
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Editor.propTypes = {
  content: PropTypes.string,
  onCommentSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string
}