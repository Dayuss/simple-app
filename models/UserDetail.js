'use strict';
const {Model} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    static associate(models) {
      
    }
  }
  UserDetail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    createdAt : {
        type : DataTypes.DATE,
        get : function() {
            return this.getDataValue('createdAt') != null ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null
        }
    },
    updatedAt : {
        type : DataTypes.DATE,
        get : function() {
            return this.getDataValue('updatedAt') != null ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null
        }
    },
  }, {
      sequelize,
      modelName: 'UserDetail',
      tableName: 'user_details',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
  });
  return UserDetail;
};