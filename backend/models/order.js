const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            cartProduct: {
                type: Object, 
                require: true
            }
        }
    ],
    delivery: {
        totalPrice: {
            type: String,
            require: true
        },
        methodPayment: {
            type: String,
            require: true
        },
        userAdress: {
            type: String,
            require: true
        }
    },
    user: {
        userId: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        userName: {
            type: String,
            require: true
        },
        userPhone: {
            type: String,
            require: true
        },
        userEmail: {
            type: String,
            require: true
        }
    }
})

module.exports = mongoose.model('Order', orderSchema);