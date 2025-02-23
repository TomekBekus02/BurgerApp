const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const toppingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }
})

module.exports = mongoose.model("Topping", toppingSchema);