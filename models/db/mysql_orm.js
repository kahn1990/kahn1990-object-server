'use strict';

const Sequelize  = require('sequelize');
const DataTypes  = require('sequelize/lib/data-types');
const Config     = require('config');
const Merge      = require('../../lib/merge');
const Logger     = require('../../log4js/index');

require('babel-polyfill');

////////////////////////////////////////////////////////////////
// 通过 Sequelize 第三方模块连接 MYSQL 数据库
// 用于防止 SQL 注入等
///////////////////////////////////////////////////////////////

Sequelize.LONGTEXT = DataTypes.LONGTEXT = DataTypes.TEXT;

if (Config.get('mysql_db').config.dialect === 'mysql') {

    Sequelize.LONGTEXT = DataTypes.LONGTEXT = 'LONGTEXT';
}

/////////////////////////////////////////////////////////
// 开始实例化 sequelize
////////////////////////////////////////////////////////

module.exports = sequelize;


function sequelize() {
    
    return  new Sequelize(
        Config.get('mysql_db').config.database,
        Config.get('mysql_db').config.username,
        Config.get('mysql_db').config.password,
        {
            host     : Config.get('mysql_db').config.host,
            dialect  : 'mysql',
            port     : Config.get('mysql_db').config.port,
            pool     : {
                max : 10,
                min : 0,
                idle: 30000
            },
            logging  : !!process.env.SQL_DEBUG,
            syncFirst: false,
            define   : {
                timestamps: true,
                createdAt : 'gmt_create',
                updatedAt : 'gmt_modified',
                charset   : 'utf8',
                collate   : 'utf8_general_ci'
            }
        });
}



///////////////////////////////////////
// sequelize 对象上面绑定测试连接方法
// 用以校验是否连接成功
//////////////////////////////////////

Merge(
    sequelize,
    {
        testConnectionMysql: function (sequelize) {

            sequelize
                .authenticate()
                .then(function (data) {

                    Logger.info("[" + __filename + "] MYSQL 关联成功 - " + data);
                })
                .catch(function (error) {

                    Logger.debug("[" + __filename + "] MYSQL 关联失败 - " + error);
                });
        }
    });


