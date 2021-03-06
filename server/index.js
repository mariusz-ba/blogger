// Module dependencies
import express from 'express';
import path from 'path';
import sass from 'node-sass-middleware';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.js';


const app = express();


// Database connection
import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/blogger');


// Routes
import auth from './src/routes/auth';
import comments from './src/routes/comment';
import followers from './src/routes/follower';
import users from './src/routes/user';
import posts from './src/routes/post';


// Configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


// Middleware
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(sass({
  src: path.join(__dirname, 'src/sass'),
  dest: path.join(__dirname, 'public/css'),
  debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}));
app.use(express.static(path.join(__dirname, 'public')));


// API
app.use('/api/auth', auth);
app.use('/api/comments', comments);
app.use('/api/followers', followers);
app.use('/api/users', users);
app.use('/api/posts', posts);


// Main
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Start server
app.listen(app.get('port'), () => console.log(`Listenning on localhost:${app.get('port')}`));