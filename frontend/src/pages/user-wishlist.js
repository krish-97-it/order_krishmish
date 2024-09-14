import React from "react";
import WishList from "../components/wishlist";
import GoToTop from "../components/go-to-top";

const WishListPage = ({addToCartFunction, favouriteItems, addToFavourite, showItems, parentClass, userLoggedIn, openLoginModal}) => {
    return(
        <div className="app-body">
            <div className="main-content mb-3" style={{marginTop:"61px"}}>
                <div className="wishlist-banner-section">
                    <div className="container">
                        <picture>
                            <source media="(min-width:700px)" srcSet="https://img.perceptpixel.com/pykhlszs/desktop_image.webp"/>
                            <source media="(max-width:699.98px)" srcSet="https://img.perceptpixel.com/pykhlszs/mobile_image.webp"/>
                            <img src="https://img.perceptpixel.com/pykhlszs/mobile_image.webp" alt="combo banners" style={{width:"100%", height:"auto"}}/>
                        </picture>
                    </div>
                </div>
                <div className="container-fluid mt-3">
                    <h5 className="gradient-bg fav-dish-heading">Favourite Dishes</h5>
                </div>
                {
                    (userLoggedIn === 'true' && favouriteItems.length > 0)?
                    <div className="container mt-3">
                        <WishList addToCartFunction={addToCartFunction} favouriteItems={favouriteItems} addToFavourite={addToFavourite} showItems={showItems} parentClass={parentClass}/>
                    </div>
                    :
                    <div className="container no-data-found">
                        <h3>It seems like, You have not added any food in your favourites or wishlist. Log in Now and order your favourite dishes</h3>
                        <div className="mt-2">
                            <button to="/" type="button" className="btn btn-primary" onClick={openLoginModal}>Sign In</button>
                        </div>
                    </div>
                }
                <GoToTop/>
            </div>
        </div>
    )
}

export default WishListPage;