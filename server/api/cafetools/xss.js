'use strict';

const _ = require('underscore');

module.exports = function (param) {

    return function *xss(next) {
        if (_.isBoolean(param))
            var matches = /msie\s*(\d+)/i.exec(this.request['user-agent']);

            var value;
            if (!matches || (parseFloat(matches[1]) >= 9)) {
                value = '1; mode=block'
            } else {
                value = '0'
            }
            this.response.set('X-XSS-Protection', value);
            next();
    }
};