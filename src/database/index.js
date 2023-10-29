import { Sequelize } from 'sequelize';
import dotenv from 'dotenv/config.js';

const config = {
  dialect: process.env.DB_DIALECT || 'sqlite',
  database: process.env.DATABASE || 'db.sqlite', // Pode usar um valor padrão para o SQLite
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost', // Pode usar um valor padrão para o localhost
  port: 5432, // Porta padrão do PostgreSQL
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false,
};

const sequelize = new Sequelize(config);

export default sequelize;
