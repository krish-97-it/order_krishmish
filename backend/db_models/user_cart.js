const {Schema, model} = require('mongoose');

// first need to initalize a schema for wishlist table
const cartSchema = new Schema(
    {
        user_id     : String,
        cart_items  : {
            type: Array
        },
        created_at  : {
            type: Date,
            default: new Date()
        },
        updated_at  : {
            type: Date
        }
    }
)

const cartDataModel = model("cart_items", cartSchema);

module.exports = cartDataModel;
