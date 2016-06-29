'use strict';

const app           = require('koa')(),
      serve         = require('koa-static'),
      views         = require('koa-swig'),
      underscore    = require('underscore'),
      middleware    = require('./middleware'),
      logger        = require('../log4js'),
      routes        = require('../routes'),
      Views        = require('../lib/render'),
      dotenvExports = require('../lib/dotenv_exports');

/**
 * 加载附加在 process.env 上的变量
 */
require('dotenv').config({silent: true});

dotenvExports();

/**
 *
 * @type {string[]}
 */
app.keys = ['my-secret-key'];

/**
 * 第三方注入 koa
 */
app.use(middleware());

/**
 *
 * @type {boolean}
 */
app.proxy = true;

/**
 * 静态文件目录注入
 */
app.use(serve(__dirname + '/static'), {
    defer: true
});

/**
 * html 模板引擎
 */
app.use(Views(
    __dirname + '/../views',
    {
        map: {html: 'swig'}
    }
));

/**
 * 路由注入
 */
app.use(routes.routes());

/**
 * 监听 error
 */
app.on('error', function (err, ctx) {
    logger.error('server error' +
    ' - ' + underscore.isString(err) ? err : JSON.stringify(err) +
    ' - ' + underscore.isString(ctx) ? ctx : JSON.stringify(ctx));
});


/**
 * 404 route
 */
app.use(function*(next) {
    if (this.path !== '/404') {
        return yield next;
    }
    this.body = 'page not found'
});

/**
 * 500 route
 */
app.use(function*(next) {
    if (this.path !== '/500') {
        return yield next;
    }
    this.body = 'internal server error'
});

module.exports = app;