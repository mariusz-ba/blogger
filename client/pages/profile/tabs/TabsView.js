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
      <div className="container">
        <div className="tabs-view">
          <ul className="tabs-menu">
            {
              tabs.map((tab, index) => {
                const currentClass = (index === current) ? 'tabs-menu__item--current' : '';
                return (
                  <li className={`tabs-menu__item ${currentClass}`} key={index} onClick={() => this.setCurrent(index)}>{tab.title}</li>
                )
              })
            }
          </ul>
          <div className="tabs-content">
            {tabs[current].component}
          </div>
        </div>
      </div>
    )
  }
}

TabsView.propTypes = {
  tabs: PropTypes.array.isRequired
}