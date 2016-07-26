'use strict';


const config  = require('config'),
      compose = require('../lib/compose'),
      helmet  = require('./../../lib/helmet');

var NINETYDAYSINMILLISECONDS = 7776000000;

/**
 * 第三方组件同一注入
 * @returns {*}
 */
module.exports = () => {
    
    return compose([
        helmet.frameguard({
            action: 'allow-from',
            domain: 'http://example.com'
        })/*,
        helmet.contentSecurityPolicy({
            directives    : {
                defaultSrc: ["'self'", 'default.com'],
                scriptSrc : ["'self'", "'unsafe-inline'"],
                styleSrc  : ['style.com'],
                imgSrc    : ['img.com', 'data:'],
                sandbox   : ['allow-forms', 'allow-scripts','allow-css'],
                reportUri : '/static',
                objectSrc : []
            },
            reportOnly    : false,
            setAllHeaders : true,
            disableAndroid: false,
            browserSniff  : true
        }),
        helmet.hsts({
            maxAge           : NINETYDAYSINMILLISECONDS,
            includeSubdomains: true
        }),
        helmet.hidePoweredBy(),
        helmet.ieNoOpen(),
        helmet.noSniff(),
        helmet.xssFilter({setOnOldIE: true}),
        helmet.noCache({noEtag: true}),
        helmet.dnsPrefetchControl({allow: false}),
        helmet.hpkp({
            maxAge           : NINETYDAYSINMILLISECONDS,
            sha256s          : ['AbCdEf123=', 'ZyXwVu456='],
            includeSubdomains: true,
            reportUri        : 'http://example.com', 
            reportOnly       : false
        })*/
    ]);
};