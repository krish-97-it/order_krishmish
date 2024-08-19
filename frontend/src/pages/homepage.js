import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import HomeCarousel from "../components/home-carousel";
import Foodcard from "../components/food-card";


export default function homePage({getFoodName, getHomeCuisineName}){
    return(

        <div className="app-body">
            <div className="main-content">
                {<HomeCarousel/>}
                {<Foodcard getFoodName={getFoodName} getHomeCuisineName={getHomeCuisineName} />}
            </div>
        </div>
    )
}
