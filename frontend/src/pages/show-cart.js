import React, {useState, useEffect} from "react";

export default function ShowCartPage({addedCartItem, deleteCartItem, getTotalCost, increaseItemQuantity, decreaseItemQuantity}){
    return(
        <div className="app-body custom-margin-top">
            <div className="main-content container cart-page-container">
                <div className="cart-item-billing-section">
                    <div className="cart-item-section">
                        <h3 className="gradient-bg added-item-txt">Added Items</h3>
                        {
                            (addedCartItem.length) > 0 ? 
                            <>
                                {
                                    addedCartItem.map((item,index) =>{
                                        return(
                                            <div className="added-cart-item" key={"item-"+index}>
                                                <div className="added-item-img">
                                                    <img src={item.product.image.img_one} alt="item image"/>
                                                </div>
                                                <div className="item-body-description">
                                                    <h5>{(item.product.name).length < 28? item.product.name : (item.product.name).substring(0,30)+'...'}</h5>
                                                    <div className="cart-item-btn-section">
                                                        <div>

                                                            <div className="quantity-btn-section">
                                                                <span>Qty:</span>
                                                                <div className="increase-decrease-btn">
                                                                    <button onClick={()=>{increaseItemQuantity((item))}}>+</button>
                                                                    <span>{item.item_quantity}</span>
                                                                    <button onClick={()=>{decreaseItemQuantity((item))}}>-</button>
                                                                </div>
                                                            </div>
                                                            
                                                            <p className="price-section">Price: {(item.item_quantity)+" x ₹"+(item.product.price)}</p>
                                                        </div>
                                                        <button className="remove-from-cart-btn" onClick={()=>{deleteCartItem(item)}}>Remove Item</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </> :
                            <p>Your Cart is empty !! No item added yet.</p>
                        
                        }
                    </div>
                    <div className="billing-details-secton">
                        <h3>Billing Summary</h3>
                        <div className="total-item-count">
                            <p>Total Items:&nbsp;</p>
                            <p>{(addedCartItem.length)}</p>
                        </div>
                        <div className="total-item-count">
                            <p>Total Amount:&nbsp;</p>
                            <p>{getTotalCost()}</p>
                        </div>
                        <div className="total-item-count">
                            <p>Dicount:&nbsp;</p>
                            <p>10%</p>
                        </div>
                        <hr className="hr-line"></hr>
                        <div className="total-item-count">
                            <p>Amount after Discount:&nbsp;</p>
                            <p>{getTotalCost() === 0 ? '0' : (getTotalCost() - ((getTotalCost()*10)/100))}</p>
                        </div>
                        <div className="order-now-btn">
                            <button>Place Your Order</button>
                        </div>

                    </div>
                </div>
                <div className="last-order-section">
                    <h3>
                        Last Ordered Items
                    </h3>
                </div>
            </div>
        </div>
    )
}
