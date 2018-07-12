import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TabsView extends Component {
  state = {
    current: 0
  }

  setCurrent = (index) => {
    this.setState({ current: index })
  }

  render() {
    const { current } = this.state;
    const { tabs } = this.props;

    return (
      <div>
        <ul>
          {
            tabs.map((tab, index) => (
              <li key={index} onClick={() => this.setCurrent(index)}>{tab.title}</li>
            ))
          }
        </ul>
        <div>
          {tabs[current].component}
        </div>
      </div>
    )
  }
}

TabsView.propTypes = {
  tabs: PropTypes.array.isRequired
}