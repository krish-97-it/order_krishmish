const {Schema, model} = require('mongoose');

// first need to initalize a schema for wishlist table
const myWishlist = new Schema(
    {
        user_id     : String,
        fav_items   : {
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

const wishlistModel = model("wishlists", myWishlist);

module.exports = wishlistModel;
