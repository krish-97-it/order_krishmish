const {Schema, model}   = require('mongoose');

const orderSchema = new Schema(
    {
        user_id    : {
            type: String
        },
        user_email : {
           type: String
        },
        contact_num : {
            type: Number
         },
        delivery_address: {
            type: Array
        },
        cupon_code:{
            type: String
        },
        ordered_items: {
            type: Array
        },
        order_amt:{
            type: Number
        },
        status: {
            type: String
        },
        track_details: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
        },
    }
)

const orderModel = model("order_details", orderSchema);

module.exports = orderModel;