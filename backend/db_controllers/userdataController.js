const userModel = require('../db_models/customer');

exports.addUserData = async(req,res) => {
    try{
        await userModel.create(req.body).then(
            (data) =>{
                res.status(200).json({"message": "success","data":data})
            }
        ).catch((error) =>{
            res.status(404).json({
                message: "Failed to create new user"
            });
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
