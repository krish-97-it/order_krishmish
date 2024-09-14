const cartDataModel = require('../db_models/user_cart');

exports.getCartData = async (req,res) => {
    try{
        await cartDataModel.find({user_id:req.body.userid}).then(
            (item) =>{
                if(item.length > 0){
                    return res.status(200).json({success:true, message: "Successfully fetched Cart Items!", data: item});
                }else{
                    return res.status(200).json({success:false, message: "No cart Items found"});
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
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

exports.updateCartData = async(req,res) => {
    // const currentDate       = new Date().toLocaleString('en-US', {timeZone: 'Asia/Calcutta'});
    const query             = { user_id: req.body.userid };
    const updatedParameter  = {
        user_id     :   req.body.userid,
        cart_items  :   req.body.cartitems,
        updated_at  :   new Date()
    }
    const update            = { $set: updatedParameter };
    const options           = { upsert: true };
    try{
        const update_data   =   await cartDataModel.updateOne(query, update, options);
        if(update_data.acknowledged === true){
            const find_data        = await cartDataModel.find({user_id:req.body.userid});
            if(find_data.length>0){
                res.status(200).json({success:true, message: "Cart Items are Updated!!", status:update_data, data: find_data});
            }else{
                res.status(200).json({success:false, message: "Something Went Wrong! Please try again after sometimes", status:update_data});
            }
        }else{
            res.status(200).json({success:false, message: "Failed to update Cart Items", error:"Operation failed"});
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
