const router = require("express").Router();

// list of controllers that will be execute 
const foodMenuController   =   require('./db_controllers/foodmenuController');
const userDataController   =   require('./db_controllers/userdataController');
const emailOtpController   =   require('./db_controllers/emailOtpController');
const wishlistController   =   require('./db_controllers/wishlistController');



// List of Food Menu APIs Routes //
router.get('/getFoodMenu',foodMenuController.fetchFoodMenu);


// Customer APIs Routes //
router.post('/addNewUser',userDataController.addUserData);
router.post('/getUserData', userDataController.getUserData);
router.post('/updateUserData', userDataController.findAndUpdateUser);

// Email Otp Send/Verify API //
router.post('/sendotp', emailOtpController.sendEmailOtp);
router.post('/verifyotp', emailOtpController.verifyEmailOtp);

//Wishlist save and fetch apis
router.post('/getwishlist', wishlistController.getWishList);
router.post('/savewishlist', wishlistController.updateWishList);


module.exports = router;