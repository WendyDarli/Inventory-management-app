const express = require("express");
const router = express.Router();

const item_controller = require('../controllers/itemsController');
const categories_controller = require('../controllers/categoriesController');
const colors_controller = require('../controllers/colorsController');

//get home page
router.get("/", item_controller.index);

/// ITEM ROUTES ///

router.get("/item/create", item_controller.item_create_get);

router.post("/item/create", item_controller.item_create_post);

router.get("/item/:id/delete", item_controller.item_delete_get);

router.post("/item/:id/delete", item_controller.item_delete_post);

router.get("/item/:id/update", item_controller.item_update_get);

router.post("/item/:id/update", item_controller.item_update_post);

router.get("/item/:id", item_controller.item_detail);

router.get("/item", item_controller.item_list);


/// CATEGORIES ROUTES ///

router.get("/category/create", categories_controller.category_create_get);

router.post("/category/create", categories_controller.category_create_post);

router.get("/category/:id/delete", categories_controller.category_delete_get);

router.post("/category/:id/delete", categories_controller.category_delete_post);

router.get("/category/:id/update", categories_controller.category_update_get);

router.post("/category/:id/update", categories_controller.category_update_post);

router.get("/category/:id/", categories_controller.category_detail);

router.get("/category", categories_controller.category_list);

/// COLORS ROUTES ///

router.get("/color/create", colors_controller.colors_create_get);

router.post("/color/create", colors_controller.colors_create_post);

router.get("/color/:id/delete", colors_controller.colors_delete_get);

router.post("/color/:id/delete", colors_controller.colors_delete_post);

router.get("/color/:id/update", colors_controller.colors_update_get);

router.post("/color/:id/update", colors_controller.colors_update_post);

router.get("/color/:id", colors_controller.colors_detail);

router.get("/color", colors_controller.colors_list);

module.exports = router;