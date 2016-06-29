'use strict';

var fs             = require('fs'),
    underscore     = require('underscore'),
    underscore_str = require('underscore.string'),
    logger         = require('../log4js'),
    EOL            = require('os').EOL;

module.exports = () => {
    
    /**
     * 判断 file 路径字符串
    if (underscore.isNull(file) || underscore.isUndefined(file)) {

        file = './.env';
    }
    if (!underscore.isString(file) || !underscore_str.isBlank(file)) {

        logger.error("[/lib/dotenv_exports.js] file 不是合法字符串");
    }*/

    const file = './.env';
    /**
     * 判断文件
     */
    let exist = fs.existsSync(file);

    if (!exist) {

        logger.trace("[/lib/dotenv_exports.js] .env 文件不存在");
        process.exit(-1);
    }

    /**
     * 读取文件
     */

    let content    = fs.readFileSync(file).toString();
    let contentArr = content.split(EOL);

    let match;
    for (let k in contentArr) {
        match = contentArr[k].match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
        if (match != null && underscore_str.include(match[0], 'ADD_EXPORTS_OBJECT')) {
            let key   = match[1];
            let value = match[2] ? match[2] : '';
            /**
             * 判断是否有属性
             */
            if (key.includes('.')) {

                let tmp = key.split('.');

                if (tmp[0] === 'ADD_EXPORTS_OBJECT') {

                    /**
                     * 递归解析对象
                     * @type {{}}
                     */
                    let obj = {};
                    while (tmp.length > 1) {
                        let _index = tmp.shift();
                        if (!obj[_index]) {
                            obj[_index] = {};
                        }
                        obj = obj[_index];
                    }
                    
                    if (!underscore.isString(value)) {

                        exports[tmp[0]] = value;
                    } else {

                        /**
                         * 截取 [] 中间的内容
                         * @type {boolean|Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
                         */
                        const valueReplaceCheck = value.match(/\[(.+?)\]/g);

                        /**
                         * 判断是否匹配成功
                         */
                        if (valueReplaceCheck) {
                            const valueCache = valueReplaceCheck[0];

                            exports[tmp[0]] = eval(valueCache.substring(1,valueCache.length-1));

                        }else{
                            exports[tmp[0]] = value;
                        }
                    }
                    
                } else {

                    /**
                     * ADD_EXPORTS_OBJECT 不在开头则判定无效
                     */
                    return false;
                }

            } else {

                /**
                 * ADD_EXPORTS_OBJECT  对象链上为空
                 */
                return false;
            }
        }
    }

};

