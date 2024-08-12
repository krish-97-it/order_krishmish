import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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

export default function RoutePages(){
    return (
        <Router>
            <Navbar searchbar="false" />
            <Routes>
                <Route exact path="/" element={<Homepage/>}/>
                <Route exact path="/cuisine" element={<Cuisine/>} />
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