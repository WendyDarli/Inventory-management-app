const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PantsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    colors: { type: [{color: Schema.Types.ObjectId, swatchImageUrl: String}], required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    mainImageUrl: { type: String, required: true },
});

PantsSchema.virtual('url').get(function () {
    return `/categories/Pants/${this._id}`;
});

PantsSchema.virtual('avaliability').get(function () {
    return this.stock === 0 ? 'Out of Stock' : this.stock;
});

module.exports = mongoose.model("Pants", PantsSchema);