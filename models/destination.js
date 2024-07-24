const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Paket = require('./paket');

const Destination = sequelize.define('Destination', {
    destinationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    destinasi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paketID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Paket,
            key: 'paketID'
        }
    },
});

Destination.belongsTo(Paket, {foreignKey: 'paketID'});
Paket.hasMany(Destination, {foreignKey: 'paketID'});

module.exports = Destination;