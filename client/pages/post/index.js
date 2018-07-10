import React, { Component } from 'react';
import { 
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import Post from './Post';
import PostList from './PostList';
import PostNew from './PostNew';
import PostEdit from './PostEdit';

class Posts extends Component {
  render() {
    return(
      <Switch>
        <Route exact path={this.props.match.path} component={PostList}/>
        <Route path={`${this.props.match.path}/new`} component={PostNew}/>
        <Route path={`${this.props.match.path}/:id/edit`} component={PostEdit}/>
        <Route path={`${this.props.match.path}/:id`} component={Post}/>
      </Switch>
    )
  }
}

export default withRouter(Posts);