const Category = require("../models/categories");
const Item = require("../models/items");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all categorys.
exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({name: 1}).exec();

    res.render("category_list", {
      title: "Category List",
      category_list: allCategories,
    });
});

// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category_detail, allItemsInThisCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({category: req.params.id}).exec(),
  ]);

  if(category_detail === null) {
    const err = new Error("Category not found.");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "category Detail",
    category_detail: category_detail,
    allItemsInThisCategory: allItemsInThisCategory,
  });

});

// Display category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  const category = new Category();
  const errors = validationResult(req);

  res.render("category_form", {
    title: "Create Category", 
    category: category, 
    errors: errors.array(),});    
});

// Handle category create on POST.
exports.category_create_post = [
  body('name', 'Category must not be empty')
  .trim()
  .isLength({min : 1})
  .escape(),

asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  const category = new Category({ name: req.body.name });

  if(!errors.isEmpty()) {
    res.render("category_form", {
      title: "Create Category",
      category: category,
      errors: errors.array(),
    });
    return;
  } else {

    const categoryExists = await Category.findOne({ name: req.body.name }).exec();
    if(categoryExists) {
      res.redirect(categoryExists.url);

    } else {
      await category.save();
      res.redirect(category.url);
    }
    }
  }),
];

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [ category, allItemsInThisCategory ] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ cargory: req.params.id}).exec(),
  ]);

  if(category === null){
    res.redirect("/category");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    allItemsInThisCategory : allItemsInThisCategory,
  });

});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const [category, allItemsInThisCategory] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Item.find({ category: req.params.id }).exec(),
    ]);
  
    if (allItemsInThisCategory.length > 0) {
      res.render("category_delete", {
        title: "Delete Category",
        category: category,
        allItemsInThisCategory: allItemsInThisCategory,
      });
      return;
    } else {
      await Category.findByIdAndDelete(req.body.categoryid);
      res.redirect("/category");
    }
  });

// Display category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update GET");
});

// Handle category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update POST");
});
   