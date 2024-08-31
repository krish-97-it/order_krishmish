const router = require("express").Router();

// list of controllers that will be execute 
const foodMenuController   =   require('./db_controllers/foodmenuController');
const userDataController   =   require('./db_controllers/userdataController');



// List of Food Menu APIs Routes //
router.get('/getFoodMenu',foodMenuController.fetchFoodMenu);


// Customer APIs Routes //
router.post('/addNewUser',userDataController.addUserData);



module.exports = router;