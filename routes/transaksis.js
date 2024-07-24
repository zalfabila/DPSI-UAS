var express = require('express');
var router = express.Router();
var Transaksi = require('../models/transaksi');

router.get('/', async (req, res, next) => {
    try {
        const Transaksis = await Transaksi.findAll();
        res.json(Transaksis);
    } catch (err) {
        next(err);
    }
});

router.put('/:transaksiID', async (req, res, next) => {
    try {
        const status = 'done';
        const transaksi = await Transaksi.findByPk(req.params.transaksiID);
        if (transaksi) {
            transaksi.status = status;
            await transaksi.save();
            res.status(200).json(transaksi);
        } else {
            res.status(404).json({ message: 'Transaksi tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});


module.exports = router;