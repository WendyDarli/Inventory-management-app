const asyncHandler = require("express-async-handler");
const Colors = require("../models/colors")
const Item = require("../models/items");
const { body, validationResult } = require("express-validator");

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
  const color = new Colors();
  const errors = validationResult(req);

  res.render("colors_form", {
    title: "Create Color",
    color: color,
    errors: errors.array(),
  });
});

// Handle colorscreate on POST.
exports.colors_create_post = [
  body('itemColor', 'Color must be not empty.').trim().isLength({min : 3}).escape(),
  body('colorCode', "Color code must not be empty.").trim().isLength({min: 3}).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const colors = new Colors({ 
      itemColor: req.body.itemColor, 
      colorCode: req.body.colorCode,
    });

    if(!errors.isEmpty()) {
      res.render("colors_form", {
        title: "Create colors",
        color: colors,
        errors: errors.array(),
      });
      return;

    } else {
      const colorExist = await Colors.findOne({ itemColor: req.body.itemColor }).exec();
      if(colorExist) {
        res.redirect(colorExist.url);
      
      } else {
        await colors.save();
        res.redirect(colors.url);
      }}
    }),
];

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
   