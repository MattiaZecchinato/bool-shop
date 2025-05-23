const express = require('express');

const router = express.Router();

//shop controllers
const shopControllers = require('../controllers/shopControllers');

// index
router.get('/', shopControllers.index);

// index search order
router.get('/search', shopControllers.indexSearchOrder);

// checkout
router.post('/checkout', shopControllers.checkout);

// product details (slug deve essere per ultimo)
router.get('/:slug', shopControllers.productDetails);

module.exports = router;