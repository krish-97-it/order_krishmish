// This is db model for food_menus collection, A model defines a collection schema inside a MongoDB database.

// import Schema and model function from mongoose module
const {Schema, model}   = require('mongoose');
// const app               = require('../app');


    // This function executes mongoose schema method to set the scheema that will be run to mongoDB
    const foodSchema = new Schema(
        {
            name : {
                type: String,
                required: true,
                maxlength: 50
            },
            image: Object,
            description: String,
            cuisine: String,
            category: String,
            quantity: String,
            rating: String,
            preptime: String,
            subtitle:String,
            tags: String,
            price: Number,
            // createdAt: {
            //     type: Date,
            //     default: Date.now,
            // },
        }
    )
    
    // Initalise a model for food_menus collection using created schema
    const foodModel = model("food_menus", foodSchema);

module.exports = foodModel;