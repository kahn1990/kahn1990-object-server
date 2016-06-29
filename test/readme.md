# 测试用例

## Benchmark

## istanbul

## should


## sinon

## chai

### chai-as-promise

> $npm install chai-as-promise

### chai-things

> $npm install chai-things

## mocha

> $npm install -g mocha

如果是命令行执行单个文件：

    $mocha test/test_mysql.js
    
如果 js 文件使用 es6，需要先安装 babel：

    $npm install babel-core babel-preset-es2015 --save-dev


用 `--compilers js:babel-core/register` 来指定翻译器：

    $mocha --compilers js:babel-core/register test/test_mysql_orm.js

如果报错：

    ReferenceError: regeneratorRuntime is not defined
    
则需要安装一些相关依赖：

    $npm i babel-polyfill --save
    
然后在文件中引入：

    require('babel-polyfill');
    
将文件编译成 es5 执行测试：

    $babel test/test_mysql_orm.js --out-file test/es6.test_mysql.js
    $mocha test/es6.test_mysql.js 
    
或者直接：

    $mocha --compilers js:babel-core/register test/test_mysql_orm.js