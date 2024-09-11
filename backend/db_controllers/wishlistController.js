const wishlistModel = require('../db_models/my_wishlist');

exports.getWishList = (req,res) => {
    wishlistModel.find({user_id:req.body.userid}).then(
        (wishlist) =>{
            if(wishlist.length > 0){
                return res.status(200).json({success:true, message: "Successfully fetched wishlist!", data: wishlist});
            }else{
                return res.status(200).json({success:false, message: "No wishlist found"});
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

exports.updateWishList = async(req,res) => {
    // const currentDate       = new Date().toLocaleString('en-US', {timeZone: 'Asia/Calcutta'});
    const query             = { user_id: req.body.userid };
    const updatedParameter  = {
        user_id     :   req.body.userid,
        fav_items   :   req.body.favitems,
        updated_at  :   new Date()
    }
    const update            = { $set: updatedParameter };
    const options           = { upsert: true };
    try{
        const update_data   =   await wishlistModel.updateOne(query, update, options);
        if(update_data.acknowledged === true){
            const find_data        = await wishlistModel.find({user_id:req.body.userid});
            if(find_data.length>0){
                res.status(200).json({success:true, message: "Wishlist Updated!!", status:update_data, data: find_data});
            }else{
                res.status(200).json({success:false, message: "Something Went Wrong! Please try again after sometimes", status:update_data});
            }
        }else{
            res.status(200).json({success:false, message: "Failed to update wishlist", error:"Operation failed"});
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
