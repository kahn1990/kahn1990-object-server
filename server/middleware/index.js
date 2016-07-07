'use strict';

const config       = require('config'),
      bodyParser   = require('koa-bodyparser'),
      json         = require('koa-json'),
      rewrite      = require('koa-rewrite'),
      helmeTset    = require('./helmet_set'),
      fresh        = require('../lib/fresh'),
      etag         = require('../lib/etag'),
      gzip         = require('../lib/gzip'),
      compose      = require('../lib/compose'),
      cors         = require('../lib/cors'),
      merge        = require('../../lib/merge'),
      responseTime = require('../../lib/response_time'),
      logger       = require('../../log4js/index.js');

require('oneapm');

/**
 * 第三方组件同一注入
 * @returns {*}
 */

const middleware = () => {
    return compose([
        logger(config.get("log4js").dir),
        cors(),
        fresh(),
        etag(),
        gzip(),
        responseTime({
            headerName: 'X-ReadTime'
        }),
        rewrite('/favicon.ico', '/favicon.png'),
        json({
            pretty: false,
            param : 'pretty'
        }),
        bodyParser({
            formLimit: '5mb',
            limit    : '10mb'
        })
    ]);
};

module.exports = middleware;

merge(middleware, {
    helmetSet: helmeTset
});