import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TabsView from './tabs/TabsView';
import Details from './tabs/Details';
import Password from './tabs/Password';

// Editing users details (fullname, password, etc...)
class ProfileSettings extends Component {
  render() {
    return (
      <div>
        <TabsView tabs={[
          { title: 'Details', component: <Details userId={this.props.auth.user._id}/> },
          { title: 'Change password', component: <Password userId={this.props.auth.user._id}/> }
        ]}/>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(ProfileSettings);