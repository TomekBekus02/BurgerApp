const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers')

router.post('/add-product', adminControllers.postAddProduct);
router.get('/product', adminControllers.getProduct);

module.exports = router;