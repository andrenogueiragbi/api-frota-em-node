import { Sequelize } from 'sequelize';
import db from '../database/index.js';

export default db.define('drivers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    rg: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    workload: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    supervisor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cnh_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    cnh_category: {
        type: Sequelize.CHAR(2),
        allowNull: false,
    },
    cnh_expiration: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    number_address: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cell_phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    whatsapp: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    integration_code: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.TEXT,

    },
    like_data: {
        type: Sequelize.TEXT
    },

})