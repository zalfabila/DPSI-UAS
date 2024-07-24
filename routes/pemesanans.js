var express = require('express');
var router = express.Router();
var Pemesanan = require('../models/pemesanan');
const { authenticate, authorize } = require('../middleware/auth');
const Paket = require('../models/paket');
const Transaksi = require('../models/transaksi');

router.get('/', async (req, res, next) => {
    try {
        const Pemesanans = await Pemesanan.findAll();
        res.json(Pemesanans);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { paketID, userID, Quantity } = req.body;
        const Pakets = await Paket.findByPk(paketID);
        if (!Pakets){
            return res.status(404).json({ error: 'Paket tidak ada' });
        }
        const newPemesanan = await Pemesanan.create({ paketID, userID, Quantity });
        const Price = Pakets.harga * Quantity;
        const status = 'pending';
        const pesananID = newPemesanan.pesananID;
        const newTransaksi = await Transaksi.create({ pesananID, Price, status });
        res.status(201).json({ pemesanan: newPemesanan, transaksi: newTransaksi });
    } catch (err) {
        next(err);
    }
});



//yang bias delete dan edit hanya admin
router.put('/:pesananID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { paketID, userID, Quantity } = req.body;
        const Pemesanans = await Pemesanan.findByPk(req.params.pesananID);
        if (Pemesanans) {
            Pemesanans.paketID = paketID;
            Pemesanans.userID = userID;
            Pemesanans.Quantityuantity = Quantity;
            await Pemesanans.save();
            res.json(Pemesanans);
        } else {
            res.status(404).json({ message: 'pesanan tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

   router.delete('/:pesananID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const pesananID = req.params.pesananID;
        const Pemesanans = await Pemesanan.findByPk(pesananID);
        if (!Pemesanans) {
            return res.status(404).json({ message: 'Pemesanan tidak ada' });
        }
        const Transaksis = await Transaksi.findOne({ where: { pesananID } });
        if (Transaksis) {
            Transaksis.status = 'cancel';
            await Transaksis.save();
            await Transaksis.destroy();
        }
        await Pemesanans.destroy();
        res.json({ message: 'Pemesanan dan transaksi terkait berhasil dihapus dan diperbarui' });
    } catch (err) {
        next(err);
    }
});




module.exports = router;
