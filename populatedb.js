#! /usr/bin/env node

console.log(
    'This script populates some test items to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory_management?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Dress = require("./models/dresses");
  const Pants = require("./models/pants");
  const Shirt = require("./models/shirts");
  const Shoe = require("./models/shoes");
  const Category = require("./models/categories");
  
  const dresses = [];
  const pants = [];
  const shirts = [];
  const shoes = [];
  const categories = [];

  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createDresses();
    await createPants();
    await createShirts();
    await createShoes();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function dressesCreate(index, name, price, colors, stock, description, category, pictureUrl) {
    const dressdetail = { 
      name: name, 
      price: price,
      colors: colors,
      stock: stock,
      description: description,
      pictureUrl: pictureUrl,
      
    };
    if (category != false) dressdetail.category = category;

  
    const dress = new Dress(dressdetail);
  
    await dress.save();
    dresses[index] = dress;
    console.log(`Added dress: ${name}`);
  }
  
  async function pantsCreate(index, name, price, colors, stock, description, category, pictureUrl) {
    const pantsdetail = {
      name: name, 
      price: price,
      colors: colors,
      stock: stock,
      description: description,
      pictureUrl: pictureUrl,
      
    };
    if (category != false) pantsdetail.category = category;

  
    const pant = new Pants(pantsdetail);
  
    await pant.save();
    pants[index] = pant;
    console.log(`Added pants: ${name}`);
  }
  
  async function shirtCreate(index, name, price, colors, stock, description, category, pictureUrl) {
    const shirtdetail = {
      name: name, 
      price: price,
      colors: colors,
      stock: stock,
      description: description,
      pictureUrl: pictureUrl,
      
    };
    if (category != false) shirtdetail.category = category;

  
    const shirt = new Shirt(shirtdetail);
  
    await shirt.save();
    shirts[index] = shirt;
    console.log(`Added shirt: ${name}`);
  }

  async function shoesCreate(index, name, price, colors, stock, description, category, pictureUrl) {
    const shoedetail = {
      name: name, 
      price: price,
      colors: colors,
      stock: stock,
      description: description,
      pictureUrl: pictureUrl,
      
    };
    if (category != false) shoedetail.category = category;

  
    const shoe = new Shoe(shoedetail);
  
    await shoe.save();
    shoes[index] = shoe;
    console.log(`Added shoe: ${name}`);
  }
  

  //populating
  async function createDresses() {
    console.log("Adding dresses");
    await Promise.all([
      dressesCreate(0, "Heart-shaped neckline dress with flared sleeves and rufflesPatrick", "37.95", ["Black", "Brown"], "38", "Product Description", [categories[0]], "https://i.pinimg.com/564x/e8/dc/61/e8dc61cc56ba9bba722d627244a917d6.jpg"),
      dressesCreate(1, "Ruffled Strap Dress with Ribbed Summer Top", "25.34", ["Black", "White", "Light Blue"], "25", "Product Description", [categories[0]], "https://i.pinimg.com/564x/a0/0e/2e/a00e2e42965e6d7cbcca885a62a0b7a9.jpg"),
      dressesCreate(2, "Lace Front Gingham Print Cold Shoulder Dress", "27.55", ["Red", "Light Blue"], "63", "Product Description", [categories[0]], "https://i.pinimg.com/564x/17/b6/89/17b689beb54afb36a594848da1f48d0a.jpg"),
    ]);
  }
  
  async function createShirts() {
    console.log("Adding Shirts");
    await Promise.all([
      shirtCreate(0, "Plain blouse with asymmetrical hem", "17.35", ["White"], "39", "Product Description", [categories[1]], "https://i.pinimg.com/564x/cc/ff/32/ccff32221072df4cf7f3416dfb46a498.jpg"),
      shirtCreate(1, "Oversized T-shirt", "47.05", ["Grey"], "24", "Product Description", [categories[1]], "https://i.pinimg.com/564x/2a/f3/c8/2af3c8506818b190d673fd000943e7c8.jpg"),
      shirtCreate(2, "Letter Graphic Shirt for Men", "24.65", ["Black"], "15", "Product Description", [categories[1]], "https://i.pinimg.com/564x/12/d7/60/12d760de55475a3f4b9dddab88a4b7c9.jpg"),
      shirtCreate(3, "Regular Fit Lace resort shirt", "24.49", ["Black"], "70", "Product Description", [categories[1]], "https://i.pinimg.com/564x/21/34/86/2134860cdc1a38dedd6394d7e6c8a489.jpg"),
    ]);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Dresses"),
      categoryCreate(1, "Shirts"),
      categoryCreate(2, "Pants"),
      categoryCreate(3, "Shoes"),
    ]);
  }

  async function createPants() {
    console.log("Adding Shirts");
    await Promise.all([
      pantsCreate(0, "Social pants", "29.90", ["Black"], "35", "Product Description", [categories[2]], "https://i.pinimg.com/564x/10/8b/dd/108bddf48a44779fc59776a10dfddd7d.jpg"),
      pantsCreate(1, "Sweat pants", "5.05", ["Grey"], "88", "Product Description", [categories[2]], "https://i.pinimg.com/564x/fb/1d/cf/fb1dcfbc828ec4e932ce53fcfe343f9e.jpg"),
      pantsCreate(2, "Bell bottom pants", "7.25", ["Black"], "32", "Product Description", [categories[2]], "https://i.pinimg.com/736x/04/1a/92/041a92900e63ee7b64103d907d742e07.jpg"),
    ]);
  }
  
  async function createShoes() {
    console.log("Adding Shirts");
    await Promise.all([
      shoesCreate(0, "Women Minimalist Ankle Strap Platform Chunky Round Toe Pumps", "59.90", ["Black"], "36", "Product Description", [categories[3]], "https://i.pinimg.com/564x/bd/7b/4f/bd7b4f4673985aece2eed487c3508354.jpg"),
      shoesCreate(1, "Minimalist Lace-up Front Skate Shoes", "55.25", ["White"], "74", "Product Description", [categories[3]], "https://i.pinimg.com/564x/67/b8/d1/67b8d159ac3ae75c54f296a890911938.jpg"),
      shoesCreate(2, "Shop Women's Sneaker", "67.85", ["Black"], "75", "Product Description", [categories[3]], "https://i.pinimg.com/564x/80/17/c2/8017c26c5192020d4f06ae0789495216.jpg"),
    ]);
  }