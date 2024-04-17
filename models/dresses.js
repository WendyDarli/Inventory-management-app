const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DressesSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    colors: { type: [String], required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    category: [{ type: Schema.type.ObjectId, ref: "Category" }],
});

DressesSchema.virtual('url').get(function () {
    return `/categories/Dresses/${this._id}`;
});

DressesSchema.virtual('availability').get(function () {
    return this.stock === 0 ? 'Out of Stock' : this.stock;
});

module.exports = mongoose.model("Dresses", DressesSchema);
