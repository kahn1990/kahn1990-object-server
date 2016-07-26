/**
 * 依赖模块
 */
const parse  = require('co-body'),
      config = require('config'),
      User   = require('../../../models/web/index');

module.exports.home = function*() {
    //var data = yield User.test({});
    var data = 'test string';
    yield this.render('home', {
        //pagename: 'awesome people of crsf : '+this.csrf,
        pagename: 'awesome people of crsf : ',
        authors : ['Paul', 'Jim', 'Jane']
    });
};