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

    const [cartItem, setCartItem]       = useState([]);
    const [searchItem, setSearchItem]   = useState('');

    // api call to get food menus from backend db. Api written in backend project
    const [foodlist, updateFoodList]   =   useState([]);
    const apiURL                       =   'http://localhost:4000/getFoodMenu';

    function loadData(){
        axios.get(apiURL).then((res) => {
            updateFoodList(res.data[1].data);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    // function to add Item To Cart
    const addItemToCart = () => {
    }

    const deleteItemToCart = () => {
    }

    const totalAmountCalculate = () => {

    }

    const getSearchInput = (event) => {
        let search_text = event.target.value;
        let toLowerCase = search_text.toLowerCase();
        setSearchItem(toLowerCase);
    }

    const getFilteredItemList   = foodlist.filter((item) =>
        item.name.toLowerCase().includes(searchItem)
    );


    return (
        <Router>
            <Navbar searchbar="false" />
            <SearchBar searchItem = {searchItem} getSearchInput = {getSearchInput} />
            <Routes>
                <Route exact path="/" element={<Homepage/>}/>
                <Route exact path="/cuisine" element={<Cuisine getFilteredItemList={ getFilteredItemList } />} />
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