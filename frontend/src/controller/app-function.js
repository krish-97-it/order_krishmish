import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/header";
import Footer from "../components/footer";
import Homepage from "../pages/homepage";
import DrinksnaksPage from "../pages/drinks-snaks";
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

    function loadData(){
        axios.get(apiURL).then((res) => {
            updateFoodList(res.data[1].data);
            updateTempFoodList(res.data[1].data);
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        loadData();
        // getCuisineData();
    }, []);


    // search functionality on input search bar
    const [searchItem, setSearchItem]       =   useState('');
    const [cuisineData, updateCuisineData]  =   useState('cuisines');

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
        let ele_val       = (event.target.value);
        let toLowerCase   = ele_val.toLowerCase();
        if(toLowerCase === 'cuisines'){
            clearInput();
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

    // filtered data from all data by comparing input letters and stored in new array
    const getFilteredItemList   = tempFoodlist.filter((item) =>
        item.tags.toLowerCase().includes(searchItem)
    );

    // filtered data from all data by comparing input letters and stored in new array
    const getTopPicsItemList   = foodlist.filter((item) =>
        item.cuisine.toLowerCase().includes(cuisineData)
    );



    // Add to cart Functionality
    const [cartItem, setCartItem]       =   useState([]);
    
    // function to add Item To Cart
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

    const deleteItemToCart = () => {
    }

    const totalAmountCalculate = () => {

    }


    return (
        <Router>
            <Navbar searchbar="false" />
            <SearchBar searchItem = {searchItem} getSearchInput = {getSearchInput} clearInput = {clearInput} getInputCuisine={ getInputCuisine }/>
            <Routes>
                <Route exact path="/" element={<Homepage/>}/>
                <Route exact path="/cuisine" element={<Cuisine getItemList = {foodlist} getFilteredItemList={ getFilteredItemList } getCuisineName={ cuisineData } getFoodName = {getFoodName} getTopPicsItemList = {cuisineData !== 'cuisines'? getTopPicsItemList : foodlist} addToCartFunction={addItemToCart} addedCartItem = {cartItem}/>} />
                <Route exact path="/special-combos" element={<CombosPage />} />
                <Route exact path="/drinks-and-snacks" element={<DrinksnaksPage/>} />
                <Route exact path="/reviews" element={<ReviewPage addItemToCart = {cartItem} />} />
                <Route exact path="/mycart" element={<ShowCartPage addItemToCart = {cartItem} />} />
                {/* <Route exact path="*" element={<NoPage />} /> */}
            </Routes>
            <Footer/>
        </Router>
      );
}