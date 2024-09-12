import React from "react";
import OrderHistory from "../components/order-history";

const OrderHistoryPage = () => {
    return(
        <div className="app-body">
            <div className="main-content mb-3" style={{marginTop:"61px"}}>
                <div className="container">
                    <OrderHistory/>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryPage;