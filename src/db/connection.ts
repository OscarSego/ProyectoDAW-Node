import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('practica', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;