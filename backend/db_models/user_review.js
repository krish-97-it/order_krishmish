// This model defines customer collection schema inside a MongoDB database.

// import Schema and model function from mongoose module
const {Schema, model}   = require('mongoose');


// This function executes mongoose schema method to set the scheema that will be run to mongoDB
const ReviewSchema = new Schema(
    {
        user_id   : {
            type: String
        },
        firstname : {
            type: String
        },
        lastname: {
            type: String
        },
        district: {
            type: String
        },
        state: {
            type: String
        },
        profilepic: {
            type: String
        },
        rating: {
            type: Number
        },
        comment: {
            type: String
        },
        is_approve: {
            type: Boolean,
            default: true
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    }
)

// Initalise a model for food_menus collection using created schema
const reviewModel = model("user_reviews", ReviewSchema);

module.exports = reviewModel;