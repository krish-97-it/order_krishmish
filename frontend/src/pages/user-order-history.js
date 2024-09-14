import React from "react";
import OrderHistory from "../components/order-history";
import sadSvg from '../assets/sad-face-in-rounded-square-svgrepo-com.svg';

const OrderHistoryPage = () => {
    return(
        // <div className="app-body">
        //     <div className="main-content mb-3" style={{marginTop:"61px"}}>
        //         <div className="container">
        //             <OrderHistory/>
        //         </div>
        //     </div>
        // </div>
        <div className="app-body">
            <div className="main-content container">
                <div className="error-page-msg-section">
                    <div className="sad-face-icon" style={{backgroundColor:"white", paddingTop:"10px"}}>
                        <img src={sadSvg} alt="error"/>
                    </div>
                    <OrderHistory/>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryPage;