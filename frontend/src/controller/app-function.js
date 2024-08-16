import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/header";
import Footer from "../components/footer";
import Homepage from "../pages/homepage";
import DrinksnaksPage from "../pages/drinks-snaks";
import Cuisine from "../pages/cuisine";
import ItCuisine from "../pages/indian-cuisine";
import InCuisine from "../pages/indian-cuisine";
import ChCuisine from "../pages/chineese-cuisine";
import CombosPage from "../pages/combos";
import ReviewPage from "../pages/reviews";
import MostLovedDish from "../pages/most-loved";
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
        setSearchItem('');
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
    const addItemToCart = () => {
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
                <Route exact path="/cuisine" element={<Cuisine getItemList = {foodlist} getFilteredItemList={ getFilteredItemList } getCuisineName={ cuisineData } getFoodName = {getFoodName} getTopPicsItemList = {cuisineData !== 'cuisines'? getTopPicsItemList : foodlist} />} />
                <Route exact path="/indian-cuisine" element={<InCuisine/>} />
                <Route exact path="/italian-cuisine" element={<ItCuisine />} />
                <Route exact path="/chinese-cuisine" element={<ChCuisine />} />
                <Route exact path="/special-combos" element={<CombosPage />} />
                <Route exact path="/most-loved-dishes" element={<MostLovedDish />} />
                <Route exact path="/drinks-and-snacks" element={<DrinksnaksPage/>} />
                <Route exact path="/reviews" element={<ReviewPage />} />
                {/* <Route exact path="*" element={<NoPage />} /> */}
            </Routes>
            <Footer/>
        </Router>
      );
}