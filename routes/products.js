const express = require("express");
const productsController = require("../controllers/products")


const router = express.Router();

router.post("/createProduct", productsController.createProduct)

module.exports = router