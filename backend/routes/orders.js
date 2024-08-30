const express = require("express");
const ordersController = require("../controllers/orders")


const router = express.Router();

router.post("/placeOrder", ordersController.placeOrder)

module.exports = router