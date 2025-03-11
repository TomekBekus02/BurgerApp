const express = require('express')
const router = express.Router();

const restaurantController = require('../controllers/restaurantControllers');

router.post('/addProductToCart', restaurantController.addToCart);
router.get('/userCart/:userId', restaurantController.getUserCart);
module.exports = router;