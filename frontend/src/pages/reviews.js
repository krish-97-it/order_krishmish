import React from "react";

export default function reviewPage({addItemToCart}){
    return(
        <div className="app-body">
            <div className="main-content">
                {
                    addItemToCart.map((item) =>{
                        return(
                            <div>
                                <h5>{item.product.name}</h5>
                                <p>{item.item_quantity}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
