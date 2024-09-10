const router = require("express").Router();

// list of controllers that will be execute 
const foodMenuController   =   require('./db_controllers/foodmenuController');
const userDataController   =   require('./db_controllers/userdataController');
const emailOtpController     =   require('./db_controllers/emailOtpController') 



// List of Food Menu APIs Routes //
router.get('/getFoodMenu',foodMenuController.fetchFoodMenu);


// Customer APIs Routes //
router.post('/addNewUser',userDataController.addUserData);
router.post('/getUserData', userDataController.getUserData);
router.post('/updateUserData', userDataController.findAndUpdateUser);

router.post('/sendotp', emailOtpController.sendEmailOtp);
router.post('/verifyotp', emailOtpController.verifyEmailOtp);



module.exports = router;