const router = require('express').Router();
const { Transaction } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const transactionData = await Transaction.find({}).sort({ date: -1 });

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(404).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const transactionData = await Transaction.create(req.body);

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(404).json(err);
    }
});

router.post('/bulk', async (req, res) => {
    try {
        const transactionData = await Transaction.insertMany(req.body);

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = router;
