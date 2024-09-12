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
                    <p style={{margin:"0px", textAlign:"left", padding:"0px 10px 0px 0px", fontSize:"14px"}}>Items are ready to order in your cart!!</p>
                    <Link to="/mycart" type="button" className="btn" style={{minWidth:"112px", backgroundColor:"#8f44fa", backgroundImage:"linear-gradient(to right, #5C72FF, #8C3FFF)", color:"white", fontWeight:"400"}}>Place Order</Link>
                </div>
            </div>
        </div>
    )
}