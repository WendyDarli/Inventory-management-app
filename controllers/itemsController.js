const upload = require("../multerConfig");

const Item = require("../models/items");
const Colors = require("../models/colors");
const Category = require("../models/categories");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  const allItems = await Item.find({}, "name price mainImageUrl")
  .sort({ name: 1 })
  .populate("category")
  .exec();

  res.render("items_list", {
    title: "All Items", 
    item_list: allItems
  });
});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const itemDetail = await
    Item.findById(req.params.id)
    .populate("price")
    .populate("colors")
    .populate("stock")
    .populate("description")
    .populate("category")
    .exec();

  if (Item === null) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: itemDetail.name,
    itemDetail: itemDetail,
   
  })
});

// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  const item = new Item();

  const errors = validationResult(req);
  res.render("item_form", {
    title: "Create Item",
    category : allCategories,
    item: item,
    errors: errors.array(),

  });
});

// Handle item create on POST.
exports.item_create_post = [
  // Convert category string to array of ObjectIds
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category = [req.body.category];
    }
    next();
  },

  upload.single("mainImageUrl"),

//validate and sanitize fields
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isNumeric().withMessage("Price must be a number")
    .escape(),
  body("stock", "Stock quantity must be a number.")
    .trim()
    .isNumeric().withMessage("Stock must be a number")
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),
  body("mainImageUrl"),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      colors: req.body.colors,
      description: req.body.description,
      category: req.body.category,
      mainImageUrl: req.file.path,
    });

    if (!errors.isEmpty()) {
      // If there are errors, retrieve all categories and render the form again
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }

      res.render("item_form", {
        title: "Create Item",
        category: allCategories,
        item: item,
        errors: errors.array(),
      });
      
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();

  if(item === null) {
    res.redirect("/items");
  }

  res.render("item_delete", {
    title: "Detele Item",
    item: item,
  });
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect("/item");
  });

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories ] = await Promise.all([
    Item.findById(req.params.id).populate("category").exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  
  if (item === null) {
    const err = new Error("Item not found.");
    err.status = 404;
    return next(err);
  }

  allCategories.forEach((category) => {
    if (item.category.includes(category._id)) category.checked = true;
  });

  const errors = validationResult(req);

  res.render("item_form", {
    title: "Update Item",
    category: allCategories,
    item: item,
    errors: errors.array(),
  });
});


// Handle item update on POST.
exports.item_update_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  upload.single("mainImageUrl"),

  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isNumeric().withMessage("Price must be a number")
    .escape(),
  body("stock", "Stock quantity must be a number.")
    .trim()
    .isNumeric().withMessage("Stock must be a number")
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),
  body("mainImageUrl"),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    
    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      colors: req.body.colors,
      description: req.body.description,
      category: typeof req.body.category === "undefined" ? [] : req.body.category,
      mainImageUrl: req.file.path,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // If there are errors, retrieve all categories and render the form again
      const allCategories = await Category.find().sort({ name: 1 }).exec();
      
      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }
  
      res.render("item_form", {
        title: "Create Item",
        category: allCategories,
        item: item,
        errors: errors.array(),
      });
      
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {}); 
      res.redirect(item.url);
    }
  }),
];

   