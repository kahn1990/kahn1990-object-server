# 图片处理服务器

- 平台： debian 系统
    - `sudo apt-get install ImageMagick`
    - `sudo apt-get install graphicsMagick`
- 语言： node.js

## 守护进程

- 开发环境使用 nodemon
    - 执行 `npm start`，如果不小心  `ctrl+c` 退出了终端界面但 node 进程仍然存在，可以命令行执行 `$ lsof -i :3000` 或者 `$ netstat -nap | grep node`，然后 `$ kill -9 [进程ID]` 杀死进程。
- 生产环境使用 pm2
    - 执行 `sh start.sh start` 开始
    - 执行 `sh start.sh stop` 关闭
    
###  pm2 启动多个 js 文件守护进程
    
首先创建 ecosystem.json 文件，然后通过 `pm2 start apps.json` 来启动 ecosystem.json 里面定义的 apps：
    
        {
          "apps": [
            {
              "max_memory_restart": "1G",
              "autorestart"       : true,
              "node_args"         : "-use-strict -harmony",
              "args"              : [],
              "name"              : "kahn1990PhotoServer",
              "script"            : "app.js",
              "cwd"               : "/home/kang/work/kahn1990-photo-server/",
              "error_file"        : "app-err.log",
              "out_file"          : "app-out.log",
              "pid_file"          : "app.pid",
              "one_launch_only"   : "true",
              "env"               : {
                "NODE_ENV": "production"
              }
            }
          ]
        }
    
需要注意的是 pm2 以 cluster 集群方式发布 app，可以高效地利用多核cpu，有效提升吞吐量。
    
## 生产环境

js 文件里：

    process.env.NODE_ENV = 'production';

package.json 文件里：

    {
      ...
      "scripts": {
        "start": "NODE_ENV=production node ./app"
      }
      ...
    }

node 命令：

    NODE_ENV=production node app.js
    
pm2: 

    NODE_ENV=production pm2 start app.js

这里有个第三方 `config` 模块，可以全局定义一些属性，如：

    var config = require('config');
    //... 
    var dbConfig = config.get('Customer.dbConfig');
    db.connect(dbConfig, ...);
     
    if (config.has('optionalFeature.detail')) {
      var detail = config.get('optionalFeature.detail');
      //... 
    }
    
    switch(process.env.NODE_ENV){
        case 'production': ... break;
        case 'test': ... break;
        default: ...break;
    }



exports.resourceRouter = exports.ResourceRouter = require('koa-resource-router');
exports.bodyparser = exports.bodyParser = require('koa-bodyparser');
exports.redisStore = exports.RedisStore = require('koa-redis');
exports.conditional = require('koa-conditional-get');
exports.staticCache = require('koa-static-cache');
exports.session = require('koa-generic-session');
exports.cookieSession = require('koa-session');
exports.compress = require('koa-compress');
exports.jsonp = require('koa-safe-jsonp');
exports.onerror = require('koa-onerror');
exports.favicon = require('koa-favicon');
exports.rewrite = require('koa-rewrite');
exports.router = require('koa-router');
exports.etag = require('koa-etag');
exports.csrf = require('koa-csrf');
exports.ejs = require('koa-ejs');
exports.rt = require('koa-rt');