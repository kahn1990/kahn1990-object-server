'use strict';

const Path      = require('path');
const SequelizeOrm = require('../../db/mysql_orm');

const Sequelize = SequelizeOrm();

////////////////////////
// 连接测试
////////////////////////

SequelizeOrm.testConnectionMysql(Sequelize);

function load(name) {
    return Sequelize.import(Path.join(__dirname, name));
}

module.exports = {
    Sequelize: Sequelize,
    Photo    : load('photo')
};
