const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const ColorSchema = new Schema({
    itemColor: { type: String, minLength: 3, maxLength: 100, required: true},
    colorCode:  { type: String, required: true }
});

ColorSchema.virtual('url').get( function () {
    return `/all_categories/category/${this._id}`
});

module.exports = mongoose.model("Colors", ColorSchema);