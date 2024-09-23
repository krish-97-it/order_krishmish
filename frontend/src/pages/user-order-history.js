import React from "react";
import OrderHistory from "../components/order-history";
import GoToTop from "../components/go-to-top";

const OrderHistoryPage = ({orderHistoryData, userLoggedIn, addToCartFunction, ratedItems, addRating}) => {
    return(
        <div className="app-body">
            <div className="main-content mb-3" style={{marginTop:"61px"}}>
                <div className="banner-background-image">
                    <div className="container">
                        <picture>
                            <source media="(min-width:768px)" srcSet="https://img.perceptpixel.com/pykhlszs/order_history_image.webp"/>
                            <source media="(max-width:767.98px)" srcSet="https://img.perceptpixel.com/pykhlszs/order_history_image_mob.webp"/>
                            <img src="https://img.perceptpixel.com/pykhlszs/order_history_image_mob.webp" alt="order history" className="order-history-banner" style={{width:"100%", height:"auto"}}/>
                        </picture>
                    </div>
                </div>
                <h3 className="gradient-bg no-border-radius">Order History</h3>
                <div className="container">
                    <OrderHistory orderHistoryData={orderHistoryData} userLoggedIn={userLoggedIn} addToCartFunction={addToCartFunction} ratedItems={ratedItems} addRating={addRating} />
                </div>
            </div>
            <GoToTop/>
        </div>
    )
}

export default OrderHistoryPage;