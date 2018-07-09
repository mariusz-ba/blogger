import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Post extends Component {
  render() {
    return (
      <div className="container">
        <div className="post-layout">
          <div className="post">
            <div className="post__header">
              <img className="post__cover" src="https://source.unsplash.com/random" alt="Cover"/>
            </div>
            <div className="post__content">
              <h5 className="post__subheading">24-06-2018</h5>
              <h2 className="post__heading">Post heading</h2>
              <div className="post__content-wrapper">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum faucibus tellus. Quisque ornare magna vitae commodo convallis. Aliquam vel risus feugiat, pellentesque lectus eget, lacinia purus. Fusce non ante sodales, mattis nibh eget, tincidunt justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eleifend mollis ipsum at feugiat. Morbi tincidunt porttitor dui eget elementum. Mauris auctor sem posuere turpis mattis, eget elementum ex imperdiet. Duis egestas, justo aliquam aliquam lobortis, lacus elit elementum dolor, vitae sagittis neque dui id urna. Quisque efficitur elementum mi in aliquet. Fusce ut varius augue. Quisque aliquet lacus felis, condimentum posuere odio tincidunt sit amet. Pellentesque facilisis luctus ligula, at tincidunt metus vehicula ac. Duis id eros vel neque pulvinar luctus.</p>
              </div>
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