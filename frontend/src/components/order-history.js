import React from "react";

export default function OrderHistory({orderHistoryData, userLoggedIn, addToCartFunction, ratedItems, addRating}){
    function convertDate(date){
        let d       = new Date(date);
        // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        // const day   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sturday"];

        // let month_Name = month[d.getMonth()];
        // let day_Name   = day[d.getDay()];
        // let year       = d.getFullYear();
        // let time       = d.toLocaleTimeString();
        let dateString = d.toDateString();

        return dateString
        // console.log(month_Name);
        // console.log(day_Name);
        // console.log(time);
        // console.log(year);
    }
    return(
        <>
        {
            (userLoggedIn === 'true' && orderHistoryData.length > 0)?
            orderHistoryData.map((data,i)=>{
                return(
                    <div className="each-order-section" key={i}>
                        <div className="order-date-section">
                            <span>{convertDate((data.created_at),0)}</span>
                        </div>
                        <div className="order-details-section">
                            <p className="order-status">Order Status: <span>{data.status}</span></p>
                            <p className="track-order">Track Order: <span>{data.track_details}</span></p>
                            <p className="total-order-item">Total Items: <span>{data.ordered_items.length}</span></p>
                            <p className="order-amt">Total Price: <span>₹{data.order_amt}</span></p>
                            <p className="delivery-order-address">Delivery Address: <span>{data.delivery_address[0].city}, {data.delivery_address[0].district}, {data.delivery_address[0].state}, {data.delivery_address[0].pincode}</span></p>
                        </div>

                        <div className="accordion accordion-flush view-ordered-items" id="orderHistoryAccordion">
                            <div className="view-ordered-items-btn-section">
                                <p className="view-ordered-item-heading">Ordered items:</p>
                                <button className="view-ordered-items-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#ordereditemcollapse"+i} aria-expanded="false" aria-controls={"#ordereditemcollapse"+i}>View list</button>
                            </div>
                            <div id={"ordereditemcollapse"+i} className="accordion-collapse collapse ordered-item-lists" data-bs-parent="#orderHistoryAccordion">
                                <div className="order-item-section">
                                    {
                                        data.ordered_items.map((item,j)=>{
                                                return(
                                                    <div className="each-order-item" key={j}>
                                                        <div className="fav-item-img">
                                                            <img src={item.product.image.img_one} alt="item"/>
                                                        </div>
                                                        <div className="order-desc-section" style={{position:"relative"}}>
                                                            <p className="order-item-name">{item.product.name}</p>
                                                            <p className="p-style">QTY: {item.item_quantity}</p>
                                                            <div className="give-rating-star">
                                                                {
                                                                    (ratedItems.length > 0 && (ratedItems.find(data => data.p_id === item.product._id)))?
                                                                        ratedItems.map((ritem, i) => {
                                                                            return(
                                                                                (ritem.p_id === item.product._id)?
                                                                                [1, 2, 3, 4, 5].map((star,z) => {
                                                                                    return(
                                                                                        <span className='rating-star-style' key={z} style={{color: ((ratedItems[i].rating)? (ratedItems[i].rating) : 0) >= star ? '#eb9200' : 'gray'}} onClick={() => {addRating(item.product._id, star)}} >
                                                                                            {/* ★ */}
                                                                                            <i className="fa fa-star"></i>
                                                                                        </span>
                                                                                    )
                                                                                })
                                                                                :
                                                                                <></>
                                                                            )
                                                                            
                                                                        })
                                                                    :
                                                                    [1, 2, 3, 4, 5].map((star,z) => {
                                                                        return(
                                                                            <span className='rating-star-style' key={z} style={{color: 'gray'}} onClick={() => {addRating(item.product._id, star)}} >
                                                                                {/* ★ */}
                                                                                <i className="fa fa-star"></i>
                                                                            </span>
                                                                        )
                                                                    })
                                                                    
                                                                }
                                                            </div>
                                                            <div className="pos-bottom">
                                                                <button className="readd-cart-btn" onClick={(e)=>{e.preventDefault(); addToCartFunction(item.product)}}>
                                                                    Add To Cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            :
            <p style={{color:"grey", fontSize:"22px", fontWeight:"600px"}}>It seems like you have not ordered yet! Place your first order at Flat 30% discount.</p>
        }
        </>
    )
}