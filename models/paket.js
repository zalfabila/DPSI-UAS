const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Paket = sequelize.define('Paket', {
    paketID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    namaPaket: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

module.exports = Paket;