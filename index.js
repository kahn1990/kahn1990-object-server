'use strict';

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    require('babel-register');
    require('babel-polyfill');
    require('isomorphic-fetch');
}
require('./app.js');