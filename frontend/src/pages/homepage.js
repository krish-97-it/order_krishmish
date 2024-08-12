import React from "react";

import HomeCarousel from "../components/home-carousel";
import Foodcard from "../components/food-card";


export default function homePage(){
    return(
        <div className="app-body">
            <div className="main-content">
                {<HomeCarousel/>}
                {<Foodcard/>}
            </div>
        </div>
    )
}
