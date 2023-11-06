import { Sequelize } from 'sequelize';
import db from '../database/index.js';
import Driver from './driversModel.js'
import Fleet from './fleetModel.js'

const Fine = db.define('fines', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        //autoIncrement: true,
        allowNull: false,
        unique: true
    },
    id_driver: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Driver,
            key: "id",
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    hour: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    description_type: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    justify_driver: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    id_fleet: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Fleet,
            key: "id",
        }
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false,

    },
    payment: {
        type: Sequelize.STRING,
        allowNull: false,

    },

    company_payment: {
        type: Sequelize.FLOAT,
        allowNull: false,

    },

    driver_payment: {
        type: Sequelize.FLOAT,
        allowNull: false,

    },

    points: {
        type: Sequelize.INTEGER,
    },

    image: {
        type: Sequelize.TEXT,

    },
    like_data: {
        type: Sequelize.TEXT
    },


})


Fine.belongsTo(Driver, {
    foreignKey: 'id_driver',
});

Fine.belongsTo(Fleet, {
    foreignKey: 'id_fleet',
});

export default Fine;
