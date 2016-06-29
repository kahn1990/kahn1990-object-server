'use strict';

const CoViews    = require('co-views'),
      thenify    = require('thunkify-wrap'),
      swig       = require('swig'),
      path       = require('path'),
      Underscore = require('underscore'),
      Logger     = require('../log4js');
const extname    = path.extname;
const resolve    = path.resolve;
module.exports   = (path, opts) => {
    if (arguments.length < 2) {

        Logger.error('[' + __filename + '] 缺少参数');
    }

    if (!Underscore.isString(path) || !Underscore.isObject(opts)) {

        Logger.error('[' + __filename + '] 参数类型错误');
    }

    return function *Views(next) {

        if (this.render) return yield next;

        if (opts.map.html === 'swig') {


            // 待设置
            setTags(swig, {});
            var renderFile = thenify(swig.renderFile);

        } else {
            var render = CoViews(path, opts);
        }

        Object.assign(this, {
            render: function *(relPath, locals) {

                this.type = 'text/html';

                /**
                 * 处理 swig 模板
                 */

                if (opts.map.html === 'swig') {
                    var e = extname(relPath);

                    if (opts.map['html']) {
                        if (!e) {
                            e = '.html';
                            relPath += e;
                        }
                    } else if (opts.map['ejs']) {
                        if (!e) {
                            e = '.ejs';
                            relPath += e;
                        }
                    } else if (opts.map['jade']) {
                        if (!e) {
                            e = '.jade';
                            relPath += e;
                        }
                    } else if (opts.map['swig']) {
                        if (!e) {
                            e = '.swig';
                            relPath += e;
                        }
                    }

                    relPath   = resolve(path, relPath);

                    this.body = yield renderFile(relPath, locals);
                } else {
                    this.body = yield render(relPath, locals)
                }
            }
        });

        yield next
    }
};


function setLocals(args) {
    mixin(locals, args);
}

function getLocals(key) {
    return locals[key];
}

/**
 * Add filters for Swig
 */

function setFilters(swig, filters) {
    for (var name in filters) {
        swig.setFilter(name, filters[name]);
    }
}

/**
 * Add tags for Swig
 */

function setTags(swig, tags) {
    var name, tag;
    for (name in tags) {
        tag = tags[name];
        swig.setTag(name, tag.parse, tag.compile, tag.ends, tag.blockLevel);
    }
}

/**
 * Add extensions for Swig
 */

function setExtensions(swig, extensions) {
    for (var name in extensions) {
        swig.setExtension(name, extensions[name]);
    }
}