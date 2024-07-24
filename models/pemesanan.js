const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Paket = require('./paket');
const User = require('./user');

const Pemesanan = sequelize.define('Pemesanan', {
    pesananID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    paketID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Paket,
            key: 'paketID'
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userID'
        }
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

Pemesanan.belongsTo(User, {foreignKey: 'userID'});
User.hasMany(Pemesanan, {foreignKey: 'userID'});

Pemesanan.belongsTo(Paket, {foreignKey: 'paketID'});
Paket.hasMany(Pemesanan, {foreignKey: 'paketID'});

module.exports = Pemesanan;