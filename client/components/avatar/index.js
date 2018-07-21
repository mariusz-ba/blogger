import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  width: 32,
  height: 32,
  borderRadius: '50%'
}

export default class Avatar extends Component {
  render() {
    const { img } = this.props;

    return (
      <img style={style} src={img} alt="Avatar"/>
    )
  }
}

Avatar.propTypes = {
  img: PropTypes.string.isRequired
}