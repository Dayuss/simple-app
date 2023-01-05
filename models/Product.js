'use strict';
const {Model} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    nameProduct: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
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
      modelName: 'Product',
      tableName: 'products',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
  });
  return Product;
};