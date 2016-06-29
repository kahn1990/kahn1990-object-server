'use strict';

const Sequelize      = require('sequelize');
const Config         = require('config');
const Underscore     = require('underscore');
const Logger         = require('../../log4js/index');
const DbMysqlStroage = require('../db/mysql_orm');
const Photo          = require('./table').Photo;


exports.test = function*() {

    return yield* Photo.testfindall();
};
