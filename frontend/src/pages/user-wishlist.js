import React from "react";
import WishList from "../components/wishlist";
import GoToTop from "../components/go-to-top";

const WishListPage = ({addToCartFunction, favouriteItems, addToFavourite, showItems, parentClass}) => {
    return(
        <div className="app-body">
            <div className="main-content mb-3" style={{marginTop:"61px"}}>
                <div className="wishlist-banner-section">
                    <div className="container">
                        <picture>
                            <source media="(min-width:650px)" srcSet="https://img.perceptpixel.com/pykhlszs/desktop_image.webp"/>
                            <source media="(max-width:649.98px)" srcSet="https://img.perceptpixel.com/pykhlszs/mobile_image.webp"/>
                            <img src="https://img.perceptpixel.com/pykhlszs/mobile_image.webp" alt="combo banners" style={{width:"100%", height:"auto"}}/>
                        </picture>
                    </div>
                </div>
                <div className="container-fluid mt-3">
                    <h5 className="gradient-bg fav-dish-heading">Favourite Dishes</h5>
                </div>
                <div className="container mt-3">
                    <WishList addToCartFunction={addToCartFunction} favouriteItems={favouriteItems} addToFavourite={addToFavourite} showItems={showItems} parentClass={parentClass}/>
                </div>
                <GoToTop/>
            </div>
        </div>
    )
}

export default WishListPage;