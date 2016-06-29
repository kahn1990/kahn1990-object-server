'use strict';

require('babel-polyfill');

const Chai           = require('chai'),
      Config         = require('config'),
      Should         = require('should'),
      Assert         = require("assert"),
      Mysql          = require('mysql'),
      Sequelize      = require('sequelize'),
      Sinon          = require('sinon'),
      Q              = require('q'),
      ChaiAsPromised = require('chai-as-promised');

Chai.use(ChaiAsPromised);

