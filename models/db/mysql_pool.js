'use strict';

/////////////////////////////////////////
// 组件依赖
//////////////////////////////////////////

const Mysql  = require('mysql');
const Config = require('config');


const poolConn = Mysql.createPool({
    connectionLimit: Config.get('mysql_db').config.connectionLimit,
    host           : Config.get('mysql_db').config.port,
    user           : Config.get('mysql_db').config.username,
    password       : Config.get('mysql_db').config.password,
    database       : Config.get('mysql_db').config.database
});

module.exports = poolConn;