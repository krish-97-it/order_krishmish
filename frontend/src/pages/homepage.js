import React from "react";

import HomeCarousel from "../components/home-carousel";
import Foodcard from "../components/food-card";
import GoToTop from "../components/go-to-top";


export default function homePage({getHomeCuisineName, randomComboItemList}){
    return(

        <div className="app-body">
            <div className="main-content" style={{marginTop:"118px"}}>
                {<HomeCarousel/>}
                {<Foodcard getHomeCuisineName={getHomeCuisineName} randomComboItemList={randomComboItemList} />}
                <GoToTop/>
            </div>
        </div>
    )
}
