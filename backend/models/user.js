const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role :{
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                    required: true 
                },
                quantity: {
                    type: Number, 
                    required: true
                },
                itemCartPrice: {
                    type: Number,
                    require: true
                }
            }
        ]
    }
})

module.exports = mongoose.model('User', userSchema);