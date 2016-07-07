# make


## 构建任务

- 检查语法
- 编译模板
- 转码
- 合并
- 压缩
- 测试
- 删除

相关模块：

    "devDependencies": {
        "coffee-script": "~1.9.1",
        "handlebars": "~3.0.0",
        "jshint": "^2.6.3",
        "mocha": "~2.2.1",
        "uglify-js": "~2.4.17"
    }

### Makefile 的通用配置

    PATH  := node_modules/.bin:$(PATH)
    SHELL := /bin/bash

### 检查语法错误

    js_files = $(shell find ./lib -name '*.js')
    
    lint: $(js_files)
        jshint $?

调用：

    make lint
    
### 模板编译

    build/templates.js: templates/*.handlebars
        mkdir -p $(dir $@)
        handlebars templates/*.handlebars > $@
    
    template: build/templates.js
 
调用：
 
    make template

### 合并文件

    JS_FILES := $(wildcard build/*.js)
    OUTPUT := build/bundle.js
    
    concat: $(JS_FILES)
        cat $^ > $(OUTPUT)

### 压缩

    app_bundle := build/app.js
    
    $(app_bundle): $(build_files) $(template_js)
        uglifyjs -cmo $@ $^
    
    min: $(app_bundle)

### 测试

    test: $(app_bundle) $(test_js)
        mocha

### 多任务执行

    build: template concat min clean

## 其他可选方案或备注：

1. 方案一：基于 Node.js 的专用构建工具
    - Grunt：http://gruntjs.com/
    - Gulp：http://gulpjs.com/
        - https://github.com/osscafe/gulp-cheatsheet
    - Brunch：http://brunch.io/
    - Broccoli：https://github.com/broccolijs/broccoli
    - Mimosa：http://mimosa.io/
1. 方案二：npm run 命令：适用于简单项目
    - http://substack.net/task_automation_with_npm_run
    - http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
    - https://gon.to/2015/02/26/gulp-is-awesome-but-do-we-really-need-it/
1. 方案三：make 命令：大型项目的首选方案
    - http://www.ruanyifeng.com/blog/2015/03/build-website-with-make.html
    - http://www.ruanyifeng.com/blog/2015/02/make.html
    - https://github.com/jesstelford/cloverfield-build-make
    - https://blog.jcoglan.com/2014/02/05/building-javascript-projects-with-make/
    - http://codeofrob.com/entries/the-joy-of-make-at-jsconfeu.html