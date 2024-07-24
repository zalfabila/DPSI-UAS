var express = require('express');
var router = express.Router();
var Paket = require('../models/paket');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Pakets = await Paket.findAll();
        res.json(Pakets);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { namaPaket, deskripsi, harga } = req.body;
        const newPaket = await Paket.create({ namaPaket, deskripsi, harga });
        res.status(201).json(newPaket);
    } catch (err) {
        next(err);
    }
});

router.put('/:paketID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { namaPaket, deskripsi, harga } = req.body;
        const Pakets = await Paket.findByPk(req.params.paketID);
        if (Pakets) {
            Pakets.namaPaket = namaPaket;
            Pakets.deskripsi = deskripsi;
            Pakets.harga = harga;
            await Pakets.save();
            res.json(Pakets);
        } else {
            res.status(404).json({ message: 'Paket tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:paketID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Pakets = await Paket.findByPk(req.params.paketID);
        if (Pakets) {
            await Pakets.destroy();
            res.json({ message: 'Paket dihapus' });
        } else {
            res.status(404).json({ message: 'Paket tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
