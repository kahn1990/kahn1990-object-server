'use strict';

const router = require('koa-router')(),
      debug  = require('debug')('app:routes:index');
/**
 * 引入控制器
 */
var Web = require('./../controllers/web/user/index');

/**
 * 主页
 */
router.get('/', Web.home);


module.exports = router;