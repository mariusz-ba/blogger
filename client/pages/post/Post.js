import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchPost } from '../../actions/postsActions';
import { fetchComments, createComment, deleteComment, updateComment } from '../../actions/commentsActions';
import { prettify } from '../../utils/prettyDate';
import axios from 'axios';

import Comment from '../../components/comments/Comment';
import Editor from '../../components/comments/Editor';

class Post extends Component {
  state = {
    recentPosts: [],
    errors: null
  }

  componentDidMount = () => {
    this.updatePostData();
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.location.pathname !== this.props.location.pathname)
      this.updatePostData();
  }
  
  updatePostData = () => {
    // Fetch this post
    this.props.fetchPost(this.props.match.params.id)
      .then((action) => {
        // Get authors id and fetch his recent posts
        axios.get(`/api/posts`, { params: { author: action.payload.author._id, limit: 3 }})
          .then(res => this.setState({ recentPosts: res.data }))
          .catch(err => this.setState({ errors: err.response.data }));
      })
    this.props.fetchComments({ post: this.props.match.params.id });
  }

  submitComment = comment => {
    this.props.createComment({
      content: comment.content,
      reference: {
        type: 'post',
        id: this.props.match.params.id
      }
    })
  }

  onDeleteComment = (commentId) => {
    this.props.deleteComment(commentId);
  }

  render() {
    const { id } = this.props.match.params;
    const { isFetching, posts } = this.props.posts;
    const { comments } = this.props.comments;
    const { recentPosts } = this.state;;

    if(isFetching) {
      // render loading screen
      return (<h1>Loading...</h1>);
    }

    const post = posts ? posts[id] : null;

    if(!post || !post.author || !post.author.meta) {
      // after fetching post doesn't exist
      return (<h1>404. Not found</h1>);
    }

    const commentsActions = [
      { name: 'Delete', handler: this.onDeleteComment },
      { name: 'Edit', handler: null }
    ]

    return (
      <div className="container">
        <div className="post-layout">
          <div>
            <div className="post">
              <div className="post__header">
                <img className="post__cover" src={post.cover} alt="Cover"/>
              </div>
              <div className="post__content">
                <h5 className="post__subheading">{prettify(post.createdAt)}</h5>
                <h2 className="post__heading">{post.title}</h2>
                <div className="post__content-wrapper" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>
            </div>
            <Editor onCommentSubmit={(content) => this.submitComment(content)} />
            { 
              Object.values(comments).map(comment => (
                <Comment 
                  key={comment._id} { ...comment } 
                  actions={commentsActions} 
                  onUpdateComment={(comment) => this.props.updateComment(comment._id, comment)}/>
              ))
            }
          </div>
          <div>
            <div className="author">
              <h5 className="heading-lined">
                <span>ABOUT AUTHOR</span>
              </h5>
              <img className="author__image" src={post.author.meta.avatar} alt="Author"/>
              <p className="author__description author__description--center"><strong><Link to={`/profile/${post.author._id}`}>{`${post.author.meta.firstname} ${post.author.meta.lastname}`}</Link></strong></p>
              <p className="author__description"><small>{post.author.meta.description}</small></p>
            </div>
            <div className="recent">
              <h5 className="heading-lined">
                <span>RECENT POSTS</span>
              </h5>
              <ul className="recent-list">
                { recentPosts &&
                  recentPosts.map(post => (
                    <li className="recent-list__item">
                      <Link to={`/posts/${post._id}`}>
                        <div className="recent-item">
                          <img className="recent-item__cover" src={post.cover} alt="Cover"/>
                          <h5 className="recent-item__heading">{post.title}</h5>
                          <p className="recent-item__subheading"><small>{prettify(post.createdAt)}</small></p>
                        </div>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="advert">
              <img className="advert__image" src="https://15xomi2v386wytrb8nbsoq34-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/300x200-Placeholder-1.png" alt="Advertisement"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }) => ({ posts, comments });

export default withRouter(connect(mapStateToProps, { fetchPost, fetchComments, createComment, deleteComment, updateComment })(Post));