const express = require('express');
const router = express.Router();
const toppingControllers = require('../controllers/toppingControllers')

router.get('/toppings/:productId', toppingControllers.getProductToppings);
router.get('/topping/:toppingId', toppingControllers.getToppingById);

module.exports = router;