const userModel = require('../db_models/customer');

exports.getUserData = async(req,res) => {
    try{
        const user_data = await userModel.find({email: req.body.email})
        res.json({message: "success","data":user_data});
    } catch(error) {
        res.json({message:error.message});
    }
}

exports.addUserData = async(req,response) => {
    await userModel.find({email: req.body.email}).then(
        (res) =>{
            if(res.length != 0){
                response.status(200).json({success: false, message: "Email Id is already registered. Try with a different email id.", error:"existing user"})
            }else{
                userModel.create(req.body).then(
                    (data) =>{
                        if(data){
                            response.status(200).json({success:true, message: "User Registered Successfully", data:data})
                        }else{
                            response.status(200).json({success:false, message: "User Registration Failed!. Try again after sometimes.", error:"Operation Failed"})
                        }   
                    }
                ).catch(
                    (error) => {
                        response.status(500).json({
                            success: false,
                            message: "Internal server error",
                            error: error.message
                        })
                    }
                )            
            }
        }
    ).catch(
        (error) => {
            response.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            })
        }
    )
}

exports.findAndUpdateUser   = async(req,res)=>{
    const query             = { email: req.body.email };
    const updatedParameter  = {
        firstname   :   req.body.firstname,
        lastname    :   req.body.lastname,
        nickname    :   req.body.nickname,
        gender      :   req.body.gender,
        dob         :   req.body.dob,
        email       :   req.body.email,
        phone       :   req.body.phone,
        state       :   req.body.state,
        district    :   req.body.district,
        city        :   req.body.city,
        pincode     :   req.body.pincode,
        profileimg  :   req.body.profileimg,
        updated_at  :   Date.now()
    }
    const update            = { $set: updatedParameter };
    const options           = { upsert: false };
    try{
        const update_data   =   await userModel.updateOne(query, update, options);
        if(update_data.acknowledged === true){
            res.status(200).json({success:true, message: "User updated successfuly!!", data:update_data});
        }else{
            res.status(200).json({success:false, message: "Failed to update user", error:"Operation failed"});
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
