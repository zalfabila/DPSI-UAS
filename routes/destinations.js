var express = require('express');
var router = express.Router();
var Destination = require('../models/destination');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Destinations = await Destination.findAll();
        res.json(Destinations);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { destinasi, deskripsi, paketID } = req.body;
        const newDestination = await Destination.create({destinasi, deskripsi, paketID });
        res.status(201).json(newDestination);
    } catch (err) {
        next(err);
    }
});

router.put('/:destinationID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { destinasi, deskripsi, paketID } = req.body;
        const Destinations = await Destination.findByPk(req.params.destinationID);
        if (Destinations) {
            Destinations.destinasi = destinasi;
            Destinations.deskripsi = deskripsi;
            Destinations.paketID = paketID;
            await Destinations.save();
            res.json(Destinations);
        } else {
            res.status(404).json({ message: 'Destination tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:destinationID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Destinations = await Destination.findByPk(req.params.destinationID);
        if (Destinations) {
            await Destinations.destroy();
            res.json({ message: 'Destination dihapus' });
        } else {
            res.status(404).json({ message: 'Destination tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
