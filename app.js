'use strict';

const config  = require('config');
const util    = require('util');
const logger  = require('./log4js');
const app     = require('./server');

/******************************************************
 * 启动服务器
 ******************************************************/

////////////////////////////////////////////////////
// require.main === module
// 如果是直接执行当前文件，则进入此处
// 如果当前文件被其他文件 require，则此处不会执行。
///////////////////////////////////////////////////

if (!module.parent && require.main === module) {

    const port = process.env.PORT || config.get('server').port || 4000;

    /**
     * 异常抓取出
     */
    process.on('uncaughtException', function (e) {

        console.log(e);
    });

    app.listen(port, function () {

        /**
         * 打印服务开启日志
         */
        logger.info(

            util.format(
                'Running %s site at: http://localhost:%d',
                config.get('server').mode,
                port
            )
        );
    });
} else {

    module.exports = app;
}