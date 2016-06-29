# 包装 log4js

在住文件入口引入:
    var logger     = require('../../log4js/index.js');
    app.use(logger(config.get("log4js").dir));
    
其中 config 是一个全局共享对象

    var config     = require('config');
    
另外需要注意的是 `logger(config.get("log4js").dir)` 中的 `config.get("log4js").dir` 为 null，代表执行生产环境的 log4js 配置文件。