"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Producto = connection_1.default.define('product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    precio: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    }
});
exports.Producto.sync()
    .then(() => {
    console.log('La tabla de productos se ha creado correctamente');
})
    .catch((error) => {
    console.error('Error al crear la tabla de productos:', error);
});
