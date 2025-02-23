const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    toppings: {
        items: [
            {
                toppingId: {type: Schema.Types.ObjectId, ref: "Topping", required: true},
                isAdded: {type: Boolean, require: true}
            }

        ]
    }
})

productSchema.methods.addToppingToProduct = function(topping) {
    const updatedToppingsItems = [...this.toppings.items];
    updatedToppingsItems.push({ 
        toppingId: topping._id, 
        isAdded: false 
    });
    const updatedProductToppings = {
        items: updatedToppingsItems
    }
    this.toppings = updatedProductToppings;
    return this.save();
}

module.exports = mongoose.model('Product', productSchema);