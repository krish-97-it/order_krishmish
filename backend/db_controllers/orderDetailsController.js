const orderModel     = require('../db_models/order_details');
const cartDataModel  = require('../db_models/user_cart');

exports.orderPlaced = async(req,res) => {
    const empty_array       = [];
    const insertParameters  = {
        user_id          : req.body.userid,
        user_email       : req.body.useremail,
        contact_num      : req.body.phone,
        delivery_address : req.body.address,
        cupon_code       : req.body.offers,
        ordered_items    : req.body.items,
        order_amt        : req.body.price,
        status           : "Ordered Successfully",
        track_details    : "Your Order is in processing and will be delivered soon",
        updated_at       : new Date()
    }
    const query             = { user_id: req.body.userid };
    const updatedParameter  = {
        user_id     :   req.body.userid,
        cart_items  :   empty_array,
        updated_at  :   new Date()
    }
    const update            = { $set: updatedParameter };
    const options           = { upsert: true };
    try{
        const insertData    = await orderModel.create(insertParameters);
        if(insertData){
            const update_data   =  await cartDataModel.updateOne(query, update, options);
            if(update_data.acknowledged === true){
                return res.status(200).json({success:true, message: "Ordered Placed Successfully!!"})
            }else{
                return res.status(200).json({success:false, message: "Failed to place order", error:"Operation Failed"})
            }   
        }else{
            return res.status(200).json({success:false, message: "Failed to place order", error:"Operation Failed"})
        }         
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getOrderHistory = async (req,res) => {
    await orderModel.find({user_id:req.body.userid}).then(
        (orderData) =>{
            if(orderData.length > 0){
                return res.status(200).json({success:true, message: "Successfully fetched Order History!", data: orderData});
            }else{
                return res.status(200).json({success:false, message: "No Order History found"});
            }
        }
    ).catch(
        (error)=>{
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            })
        }
    )
}

