import { Sequelize } from 'sequelize';
import db from '../database/index.js';

export default db.define('drivers', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true
    },
    rg: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    workload: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    supervisor: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    cnh_number: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING(150),
        allowNull: false,
    },

    neighborhood: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    number_address: {
        type: Sequelize.STRING(40),
    },
    state: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    cell_phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    whatsapp: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    integration_code: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },

})