// To use es6/es7 syntax without using babel

// eslint-disable-next-line no-global-assign
require = require('esm')(module);

module.exports = require('./app');
