import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = "modal";

    // Handle click outside to close modal
    document.addEventListener('click', this.handleClickOutside);

    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if(this.modalBox && !this.modalBox.contains(e.target)) {
      // Clicked outside close the modal
      this.props.onClose();
    }
  }

  _render() {
    ReactDOM.render(
      <React.Fragment>
        <div className="modal-overlay"></div>
        <div className="modal-box" ref={(node) => {this.modalBox = node}}>
          {this.props.children}
        </div>
      </React.Fragment>,
      this.modalTarget
    )
  }

  render() {
    return <noscript/>;
  }
}