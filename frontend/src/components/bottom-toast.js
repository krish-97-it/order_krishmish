import React from "react";
import { Link } from "react-router-dom";

export default function BottomToast(){
    return(
        <div className="container checkout-cart-container">
            <div className="toast show checkout-cart-toast">
                <div className="toast-header-section">
                    {/* <strong className="me-auto">Toast Header</strong> */}
                    <button type="button" className="toast-close-btn" data-bs-dismiss="toast">X</button>
                </div>
                <div className="toast-body-section">
                    <p style={{margin:"0px", textAlign:"left", padding:"0px 10px 0px 0px"}}>Items are ready to order in your cart!!</p>
                    <Link to="/mycart" type="button" className="btn btn-warning" style={{minWidth:"112px"}}>Place Order</Link>
                </div>
            </div>
        </div>
    )
}