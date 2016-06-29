'use strict';

const config     = require('config'),
      bodyParser = require('koa-bodyparser'),
      json       = require('koa-json'),
      fresh      = require('../lib/fresh'),
      etag       = require('../lib/etag'),
      gzip       = require('../lib/gzip'),
      convert    = require('../lib/convert'),
      compose    = require('../lib/compose'),
      cors       = require('../lib/cors'),
      logger     = require('../../log4js/index.js');

/**
 * 第三方组件同一注入
 * @returns {*}
 */
module.exports = function middleware() {
    return compose([
        logger(config.get("log4js").dir),
        cors(),
        fresh(),
        etag(),
        gzip(),
        json({
            pretty: false,
            param : 'pretty'
        }),
        bodyParser({
            formLimit: '5mb'
        })
    ]);
};
