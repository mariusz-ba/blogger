import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchPost } from '../../actions/postsActions';

class Post extends Component {
  componentDidMount() {
    // Fetch this post
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {
    const { id } = this.props.match.params;
    const { isFetching, posts } = this.props.posts;

    if(isFetching) {
      // render loading screen
      return (<h1>Loading...</h1>);
    }

    const post = posts ? posts[id] : null;

    if(!post) {
      // after fetching post doesn't exist
      return (<h1>404. Not found</h1>);
    }

    return (
      <div className="container">
        <div className="post-layout">
          <div className="post">
            <div className="post__header">
              <img className="post__cover" src={post.cover} alt="Cover"/>
            </div>
            <div className="post__content">
              <h5 className="post__subheading">{post.createdAt}</h5>
              <h2 className="post__heading">{post.title}</h2>
              <div className="post__content-wrapper" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
          </div>
          <div className="author">
            <h5 className="heading-lined">
              <span>ABOUT ME</span>
            </h5>
            <img className="author__image" src="https://source.unsplash.com/random" alt="Author"/>
            <p className="author__description"><small>Praesent in varius orci. Vestibulum purus mi, pharetra at interdum ut, volutpat sit amet ante. Quisque ultricies enim ac felis aliquam egestas.</small></p>
          </div>
          <div className="recent">
            <h5 className="heading-lined">
              <span>RECENT POSTS</span>
            </h5>
            <ul className="recent-list">
              <li className="recent-list__item">
                <Link to="/">
                  <div className="recent-item">
                    <img className="recent-item__cover" src="https://source.unsplash.com/random" alt="Cover"/>
                    <h5 className="recent-item__heading">Mauris sollicitudin ex dictum rutrum gravida.</h5>
                    <p className="recent-item__subheading"><small>23-06-2018</small></p>
                  </div>
                </Link>
              </li>
              <li className="recent-list__item">
                <Link to="/">
                  <div className="recent-item">
                  <img className="recent-item__cover" src="https://source.unsplash.com/random" alt="Cover"/>
                    <h5 className="recent-item__heading">Mauris sollicitudin ex dictum rutrum gravida.</h5>
                    <p className="recent-item__subheading"><small>23-06-2018</small></p>
                  </div>
                </Link>
              </li>
              <li className="recent-list__item">
                <Link to="/">
                  <div className="recent-item">
                  <img className="recent-item__cover" src="https://source.unsplash.com/random" alt="Cover"/>
                    <h5 className="recent-item__heading">Mauris sollicitudin ex dictum rutrum gravida.</h5>
                    <p className="recent-item__subheading"><small>23-06-2018</small></p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="advert">
            <img className="advert__image" src="https://15xomi2v386wytrb8nbsoq34-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/300x200-Placeholder-1.png" alt="Advertisement"/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default withRouter(connect(mapStateToProps, { fetchPost })(Post));