'use strict';
const {Model} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.UserDetail, {
        as: 'detail',
        foreignKey: 'id',
        targetKey: 'userId'
      })

      User.hasMany(models.Product, {
        as: 'product',
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
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
      modelName: 'User',
      tableName: 'users',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
  });
  return User;
};