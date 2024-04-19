const asyncHandler = require("express-async-handler");

// Display list of all colors.
exports.colorslist = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorslist");
});

// Display detail page for a specific colors
exports.colorsdetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: colorsdetail: ${req.params.id}`);
});

// Display colorscreate form on GET.
exports.colorscreate_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorscreate GET");
});

// Handle colorscreate on POST.
exports.colorscreate_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorscreate POST");
});

// Display colorsdelete form on GET.
exports.colorsdelete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsdelete GET");
});

// Handle colorsdelete on POST.
exports.colorsdelete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsdelete POST");
});

// Display colorsupdate form on GET.
exports.colorsupdate_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsupdate GET");
});

// Handle colorsupdate on POST.
exports.colorsupdate_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: colorsupdate POST");
});
   