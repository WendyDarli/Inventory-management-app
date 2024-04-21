const asyncHandler = require("express-async-handler");

// Display list of all colors.
exports.colors_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorslist");
});

// Display detail page for a specific colors
exports.colors_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: colorsdetail: ${req.params.id}`);
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
   