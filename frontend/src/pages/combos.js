import React from "react";
import ComboItemCarousel from "../components/combo-page-carousel";
import OffersInfo from "../components/offers-info";
import BottomToast from "../components/bottom-toast";
import GoToTop from "../components/go-to-top";

export default function CombosPage({comboItemList, getHomeCuisineName, addToCartFunction, addedCartItem, totalCartItem}){
      
    return(
        <div className="app-body">
            <div className="main-content">
                <div className="combo-banner-section">
                    <div className="container">
                        <picture>
                            <source media="(min-width:768px)" srcSet="https://img.perceptpixel.com/pykhlszs/combo-banner.webp"/>
                            <source media="(max-width:767.98px)" srcSet="https://img.perceptpixel.com/pykhlszs/combo-mob-banner.webp"/>
                            <img src="https://img.perceptpixel.com/pykhlszs/combo-mob-banner.webp" alt="combo banners" style={{width:"100%", height:"auto"}}/>
                        </picture>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="combos-item-section">
                        <div className="food-card-container mt-5">
                            <h3 className="gradient-bg">Special Combos</h3>
                            <ComboItemCarousel comboItemList={comboItemList} getHomeCuisineName={getHomeCuisineName} addToCartFunction={addToCartFunction} addedCartItem = {addedCartItem}/>
                        </div>
                    </div>
                </div>

                <div className="offers-info-section">
                    <div className="container-fluid food-card-container mt-5">
                        <h3 className="gradient-bg">Exclusive Offers</h3>
                    </div>
                    <div className="container">
                        <OffersInfo getHomeCuisineName={getHomeCuisineName}/>
                    </div>
                </div>

                {
                    (totalCartItem > 0)?
                    <BottomToast/>
                    :
                    <></>
                }
                <GoToTop/>
            </div>
        </div>
    )
}