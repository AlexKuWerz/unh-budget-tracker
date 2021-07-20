const router = require('express').Router();
const transactionRoutes = require('./transactionRoutes');

router.use('/transaction', transactionRoutes);

module.exports = router;
