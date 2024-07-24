const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Pemesanan = require('./pemesanan');

const Transaksi = sequelize.define('Transaksi', {
    transaksiID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pesananID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Pemesanan,
            key: 'pesananID'
        }
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('done', 'pending', 'cancel'),
        allowNull: true
    },
});

Transaksi.belongsTo(Pemesanan, {foreignKey: 'pesananID'});
Pemesanan.hasOne(Transaksi, {foreignKey: 'pesananID'});

module.exports = Transaksi;