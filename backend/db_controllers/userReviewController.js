const reviewModel = require('../db_models/user_review');

exports.getReviews = async (req,res) =>{
    await reviewModel.find({}).then(
        (review) => {
            if(review.length > 0){
                res.status(200).json({success: true, message:"review data found successfully!", data:review});
            }else{
                res.status(500).json({success: false, message:"No review added yet"});
            }
        }
    ).catch(
        (error)=> {
            res.status(500).body({success: false, message:error});
        }
    );
}

exports.getUserReview = async (req,res) => {
    try{
        const user_data = await reviewModel.find({user_id: req.body.userid});
        if(user_data){
            res.status(200).json({success:true, message: "existing review found", data:user_data});
        }else{
            res.status(200).json({success:false, message: "Data not found"});
        }
    } catch(error) {
        res.json({message:error.message});
    }
}

exports.saveReviews = async(req,res) => {
    const query             = { user_id: req.body.userid };
    const updatedParameter  = {
        user_id     :   req.body.userid,
        firstname   :   req.body.firstname,
        lastname    :   req.body.lastname,
        state       :   req.body.state,
        district    :   req.body.district,
        comment     :   req.body.comment,
        rating      :   req.body.rating,
        profilepic  :   req.body.profilepic,
        is_approve  :   false,
        updated_at  :   new Date()
    }
    const update            = { $set: updatedParameter };
    const options           = { upsert: true };
    try{
        const update_data   =   await reviewModel.updateOne(query, update, options);
        if(update_data.acknowledged === true){
            res.status(200).json({success:true, message: "Review Updated successfully!!", status:update_data});
        }else{
            res.status(200).json({success:false, message: "Failed to update review", error:"Operation failed"});
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}