const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

// include controllers
const product_controller = require('../Controllers/Products');
const userController = require('../Controllers/Users')
const orderController = require('../Controllers/Orders')

router.use(bodyParser.urlencoded({ extended: false}))
router.use(bodyParser.json())

// --------------------------routes--------------------------
//product routes

router.get('/products', product_controller.all_products);
router.post('/create', product_controller.product_create);
router.get('/products/:id', product_controller.product_details);
router.put('/update/:id', product_controller.product_update);
router.delete('/delete/:id', product_controller.product_delete);


//user routes

router.post('/registerUser', userController.registerUser)
router.post('/loginUser', userController.loginUser)


//order routes
router.post('/submitOrder', orderController.submitOrder)
router.get('/getAllOrders', orderController.getAllOrders)
router.get('/getOrdersForId', orderController.getOrdersForId)
router.post('/processOrderById', orderController.processOrderById)
router.post('/deleteOrderById', orderController.deleteOrderById)
module.exports = router;


