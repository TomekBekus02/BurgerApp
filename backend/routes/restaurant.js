const express = require('express')
const router = express.Router();

const restaurantController = require('../controllers/restaurantControllers');

router.get('/products', restaurantController.getProduct);

module.exports = router;