// Module dependencies
import express from 'express';
import path from 'path';
import sass from 'node-sass-middleware';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.js';

const app = express();


// Configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);


// Middleware
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(sass({
  src: path.join(__dirname, 'src/sass'),
  dest: path.join(__dirname, 'public/css'),
  debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}));
app.use(express.static(path.join(__dirname, 'public')));


// API


// Main
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Start server
app.listen(app.get('port'), () => console.log(`Listenning on localhost:${app.get('port')}`));