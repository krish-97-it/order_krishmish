import React, {useState, useEffect} from "react";

export default function ShowCartPage({addItemToCart}){
    const [totalCost, updateTotalCost] = useState(0);

    const getTotalCost = () =>{
        let total_cost = 0;
        for(let i=0; i<addItemToCart.length; i++){
            total_cost = total_cost + ((addItemToCart[i].item_quantity)*(addItemToCart[i].product.price));
            updateTotalCost(total_cost)
        }
    }
    useEffect(() => {
        getTotalCost();
    }, []);
    
    return(
        <div className="app-body custom-margin-top">
            <div className="main-content container">
                <div className="cart-item-section">
                    <h3 className="added-item-txt">Added Item</h3>
                    {
                        addItemToCart.map((item) =>{
                            return(
                                <div className="added-cart-item">
                                    <div className="added-item-img">
                                        <img src={item.product.image.img_one} alt="item image"/>
                                    </div>
                                    <div className="item-body-description">
                                        <h5>{item.product.name}</h5>
                                        <div className="cart-item-btn-section">
                                            <div>
                                                <p>Qty: {item.item_quantity}</p>
                                                <p className="price-section">Price: {(item.item_quantity)+" x "+(item.product.price)}</p>
                                            </div>
                                            <button className="remove-from-cart-btn">Remove Item</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="billing-details-secton">
                    <div className="total-item-count">
                        <p>Total Items:&nbsp;</p>
                        <p>{(addItemToCart.length)}</p>
                    </div>
                    <div className="total-item-count">
                        <p>Total Amount:&nbsp;</p>
                        <p>{totalCost}</p>
                    </div>
                    <div className="total-item-count">
                        <p>Dicount:&nbsp;</p>
                        <p>10%</p>
                    </div>
                    <div>
                        <button>Place Your Order</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
