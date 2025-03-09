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
                title: {type: String, required: true},
                price: {type: Number, required: true}
            }
        ]
    },
})

productSchema.methods.addToppingToProduct = function(topping) {
    const updatedToppingsItems = [...this.toppings.items];
    console.log( "in module: " + topping)
    updatedToppingsItems.push({ 
        toppingId: topping._id, 
        title: topping.title,
        price: topping.price 
    });
    const updatedProductToppings = {
        items: updatedToppingsItems
    }
    this.toppings = updatedProductToppings;
    return this.save();
}

productSchema.methods.deleteToppingFromProduct = function(toppingId){
    const updatedToppingsItems = this.toppings.items.filter(topping => {
        return topping.toppingId.toString() !== toppingId.toString();
    })
    this.toppings.items = updatedToppingsItems;
    return this.save();
}

module.exports = mongoose.model('Product', productSchema);