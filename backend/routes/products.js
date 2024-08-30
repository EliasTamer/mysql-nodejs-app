const express = require("express");
const productsController = require("../controllers/products")


const router = express.Router();

router.post("/createProduct", productsController.createProduct)
router.get("/productDetails/:id", productsController.productDetails)
router.get("/getProducts", productsController.products)

module.exports = router