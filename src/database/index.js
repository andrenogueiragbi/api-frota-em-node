import { Sequelize } from 'sequelize';
import dotenv from 'dotenv/config.js';

const dbName = 'clientes';
const dbUser = 'root';
const dbHost = '127.0.0.1';
const dbPassword = '090909';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sql',
    logging: false,
    
})

export default sequelize;