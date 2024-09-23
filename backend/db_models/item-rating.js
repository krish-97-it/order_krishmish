const {Schema, model} = require('mongoose');

// first need to initalize a schema for wishlist table
const ratedItems = new Schema(
    {
        user_id     : String,
        rated_items : {
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

const ratedItemsModel = model("item_ratings", ratedItems);

module.exports = ratedItemsModel;
