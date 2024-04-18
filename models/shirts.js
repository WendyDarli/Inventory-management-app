const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShirtsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    colors: { type: [{color: Schema.Types.ObjectId, swatchImageUrl: String}], required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    mainImageUrl: { type: String, required: true },
});

ShirtsSchema.virtual('url').get(function () {
    return `/categories/shirts/${this._id}`;
});

ShirtsSchema.virtual('avaliability').get(function () {
    return this.stock === 0 ? 'Out of Stock' : this.stock;
});

module.exports = mongoose.model("Shirts", ShirtsSchema);