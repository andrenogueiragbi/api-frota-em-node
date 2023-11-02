import { Sequelize } from 'sequelize';
import db from '../database/index.js';

export default db.define('fleets', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        //autoIncrement: true,
        allowNull: false,
        unique: true
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },  
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },    
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    plate: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    chassi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    engine_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fuel: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    brand: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    km: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        type: Sequelize.TEXT,

    },
    like_data: {
        type: Sequelize.TEXT
    },


})