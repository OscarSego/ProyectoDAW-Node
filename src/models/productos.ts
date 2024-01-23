import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

export const Producto = sequelize.define('product',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    precio:{
        type: DataTypes.INTEGER,
    },
    stock:{
        type: DataTypes.INTEGER,
    }
});

Producto.sync()
    .then(() => {
        console.log('La tabla de productos se ha creado correctamente');
    })
    .catch((error) => {
        console.error('Error al crear la tabla de productos:', error);
    });