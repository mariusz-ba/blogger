import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Avatar extends Component {
  render() {
    const { img } = this.props;

    return (
      <img className="avatar" src={img} alt="Avatar"/>
    )
  }
}

Avatar.propTypes = {
  img: PropTypes.string.isRequired
}