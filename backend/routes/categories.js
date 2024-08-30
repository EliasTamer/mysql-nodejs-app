const express = require("express");
const categoriesController = require("../controllers/categories")


const router = express.Router();

router.post("/createCategory", categoriesController.createCategory)
router.get("/getCategories", categoriesController.getCategories)

module.exports = router