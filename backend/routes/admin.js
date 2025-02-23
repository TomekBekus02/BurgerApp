const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers')

router.post('/add-product', adminControllers.postAddProduct);
router.get('/edit-product/:productId', adminControllers.editProduct);
router.post('/edit-product/:productId', adminControllers.postEditProduct);

module.exports = router;