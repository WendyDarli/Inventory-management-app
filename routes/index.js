const express = require("express");
const router = express.Router();

const item_controller = require('../controllers/itemsController');
const categories_controller = require('../controllers/categoriesController');
const colors_controller = require('../controllers/colorsController');

router.get("/", item_controller.index);

module.exports = router;