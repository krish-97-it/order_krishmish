// This model defines customer collection schema inside a MongoDB database.

// import Schema and model function from mongoose module
const {Schema, model}   = require('mongoose');


// This function executes mongoose schema method to set the scheema that will be run to mongoDB
const customerSchema = new Schema(
    {
        firstname : {
            type: String,
            required: true,
            maxlength: 50
        },
        lastname: {
            type: String,
            required: true,
            maxlength: 50
        },
        nickname: {
            type: String,
            required: true,
            maxlength: 50
        },
        gender: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
            maxlength: 10
        },
        state:{
            type: String
        },
        district:{
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: Number,
        },
        profileimg: {
            type: String,
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
const customerModel = model("customers", customerSchema);

module.exports = customerModel;