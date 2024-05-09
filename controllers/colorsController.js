const asyncHandler = require("express-async-handler");
const Colors = require("../models/colors")
const Item = require("../models/items")

// Display list of all colors.
exports.colors_list = asyncHandler(async (req, res, next) => {
  const allColors = await Colors.find().sort({ itemColor: 1 }).exec();

  res.render("colors_list", {
    title: "Colors List",
    colors_list: allColors,
  });
});

// Display detail page for a specific colors
exports.colors_detail = asyncHandler(async (req, res, next) => {

  const colorDetail = await Colors.findById(req.params.id).exec()

  if (!colorDetail) {
    const err = new Error("Color not found.");
    err.status = 404;
    return next(err);
  }

  res.render("color_detail", {
    title: "Color Detail",
    colorDetail: colorDetail,
  });
});
 
// Display colorscreate form on GET.
exports.colors_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorscreate GET");
});

// Handle colorscreate on POST.
exports.colors_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorscreate POST");
});

// Display colorsdelete form on GET.
exports.colors_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsdelete GET");
});

// Handle colorsdelete on POST.
exports.colors_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsdelete POST");
});

// Display colorsupdate form on GET.
exports.colors_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsupdate GET");
});

// Handle colorsupdate on POST.
exports.colors_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsupdate POST");
});
   