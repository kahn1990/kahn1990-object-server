'use strict';

/////////////////////////////////////////
// 组件依赖
//////////////////////////////////////////


const Utility        = require('utility');
const Config         = require('config');
const Underscore     = require('underscore');
const Logger         = require('../../../log4js/index');


module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define(
        'mmy_photo',
        {
            url: {
                type     : DataTypes.STRING(100),
                allowNull: false,
                comment  : '图片地址'
            }
        },
        {
            tableName   : 'mmy_photo',
            comment     : 'user base info',
            indexes     : [
                {
                    unique: true,
                    fields: ['name']
                },
                {
                    fields: ['gmt_modified']
                }
            ],
            classMethods: {
                testfindall: function*() {
                    return yield this.findAll({
                        attributes: ['id']
                    });
                }
            }
        });
};
