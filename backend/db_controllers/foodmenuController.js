const foodModel = require('../db_models/food_menu');

// app.get('/getFoodMenu', async(req,res) => {
//     await foodModel.find({}).then(
//         (food) =>{
//             res.json([{message: "success"},{"data":food}]);
//         }
//     ).catch((error) =>{
//         res.json({message:error.message});
//     });
// });

exports.fetchFoodMenu = (req,res) => {
        const food = foodModel.find({}).then(
            (food) =>{
                res.json([{message: "success"},{"data":food}]);
            }
        ).catch(
            (error) =>{
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: error.message
                })
            }
        )
    
    // try{
    //     await foodModel.find({}).then(
    //         (food) =>{
    //             res.json([{message: "success"},{"data":food}]);
    //         }
    //     ).catch((error) =>{
    //         res.status(404).json({
    //             message:"Data not found"
    //         });
    //     });
    // }catch(error){
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error",
    //         error: error.message
    //     })
    // }
}
