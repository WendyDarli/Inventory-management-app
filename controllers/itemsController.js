const Item = require("../models/items");
const Colors = require("../models/colors");
const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [
      numItems,
      numCategories,
      numColors,
    ] = await Promise.all([
      Item.countDocuments({}).exec(),
      Category.countDocuments({}).exec(),
      Colors.countDocuments({}).exec(),
    ]);

    res.render("index", {
      title: 'Inventory Management Home',  
      items_count: numItems,
      category_count: numCategories,
      colors_count: numColors,
    });
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {


});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: item detail: ${req.params.id}`);
});

// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create GET");
});

// Handle item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item create POST");
});

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete GET");
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item delete POST");
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update GET");
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: item update POST");
});
   