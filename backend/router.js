const router = require("express").Router();

// list of controllers that will be execute 
const foodMenuController   =   require('./db_controllers/foodmenuController');
const userDataController   =   require('./db_controllers/userdataController');
const emailOtpController   =   require('./db_controllers/emailOtpController');
const wishlistController   =   require('./db_controllers/wishlistController');
const userCartController   =   require('./db_controllers/userCartController');
const userOrderController  =   require('./db_controllers/orderDetailsController');
const itemRatingController =   require('./db_controllers/itemRatingController');



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

//Cart Data save and fetch apis
router.post('/getcartitems', userCartController.getCartData);
router.post('/savecartitems', userCartController.updateCartData);

//Place User Order
router.post('/saveorderdetails', userOrderController.orderPlaced);
router.post('/orderhistory', userOrderController.getOrderHistory);

//Place User Order
router.post('/updateratings', itemRatingController.updateRatedItems);
router.post('/getrateditems', itemRatingController.getRatedItems);

module.exports = router;