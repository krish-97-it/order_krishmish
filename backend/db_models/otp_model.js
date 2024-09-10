const {Schema, model}   = require('mongoose');

const otpSchema = new Schema(
    {
        email : {
           typr: String,
        },
        otp: {
            type: Number,
            maxlength: 4
        },
        expired_at:{
            type: Date,
            default: Date.now,
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

const otpModel = model("email_otps", otpSchema);

module.exports = otpModel;