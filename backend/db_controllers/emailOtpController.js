const otpModel      = require('../db_models/otp_model');
const userModel     = require('../db_models/customer');
const nodemailer    = require("nodemailer");
const otpGenerator  = require('otp-generator');

// generate random 4 digits number otp
const generateOtp = ()=> {
    // const otp = Math.floor((1000+Math.random()*9000));
    const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    })
    return otp;
}

// Create a Html Body For OTP verification mail
const createEmailHtml = (otp_pass)=>{
const mail_html       = '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">'+
                            '<div style="margin:50px auto;width:70%;padding:20px 0">'+
                                '<div style="border-bottom:2px solid #eee">'+
                                    '<div style="background-image: linear-gradient(to right, #ffbc87 0%, #f3f45d 50%, #2a8e75 100%); padding-left: 10px; margin-bottom: 5px;">'+
                                        '<a href="https://krishmish-order.onrender.com/" style="background-color:black; color:white !important; text-decoration:none !important; font-size: 18px; font-weight:600; padding:2px 8px; border-radius:6px">KrishMish</a>'+
                                    '</div>'+
                                '</div>'+
                                '<div style="padding-left:10px; padding-right: 10px;">'+
                                    '<p style="font-size:1.1em">Hi,</p>'+
                                    '<p>Thank you for choosing KrishMish. Complete your verification with the following OTP, valid for 10 minutes</p>'+
                                    '<p>Your One Time Password(OTP) - </p>'+
                                    '<h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">'+otp_pass+'</h2>'+
                                    '<p style="font-size:0.9em;">Regards,<br />Team KrishMish</p>'+
                                    // '<img src="https://img.perceptpixel.com/pykhlszs/shop-logo-one-1.jpg" alt="brand logo" width="80px" height="80px">'+
                                    '<hr style="border:none;border-top:1px solid #eee" />'+
                                '</div>'
                                '<div style="float:right;padding:2px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">'+
                                    // '<p>KrishMish</p>'+
                                    '<p>For help mail at - mish.krish1996@gmail.com</p>'+
                                    // '<p>California</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
    return mail_html;
}

// Api For send email otp
exports.sendEmailOtp        = async(req,res)=>{
    const otpCode           = generateOtp();
    const user_email        = req.body.email;
    const user_type         = req.body.usertype;

    // Set Up Email Server and Parameters
    const transporter       = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: 'mish.krish1996@gmail.com',
            pass: process.env.EMAIL_APP_PASS
        }
    });
    const emailHtml         = createEmailHtml(otpCode);
    const email_params      = {
        from: '"KrishMish" <mish.krish1996@gmail.com>', 
        to: user_email, // list of receivers
        subject: "OTP Verification", 
        // text: "Your OTP is - "+otp_code,
        html: emailHtml
    }

    // Save otpdata on mongo db
    const otp_sent_at       = Date.now();
    const otp_expired_at    = otp_sent_at+600000;

    const query             = { email: user_email };
    const otpParameter      = {
        email       : user_email,
        otp         : otpCode,
        expired_at  : otp_expired_at,  //expire after 10 seconds from now
        updated_at  : Date.now()
    }
    const update            = { $set: otpParameter };
   

    try{
        if(user_type === 'existing-user'){
            const options           = { upsert: false };
            const find_email        = await userModel.find({email:user_email});
            if(find_email.length > 0){
                try{
                    const update_data   = await otpModel.updateOne(query, update, options);
                    if(update_data.acknowledged === true){
                        await transporter.sendMail(email_params).then(
                            (response) => {
                                if(response.accepted.length > 0){
                                    return res.status(200).json({success:true, message: "OTP sent Successfully!!"});
                                }else{
                                    return res.status(200).json({success:false, message: "Something went wrong! Please try again after sometimes"});
                                }
                            }
                        ).catch(
                            (error) =>{
                                res.status(500).json({
                                    success: false,
                                    message: "Internal server error",
                                    error: error
                                })
                            }
                        );
                    }else{
                        res.status(200).json({success:false, message: "Failed to sent OTP", error:"Operation failed"});
                    }
                }catch(error){
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }else{
                return res.status(200).json({success:false, message: "User not found! Try to login with a registered email id"});
            }
        }else if(user_type === 'new-user'){
            const options           = { upsert: true };
            const find_email        = await userModel.find({email:user_email});
            if(find_email.length > 0){
                return res.status(200).json({success:false, message: "Entered email id is already registered. Try with a different email id"});
            }else{
                try{
                    const update_data   = await otpModel.updateOne(query, update, options);
                    if(update_data.acknowledged === true){
                        await transporter.sendMail(email_params).then(
                            (response) => {
                                if(response.accepted.length > 0){
                                    return res.status(200).json({success:true, message: "OTP sent Successfully!!"});
                                }else{
                                    return res.status(200).json({success:false, message: "Something went wrong! Please try again after sometimes"});
                                }
                            }
                        ).catch(
                            (error) =>{
                                res.status(500).json({
                                    success: false,
                                    message: "Internal server error",
                                    error: error
                                })
                            }
                        );
                    }else{
                        res.status(200).json({success:false, message: "Failed to sent OTP", error:"Operation failed"});
                    }
                }catch(error){
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }
        }else{
            res.status(200).json({success:false, message: "Failed to sent OTP. Try after sometimes", error:"Operation failed"});
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

//  API body for Verify Otp
exports.verifyEmailOtp      = async (req,res) => {
    const user_email        = req.body.email;
    const email_otp         = req.body.otp;

    try{
        const find_email    = await otpModel.find({email:user_email})
        if(find_email.length > 0){
            const sent_otp  =   find_email[0].otp;
            const expire    =   Date.parse(find_email[0].expired_at);
            if(sent_otp === email_otp){
                if(expire > Date.now()){
                    return res.status(200).json({success:true, message: "OTP verified Successfully!!"});
                }else{
                    return res.status(200).json({success:false, message: "OTP is expired!!"});
                }
            }else{
                return res.status(200).json({success:false, message: "Incorrect Otp!"});
            }
        }else{
            return res.status(200).json({success:false, message: "Email Address not found"});
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}