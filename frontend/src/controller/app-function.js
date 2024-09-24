import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/header";
import Footer from "../components/footer";
import Homepage from "../pages/homepage";
import Cuisine from "../pages/cuisine";
import CombosPage from "../pages/combos";
import ReviewPage from "../pages/reviews";
import ShowCartPage from "../pages/show-cart";
import SearchBar from "../components/searchbar";
import MyProfile from "../pages/user-profile";
import Costant_Variables from "./constant-variables";
import Errorpage from "../pages/404-page";
import Swal from "sweetalert2";
import WishListPage from "../pages/user-wishlist";
import OrderHistoryPage from "../pages/user-order-history";

export default function AppFunction(){

    let websiteBaseUrl = window.location.origin;

    // api call to get food menus from backend db. Api written in backend project
    const [foodlist, updateFoodList]                =   useState([]);
    const [tempFoodlist, updateTempFoodList]        =   useState([]);
    const [userLoggedIn, setUserLoggedIn]           =   useState('false');
    const [showLoginModal, updateShowLoginModal]    =   useState('hide');
    const [loadUserData, setUserData]               =   useState([]);
    const [loginErrMssg, setLoginErrMssg]           =   useState('');
    const [userEmailId, updateuserEmailId]          =   useState('');

    const APIUrls                                   =   {
        "fetchFoodMenuAPIUrl" : Costant_Variables.SERVER_BASE_URL+'/getFoodMenu',
        "fetchUserDataAPIUrl" : Costant_Variables.SERVER_BASE_URL+'/getUserData',
        "saveFavItemsAPIUrl"  : Costant_Variables.SERVER_BASE_URL+'/savewishlist',
        "fetchFavItemsAPIUrl" : Costant_Variables.SERVER_BASE_URL+'/getwishlist',
        "fetchCartItemApiUrl" : Costant_Variables.SERVER_BASE_URL+'/getcartitems',
        "saveCartItemApiUrl"  : Costant_Variables.SERVER_BASE_URL+'/savecartitems',
        "fetchOrderHistory"   : Costant_Variables.SERVER_BASE_URL+'/orderhistory',
        "saveRatedItemApiUrl" : Costant_Variables.SERVER_BASE_URL+'/updateratings',
        "getRatedItemsUrl"    : Costant_Variables.SERVER_BASE_URL+'/getrateditems',
    };

    function loadCuisineData(){
        axios.get(APIUrls.fetchFoodMenuAPIUrl).then((res) => {
            updateFoodList(res.data[1].data);
            updateTempFoodList(res.data[1].data);
        }).catch((error) => {
            console.log(error)
        });
    }


    function checkUserLogedIn(){
        // store cartItems to local storage, so that on page load Ites in cart are not deleted
        let userId  =   localStorage.getItem("krishmish@regUserId");
        // let userId  =   JSON.parse(retCartDataStringFromLocalStorage);
        if(userId){
            let emailid   =   userId.split("mish@");
            updateuserEmailId(emailid[1]);
            loadUserDataFunction(emailid[1]);
        }else{
            updateShowLoginModal("show");
        }
    }

    useEffect(() => {
        loadCuisineData();
        checkUserLogedIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Ligin Form Modal slide switch functionality
    const [displayFirstSlide, setDisplayFirstSlide]     = useState('show');
    const [displaySecondSlide, setDisplaySecondSlide]   = useState('hide');
    function formNextSlide(){
        setDisplayFirstSlide('hide');
        setDisplaySecondSlide('show');
    }

    function formPrevSlide(){
        setDisplayFirstSlide('show');
        setDisplaySecondSlide('hide');
    }


    // close login Modal
    function closeLoginModal(){
        updateShowLoginModal("hide");
        
    }
    // Open Login Modal
    function openLoginModal(){
        if(window.outerWidth < 768){
            document.querySelector("button.navbar-toggler").click();
        }
        updateShowLoginModal('show');
        setDisplayFirstSlide('show');
        setDisplaySecondSlide('hide');
    }

    // signout user on click signout button
    function signOutUser(){
        Swal.fire({
            title: 'Are You Sure',
            text: "Click 'Confirm' to Sign Out",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                localStorage.setItem("krishmish@regUserId", "");
                localStorage.setItem("favouriteItems", JSON.stringify([]));
                localStorage.setItem("ratedItems", JSON.stringify([]));
                localStorage.setItem("cartData", JSON.stringify([]));
                window.location.href = websiteBaseUrl;
                // window.location.reload();
            } else{
                Swal.close();
            }
        })
    }

    // This function helps to get a userdata with phone number and set userLoggedIn and updateShowLoginModal data
    function loadUserDataFunction(email_id){
        const formData  =   {
            email : email_id
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }
        axios.post(APIUrls.fetchUserDataAPIUrl, formData, {config})
        .then(
            (response) => {
                if(response.data.message === 'success'){
                    const resData = response.data.data;
                    if(resData.length > 0){
                        setLoginErrMssg("Welcome Back!!");
                        setUserData(resData[0]);
                        setUserLoggedIn('true');
                        updateShowLoginModal('hide');
                        fetchFavouriteItemsFromDb(resData[0]._id);
                        fetchCartDataFromDb(resData[0]._id);
                        fetchOrderHistoryFromDb(resData[0]._id);
                        getRatedItemsFromDb(resData[0]._id);
                        localStorage.setItem("krishmish@regUserId", "krishmish@"+resData[0].email);
                    }else{
                        setTimeout(function(){
                            updateShowLoginModal("show");
                        },1500)
                        setUserLoggedIn('false');
                        // setLoginErrMssg("User Not Found! Please try to login with a registered email id");
                        updateuserEmailId(email_id);
                    }
                }else{
                    updateShowLoginModal("show");
                }
            }
        ).catch(error => {
            console.log(error);
        });
    }

    // search functionality on input search bar
    const [searchItem, setSearchItem]           =   useState('');
    const [cuisineData, updateCuisineData]      =   useState('cuisines');
    const [sortByFilter, updateSortByFilter]    =   useState('default')

    const getSearchInput = (event) => {
        let search_text = event.target.value;
        let toLowerCase = search_text.toLowerCase();
        setSearchItem(toLowerCase);


        // in case someone search any food but parallely a cuisine is selected then it will first filter data depend on cuisine. then search the item on that particular cuisine.
        if(cuisineData !== 'cuisines'){
            const abc = foodlist.filter((item) =>
                item.cuisine.toLowerCase().includes(cuisineData)
            );
            updateTempFoodList(abc);
        }
        if(search_text !== ''){
            document.getElementById("showAllProducts").scrollIntoView({ behavior: "smooth" });
        }
    }
    // clear search field
    const clearInput = (event) => {
        if(cuisineData === 'cuisines'){
            setSearchItem('');
        }else{
            const tem_data = foodlist.filter((item) =>
                item.cuisine.toLowerCase().includes(cuisineData)
            );
            updateTempFoodList(tem_data);
            setSearchItem('');
        }
        
    }

    // update filtered data on depend on input cuisine
    const getInputCuisine = (event) => {
        let ele_val       = ((event.target.value));

        if(ele_val === "All Cuisines"){
            ele_val           = ele_val.split(" ");
            ele_val           = ele_val[1];
        }

        let toLowerCase   = ele_val.toLowerCase();
        if(toLowerCase === 'cuisines'){
            setSearchItem('');
            updateCuisineData(toLowerCase)
            updateTempFoodList(foodlist);
            // clearInput();
        }else{
            updateCuisineData(toLowerCase);
            updateTempFoodList(foodlist);
            setSearchItem(toLowerCase);
        }
    }

    // search a particular food on click from top pics section
    const getFoodName = (event) =>{
        let ele_val= event.currentTarget.value;
        setSearchItem(ele_val.toLowerCase());
        document.getElementById("showAllProducts").scrollIntoView({ behavior: "smooth" });
    }   

    //search foods of a particular category once click on food category filter - main course, starter, snacks...
    const getFoodNameByCategory = (event) =>{
        let ele_val= event.currentTarget.value;
        setSearchItem(ele_val.toLowerCase());
        // in case someone search any food but parallely a cuisine is selected then it will first filter data depend on cuisine. then search the item on that particular cuisine.
        if(cuisineData !== 'cuisines'){
            const abc = foodlist.filter((item) =>
                item.cuisine.toLowerCase().includes(cuisineData)
            );
            updateTempFoodList(abc);
        }
    }

    // search a food,cuisine etc under current cuisine
    const getHomeCuisineName = (cuisine) =>{
        let search_item = cuisine.toLowerCase();
        setSearchItem(search_item);
        if(cuisineData !== 'cuisines'){
            const abc = foodlist.filter((item) =>
                item.cuisine.toLowerCase().includes(cuisineData)
            );
            updateTempFoodList(abc);
        }
    }

    // help to get sort by filter input data
    function getSortFilterInput(event){
        let ele_val      = event.target.value;
        updateSortByFilter(ele_val);
    }

    // This function helps to sort data depends on sort by filter input data
    function getSortFilter(tempData){
        let temp_array = [];
        if(sortByFilter === 'cost-low-to-high'){
            temp_array = tempData.sort(function(a, b){return a.price-b.price});
            return(temp_array);
        }else if(sortByFilter === 'cost-high-to-low'){
            temp_array = tempData.sort(function(a, b){return b.price-a.price});
            return (temp_array);
        }else if(sortByFilter === 'rating'){
            temp_array = tempData.sort(function(a, b){return b.rating-a.rating});
            return(temp_array);
        }else if(sortByFilter === 'delivery-time'){

            temp_array = tempData.sort(function(a, b){return splitar(a.preptime)-splitar(b.preptime)});
            return (temp_array);
        }else{
            return(tempData);
        }
    }

    // return the first part of a string by split with "-"
    function splitar(val){
        const a = val.split("-");
        return (parseInt(a[0]));
    }

    // filtered data from all data by comparing input letters and stored in new array
    let getFilteredItemList   = tempFoodlist.filter((item) =>
        item.tags.toLowerCase().includes(searchItem)
    );

    // check if any input of sort by is added or not, then rearrange the filtered data as per condition else store the filtered data only
    getFilteredItemList = sortByFilter !== 'default' ? getSortFilter(getFilteredItemList) : getFilteredItemList;

    // filtered toppics data on depend on selected cuisine in dropdown and stored in new array
    const getTopPicsItemList   = foodlist.filter((item) =>
        item.cuisine.toLowerCase().includes(cuisineData)
    );

    // Data Filtered for combo page to fetch combo data only
    const comboItemList     =   foodlist.filter((item) =>
        item.tags.toLowerCase().includes('combos')
    )

    // Combo Items sort randomly For Home Page
    const tempComboItemList  = [...comboItemList];
    let randomComboItemList  = tempComboItemList.sort(function (a, b) {
        return Math.random() - 0.5;
    })
    // function randomSort(arr) {
    //     console.log(arr)
    //     return arr.map((val) => ({ val, sort: Math.random() }))
    //     .sort((a, b) => a.sort - b.sort)
    //     .map(({ val }) => val);
    // }
    // let randomComboItemList   = randomSort(comboItemList);
    

    // Add to cart Functionality
    const [cartItem, setCartItem]               =   useState(fetchCartItemDataFromLocalStorage());

    // This function fetch cartItem data from localstorage.
    function fetchCartItemDataFromLocalStorage(){
        let retCartDataStringFromLocalStorage   = localStorage.getItem("cartData");
        let retCartDataFromLocalStorage         = JSON.parse(retCartDataStringFromLocalStorage);

        if(retCartDataFromLocalStorage === null){
            return [];
        }else{
            return retCartDataFromLocalStorage;
        }
    }

    // Fetch Cart Data From Db
    // Usage - once a user logged in this function will be called with user id to update cartItem with db and local data by combing these two
    function fetchCartDataFromDb(user_id){
        const formData  =   {
            userid   : user_id,
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }
        axios.post(APIUrls.fetchCartItemApiUrl, formData, {config})         // Api is called to fetch data from db
        .then(
            (response) => {
                if(response.data.success === true){             // If response status is success
                    const resData = response.data.data;         // Now response data consists of data of cart of the given user_id - id, user_id, cart_items etc
                    const cart_items = resData[0].cart_items    // we require only cart_items
                    if(cart_items.length > 0){                  // if cart_items is not empty , else empty cart
                        if(cartItem.length > 0){                // if cartItem - local data is not empty, then proceed to compare and merge local data and db data
                            // let mergedArray = cartItem.map(item => item);
                            let mergedArray = [...cart_items];    // store db data in a new array first
                            for(let i = 0; i<cartItem.length; i++){     // loop all local data
                                const findProduct = mergedArray.find(item => item.product._id === cartItem[i].product._id);  // compare id of items from db and local data return undefined if not match
                                if(!findProduct){
                                    mergedArray.push(cartItem[i]); // add local item from local data that is not present in db
                                }else{
                                    console.log("Element already present");
                                }
                            }

                            // update cartItem with merged data
                            setCartItem(mergedArray);

                        }else{
                            // no local cartItem so, set db data on cartItem
                            setCartItem(cart_items);
                        }
                    }else{
                        // console.log("got empty cart from db")
                    }
                }else{
                    // console.log("failed to fetch db data from db");
                }
                // trigger function to update cart items in db
                setTimeout(function(){
                    saveCartItemsToDb(user_id);
                }, 3000)
            }
        ).catch(error => {
            console.log(error)
        });
    }

    const addItemToCart = (Itemdata) => {
        const findProduct = cartItem.find(item => item.product._id === Itemdata._id);
        if (findProduct) {
            const latestCartUpdate = cartItem.map(item =>
                item.product._id === Itemdata._id ? { 
                ...item, item_quantity: item.item_quantity + 1 } 
                : item
            );
            setCartItem(latestCartUpdate);
        } else {
            setCartItem([...cartItem, {product: Itemdata, item_quantity: 1}]);
        }

        if(userLoggedIn === 'true'){
            setTimeout(function(){
                saveCartItemsToDb(loadUserData._id);
            }, 3000)
        }
    }

    // delete a item from cart
    const deleteItemToCart = (Itemdata) => {
        const updated_list = cartItem.filter(item => item.product._id !== Itemdata.product._id)
        setCartItem(updated_list);

        if(userLoggedIn === 'true'){
            setTimeout(function(){
                saveCartItemsToDb(loadUserData._id);
            }, 3000)
        }
    }

    // Evaluate Total Cost and helps to generate bill
    const totalCartCost  = () =>{
        let total_cost = 0;
        for(let i=0; i<cartItem.length; i++){
            total_cost  = total_cost + ((cartItem[i].item_quantity)*(cartItem[i].product.price));
        }
        return total_cost;
    }

    const getTotalDiscountCost = (discount_amt) =>{
        let total_cost = 0;
        for(let i=0; i<cartItem.length; i++){
            total_cost  = total_cost + ((cartItem[i].item_quantity)*(cartItem[i].product.price));
        }

        // after evaluate total price of items apply complementary 10% Off
        const total = total_cost === 0 ? 0 : (total_cost - ((total_cost*10)/100));

        // Check any offer/discount percentage is present or not. apply it and then return
        if(discount_amt !== ''){
            const t_cost = total - ((total*parseInt(discount_amt))/100);
            return t_cost
        }

        return total;
    }

    // increase / decrease item from cart
    const increaseItemQuantity = (item) => {
        const updatedCart = cartItem.map((data) =>
            data.product._id === item.product._id ? 
            { 
                ...data, item_quantity: item.item_quantity + 1 
            } : 
            data
        );
        setCartItem(updatedCart);

        if(userLoggedIn === 'true'){
            setTimeout(function(){
                saveCartItemsToDb(loadUserData._id);
            }, 3000)
        }
    }
    const decreaseItemQuantity = (item) => {
        const updatedCart = cartItem.map((data) =>
            ((data.product._id === item.product._id) && (item.item_quantity > 1)) ? 
            { 
                ...data, item_quantity: item.item_quantity - 1 
            } : 
            data
        );
        setCartItem(updatedCart);

        if(userLoggedIn === 'true'){
            setTimeout(function(){
                saveCartItemsToDb(loadUserData._id);
            }, 3000)
        }
    }

    function saveCartItemsToDb(user_id){
        const cartItemsFromLocalStorage  =  fetchCartItemDataFromLocalStorage();

        const formData  =   {
            userid      : user_id,
            cartitems   : cartItemsFromLocalStorage
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }
        axios.post(APIUrls.saveCartItemApiUrl, formData, {config})
        .then(
            (response) => {
                if(response.data.success === true){
                    const resData = response.data.data;
                    if(resData.length > 0){
                        console.log("cart updated successfully");
                    }else{
                        console.log("cart is empty");
                    }
                }else{
                    console.log("Faied to save cart items")
                }
            }
        ).catch(error => {
            console.log(error);
        });
    }

    // store cartItems to local storage, so that on page load Ites in cart are not deleted
    let convertCartDataToStringData = JSON.stringify(cartItem);
    localStorage.setItem("cartData", convertCartDataToStringData);


    // Fav Item List / Wish list Functionality
    const [favouriteItems, setFavouriteItems]   =   useState(fetchFavouriteItemsFromLocalStorage());
    
    function fetchFavouriteItemsFromLocalStorage(){
        let favItemStringFromLocalStorage   = localStorage.getItem("favouriteItems");
        let favItemsFromLocalStorage        = JSON.parse(favItemStringFromLocalStorage);

        if(favItemsFromLocalStorage === null){
            return [];
        }else{
            return favItemsFromLocalStorage;
        }
    }

    function fetchFavouriteItemsFromDb(user_id){
        const formData  =   {
            userid   : user_id,
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }
        axios.post(APIUrls.fetchFavItemsAPIUrl, formData, {config})
        .then(
            (response) => {
                if(response.data.success === true){
                    const resData = response.data.data;
                    if(resData.length > 0){
                        const convertFavItemsToStringData = JSON.stringify(resData[0].fav_items);
                        localStorage.setItem("favouriteItems", convertFavItemsToStringData);
                        setFavouriteItems(resData[0].fav_items);
                    }else{
                        console.log("No Items found in wishlist");
                    }
                }else{
                    console.log("Faied to fetch wishlist")
                }
            }
        ).catch(error => {
            console.log(error)
        });
    }

    const addToFavourite = (Itemdata) =>{
        if(userLoggedIn === 'true'){
            updateShowLoginModal("hide");
            const findProduct = favouriteItems.find(item => item.product._id === Itemdata._id);
            if (!findProduct){
                setFavouriteItems([...favouriteItems, {product: Itemdata}]);
            } else {
                const updated_list = favouriteItems.filter(item => item.product._id !== Itemdata._id)
                setFavouriteItems(updated_list);
            }
        }else{
            updateShowLoginModal('show');
        }

        setTimeout((saveToDbFavList),2000)
    }

    function saveToDbFavList(){
        const favItemsFromLocalStorage  =  fetchFavouriteItemsFromLocalStorage();
        const formData  =   {
            userid   : loadUserData._id,
            favitems : favItemsFromLocalStorage
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }
        axios.post(APIUrls.saveFavItemsAPIUrl, formData, {config})
        .then(
            (response) => {
                if(response.data.success === true){
                    const resData = response.data.data;
                    if(resData.length > 0){
                        console.log("wishlist updated successfully");
                    }else{
                        console.log("No Items added to wishlist");
                    }
                }else{
                    console.log("Faied to save favourite items")
                }
            }
        ).catch(error => {
            console.log(error);
        });
    }

    let convertFavItemsToStringData = JSON.stringify(favouriteItems);
    localStorage.setItem("favouriteItems", convertFavItemsToStringData);

    // This function fetch cartItem data from localstorage.
    const [orderAddress, setOrderAddress]   =   useState(fetchDeliveryAddressFromLocalStorage());
    function fetchDeliveryAddressFromLocalStorage(){
        let retaddressStringFromLocalStorage   = localStorage.getItem("delivery_address");
        let retaddressFromLocalStorage         = JSON.parse(retaddressStringFromLocalStorage);

        if(retaddressFromLocalStorage === null){
            return {state:'', city:'', district:'', pinCode:''};
        }else{
            return retaddressFromLocalStorage;
        }
    }

    function loadDeliveryAddress(){
        setOrderAddress(fetchDeliveryAddressFromLocalStorage());
    }

    //Fetch Order History
    const [orderHistoryData, setOrderHistoryData] = useState([]);
    function fetchOrderHistoryFromDb(id){
        const formData  =   {
            userid   : id,
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }
        axios.post(APIUrls.fetchOrderHistory, formData, {config})
        .then(
            (response) => {
                if(response.data.success === true){
                    const resData = response.data.data;
                    const dataLen = resData.length;
                    if(dataLen > 0){
                        setOrderHistoryData(resData.reverse());
                    }else{
                        console.log("No Items found in Order History");
                    }
                }else{
                    console.log("Faied to fetch order history")
                }
            }
        ).catch(error => {
            console.log(error)
        });
    }


        // Rate Items
        const [ratedItems, updateRatedItems]   =   useState(getRatedItemsFromLocalStorage());
    
        function getRatedItemsFromLocalStorage(){
            let ratingStringFromLocalStorage   = localStorage.getItem("ratedItems");
            let ratedItemsFromLocalStorage     = JSON.parse(ratingStringFromLocalStorage);
    
            if(ratedItemsFromLocalStorage === null){
                return [];
            }else{
                return ratedItemsFromLocalStorage;
            }
        }
    
        function getRatedItemsFromDb(user_id){
            const formData  =   {
                userid   : user_id,
            }
            const config = {
                headers: { 'Content-Type': 'application/json'}
            }
            axios.post(APIUrls.getRatedItemsUrl, formData, {config})
            .then(
                (response) => {
                    if(response.data.success === true){
                        const resData = response.data.data;
                        if(resData.length > 0){
                            const convertItemsToStringData = JSON.stringify(resData[0].rated_items);
                            localStorage.setItem("ratedItems", convertItemsToStringData);
                            updateRatedItems(resData[0].rated_items);
                        }else{
                            console.log("No Items rated yet");
                        }
                    }else{
                        console.log("Faied to fetch item lists")
                    }
                }
            ).catch(error => {
                console.log(error);
            });
        }
    
        const addRating = (Itemid, item_rating) =>{
            const findProduct = ratedItems.find(item => item.p_id === Itemid);
            if (!findProduct){
                updateRatedItems([...ratedItems, {p_id:Itemid, rating:item_rating}]);
            }else{
                const tempData = ratedItems.map(item =>
                    item.p_id === Itemid ? { 
                    ...item, rating: item_rating } 
                    : item
                );
                updateRatedItems(tempData);

            }
    
            setTimeout((saveItemRatings),2000)
        }
    
        function saveItemRatings(){
            const ratedItemsFromLocal  =  getRatedItemsFromLocalStorage();
            const formData  =   {
                userid     : loadUserData._id,
                ratedItems : ratedItemsFromLocal
            }
            const config = {
                headers: { 'Content-Type': 'application/json'}
            }
            axios.post(APIUrls.saveRatedItemApiUrl, formData, {config})
            .then(
                (response) => {
                    if(response.data.success === true){
                        const resData = response.data.data;
                        if(resData.length > 0){
                            console.log("Item List updated successfully");
                        }else{
                            console.log("No Items added to List");
                        }
                    }else{
                        console.log("Faied to save item rating")
                    }
                }
            ).catch(error => {
                console.log(error);
            });
        }
    
        let convertRatedItemsToStringData = JSON.stringify(ratedItems);
        localStorage.setItem("ratedItems", convertRatedItemsToStringData);

    return (
        <Router>
            <Navbar searchbar="false" totalCartItem={cartItem.length} showLoginModal={showLoginModal} closeLoginModal={closeLoginModal} openLoginModal={openLoginModal} isUserLoggedIn={userLoggedIn} formNextSlide={formNextSlide} formPrevSlide={formPrevSlide} displayFirstSlide={displayFirstSlide} displaySecondSlide={displaySecondSlide} loadUserDataFunction={loadUserDataFunction} loadUserData={loadUserData} signOutUser={signOutUser} loginErrMssg={loginErrMssg} userEmailId={userEmailId}/>
            <SearchBar searchItem = {searchItem} getSearchInput = {getSearchInput} clearInput = {clearInput} getInputCuisine={ getInputCuisine } getFilteredItemList={getFilteredItemList}/>
            <Routes>
                <Route exact path="/" element={<Homepage getHomeCuisineName={getHomeCuisineName} randomComboItemList={randomComboItemList}/>}/>
                <Route exact path="/cuisine" element={<Cuisine getItemList = {foodlist} getFilteredItemList={ getFilteredItemList } getInputCuisine={ getInputCuisine } getCuisineName={ cuisineData } getFoodName = {getFoodName} getFoodNameByCategory={getFoodNameByCategory} getSortFilterInput={getSortFilterInput} getTopPicsItemList = {cuisineData !== 'cuisines'? getTopPicsItemList : foodlist} addToCartFunction={addItemToCart} addedCartItem = {cartItem} totalCartItem={cartItem.length} addToFavourite={addToFavourite} favouriteItems={favouriteItems}/>} />
                <Route exact path="/special-combos" element={<CombosPage comboItemList={comboItemList} getHomeCuisineName={getHomeCuisineName} addToCartFunction={addItemToCart} addedCartItem = {cartItem} totalCartItem={cartItem.length}/>} />
                <Route exact path="/reviews" element={<ReviewPage getItemList = {foodlist}/>} />
                <Route exact path="/mycart" element={<ShowCartPage addedCartItem = {cartItem} deleteCartItem={deleteItemToCart} totalCartCost={totalCartCost} getTotalDiscountCost={getTotalDiscountCost} increaseItemQuantity={increaseItemQuantity} decreaseItemQuantity={decreaseItemQuantity} loadUserData = {loadUserData} openLoginModal={openLoginModal} userLoggedIn={userLoggedIn} loadDeliveryAddress={loadDeliveryAddress} orderAddress={orderAddress} />} />
                <Route exact path="/myprofile" element={<MyProfile loadUserDataFunction={loadUserDataFunction} loadUserData = {loadUserData} addToFavourite={addToFavourite} favouriteItems={favouriteItems} addToCartFunction={addItemToCart} addedCartItem = {cartItem} orderHistoryData={orderHistoryData}/>} />
                <Route exact path="/myprofile/wishlist" element={<WishListPage addToCartFunction={addItemToCart} favouriteItems={favouriteItems} addToFavourite={addToFavourite} showItems={favouriteItems.length} parentClass={"wishlist-page-section"} openLoginModal={openLoginModal} userLoggedIn={userLoggedIn}/>} />
                <Route exact path="/myprofile/order-history" element={<OrderHistoryPage orderHistoryData={orderHistoryData} userLoggedIn={userLoggedIn} addToCartFunction={addItemToCart} ratedItems={ratedItems} addRating={addRating} />}/>
                <Route exact path="*" element={<Errorpage />} />
            </Routes>
            <Footer/>
        </Router>
      );
}