var path           = require("path"),
    log4js         = require('log4js'),
    util           = require('util'),
    underscore     = require('underscore'),
    underscore_str = require('underscore.string'),
    fs             = require("fs"),
    moment         = require('moment'),
    merge          = require('../lib/merge');

/**
 * 创建目录
 * @param pathStr
 */
function loadJsonConfigure(pathStr) {
    // 判断日志目录是否存在，不存在时创建日志目录
    function checkAndCreateDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    // 指定的字符串是否绝对路径
    function isAbsoluteDir(path) {
        if (path == null)
            return false;
        var len = path.length;

        var isWindows = process.platform === 'win32';
        if (isWindows) {
            if (len <= 1)
                return false;
            return path[1] == ":";
        } else {
            if (len <= 0)
                return false;
            return path[0] == "/";
        }
    }

    /**
     * 加载配置文件
     */
    var objConfig = JSON.parse(fs.readFileSync(pathStr, "utf8"));

    /**
     * 检查配置文件所需的目录是否存在，不存在时创建
     */
    var baseDir    = objConfig["customBaseDir"];
    var defaultAtt = objConfig["customDefaultAtt"];

    for (var i = 0, j = objConfig.appenders.length; i < j; i++) {
        var item = objConfig.appenders[i];
        if (item["type"] == "console")
            continue;

        if (defaultAtt != null) {
            for (var att in defaultAtt) {
                if (item[att] == null)
                    item[att] = defaultAtt[att];
            }
        }
        if (baseDir != null) {
            if (item["filename"] == null)
                item["filename"] = baseDir;
            else
                item["filename"] = baseDir + item["filename"];
        }
        var fileName = item["filename"];
        if (fileName == null)
            continue;
        var pattern = item["pattern"];
        if (pattern != null) {
            fileName += pattern;
        }
        var category = item["category"];
        if (!isAbsoluteDir(fileName))//path.isAbsolute(fileName))
            throw new Error("配置节" + category + "的路径不是绝对路径:" + fileName);
        var dir = path.dirname(fileName);
        checkAndCreateDir(dir);
    }
    return objConfig;
}

/*
 * middleware
 */
module.exports = log4jsClient;

function log4jsClient() {
    /**
     * 多进程的日志配置
     * log4js.configure(loadJsonConfigure("log4js/log4js-worker.json"));
     */
    if (arguments.length > 0 && !underscore.isNull(arguments[0])) {
        log4js.configure(loadJsonConfigure(arguments[0]));
    } else {
        log4js.configure(loadJsonConfigure("log4js/log4js.json"));
    }

    return function*(next) {
        var req     = this.request,
            header  = req.header,
            nodeReq = this.req,
            str     = util.format(
                "IP/%s - [%s] - '%s' - HTTP/%s - %s - %s",
                req.ip,
                req.method,
                req.url,
                nodeReq.httpVersion,
                req.length || null,
                header['user-agent']);
        log4js.connectLogger(log4js.getLogger('logInfo').info(str), {level: 'debug', format: ':method :url'});
        yield next;
    }
}

/**
 * prototype
 *
 * var proto = log4jsClient.prototype;
 */

/**
 * Object operations
 */
merge(log4jsClient, {
    debug     : function (msg) {
        log4js.getLogger('logDebug').debug(arguments.length > 0 ? msg : '');
    },
    info      : function (msg) {
        log4js.getLogger('logInfo').info(arguments.length > 0 ? msg : '');
    },
    warn      : function (msg) {
        log4js.getLogger('logWarn').warn(arguments.length > 0 ? msg : '');
    },
    error     : function (msg) {
        log4js.getLogger('logErr').error(arguments.length > 0 ? msg : '');
    },
    trace     : function (msg) {
        log4js.getLogger('logTrace').trace(arguments.length > 0 ? msg : '');
    },
    mysqlWarn : function (msg) {
        log4js.getLogger('mysqlLogWarn').warn(arguments.length > 0 ? msg : '');
    },
    mysqlError: function (msg) {
        log4js.getLogger('mysqlLogErr').error(arguments.length > 0 ? msg : '');
    },
    mysqlInfo : function (msg) {
        log4js.getLogger('mysqlLogInfo').info(arguments.length > 0 ? msg : '');
    }
});