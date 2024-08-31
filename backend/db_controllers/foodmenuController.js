const foodModel = require('../db_models/food_menu');

// app.get('/getFoodMenu', async(req,res) => {
    //     try{
    //         const food_menu = await foodModel.find({})
    //         res.json([{message: "success"},{"data":food_menu}]);
    //     } catch(error) {
    //         res.json({message:error.message});
    //     }
    // });

// app.get('/getFoodMenu', async(req,res) => {
//     await foodModel.find({}).then(
//         (food) =>{
//             res.json([{message: "success"},{"data":food}]);
//         }
//     ).catch((error) =>{
//         res.json({message:error.message});
//     });
// });

exports.fetchFoodMenu = async(req,res) => {
    try{
        await foodModel.find({}).then(
            (food) =>{
                res.json([{message: "success"},{"data":food}]);
            }
        ).catch((error) =>{
            res.status(404).json({
                message:"Data not found"
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
