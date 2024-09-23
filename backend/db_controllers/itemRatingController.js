const ratedItemsModel = require('../db_models/item-rating');

exports.getRatedItems = (req,res) => {
    ratedItemsModel.find({user_id:req.body.userid}).then(
        (dataitems) =>{
            if(dataitems.length > 0){
                return res.status(200).json({success:true, message: "Successfully fetched rated items!", data: dataitems});
            }else{
                return res.status(200).json({success:false, message: "No item found"});
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

exports.updateRatedItems = async(req,res) => {
    const query             = { user_id: req.body.userid };
    const updatedParameter  = {
        user_id     :   req.body.userid,
        rated_items :   req.body.ratedItems,
        updated_at  :   new Date()
    }
    const update            = { $set: updatedParameter };
    const options           = { upsert: true };
    try{
        const update_data   =   await ratedItemsModel.updateOne(query, update, options);
        if(update_data.acknowledged === true){
            const find_data        = await ratedItemsModel.find({user_id:req.body.userid});
            if(find_data.length>0){
                res.status(200).json({success:true, message: "list Updated!!", status:update_data, data: find_data});
            }else{
                res.status(200).json({success:false, message: "Something Went Wrong! Please try again after sometimes", status:update_data});
            }
        }else{
            res.status(200).json({success:false, message: "Failed to update list", error:"Operation failed"});
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
