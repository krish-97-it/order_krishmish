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

export default function AppFunction(){

    // api call to get food menus from backend db. Api written in backend project
    const [foodlist, updateFoodList]    =   useState([]);
    const [tempFoodlist, updateTempFoodList]    =   useState([]);
    const apiURL                        =   'http://localhost:4000/getFoodMenu';

    function loadCuisineData(){
        axios.get(apiURL).then((res) => {
            updateFoodList(res.data[1].data);
            updateTempFoodList(res.data[1].data);
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        loadCuisineData();
    }, []);


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

    // update filtered data on depend on cuisine
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

    const getFoodName = (event) =>{
        let ele_val= event.currentTarget.value;
        setSearchItem(ele_val.toLowerCase());
    }   

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

    function getSortFilterInput(event){
        let ele_val      = event.target.value;
        updateSortByFilter(ele_val);
    }

    // This function helps to sort data on deferent condition
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
    let randomComboItemList  = comboItemList.sort(function (a, b) {
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
    const [cartItem, setCartItem]       =   useState([]);
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
    }

    // delete a item from cart
    const deleteItemToCart = (Itemdata) => {
        const updated_list = cartItem.filter(item => item.product._id !== Itemdata.product._id)
        setCartItem(updated_list);
    }

    // Evaluate Total Cost and helps to generate bill
    const getTotalCost  = () =>{
        let total_cost = 0;
        for(let i=0; i<cartItem.length; i++){
            total_cost  = total_cost + ((cartItem[i].item_quantity)*(cartItem[i].product.price));
        }
        return total_cost;
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
    }


    return (
        <Router>
            <Navbar searchbar="false" totalCartItem={cartItem.length} />
            <SearchBar searchItem = {searchItem} getSearchInput = {getSearchInput} clearInput = {clearInput} getInputCuisine={ getInputCuisine }/>
            <Routes>
                <Route exact path="/" element={<Homepage getHomeCuisineName={getHomeCuisineName} randomComboItemList={randomComboItemList}/>}/>
                <Route exact path="/cuisine" element={<Cuisine getItemList = {foodlist} getFilteredItemList={ getFilteredItemList } getInputCuisine={ getInputCuisine } getCuisineName={ cuisineData } getFoodName = {getFoodName} getFoodNameByCategory={getFoodNameByCategory} getSortFilterInput={getSortFilterInput} getTopPicsItemList = {cuisineData !== 'cuisines'? getTopPicsItemList : foodlist} addToCartFunction={addItemToCart} addedCartItem = {cartItem} totalCartItem={cartItem.length}/>} />
                <Route exact path="/special-combos" element={<CombosPage comboItemList={comboItemList} getHomeCuisineName={getHomeCuisineName} addToCartFunction={addItemToCart} addedCartItem = {cartItem} totalCartItem={cartItem.length}/>} />
                <Route exact path="/reviews" element={<ReviewPage getItemList = {foodlist}/>} />
                <Route exact path="/mycart" element={<ShowCartPage addedCartItem = {cartItem} deleteCartItem={deleteItemToCart} getTotalCost={getTotalCost} increaseItemQuantity={increaseItemQuantity} decreaseItemQuantity={decreaseItemQuantity} />} />
                {/* <Route exact path="*" element={<NoPage />} /> */}
            </Routes>
            <Footer/>
        </Router>
      );
}