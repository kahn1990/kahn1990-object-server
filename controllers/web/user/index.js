/**
 * 依赖模块
 */
const parse  = require('co-body'),
      config = require('config'),
      User   = require('../../../models/web/index');

module.exports.home = function*() {
    var data = yield User.test({});
    yield this.render('home', {pagename: 'awesome people',
        authors: ['Paul', 'Jim', 'Jane']});
};