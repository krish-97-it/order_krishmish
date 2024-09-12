import React from "react";

const WishList = ({addToCartFunction, favouriteItems, addToFavourite, showItems, parentClass}) =>{
    return(
        <div className={(parentClass === "profile-wishlist-section")? "row profile-wishlist-section":"row wishlist-page-section"}>
            {
                (favouriteItems.length) > 0 ? 
                <>
                    {
                        favouriteItems.map((item,index) =>{
                            return(
                                
                                (index<showItems)?
                                    
                                <div className="col-md-6 col-sm-12 wishlist-item" key={"item-"+index}>
                                    <div className="favourite-item-card">
                                        <div className="fav-item-img">
                                            <img src={item.product.image.img_one} alt="food"/>
                                        </div>
                                        <div className="item-body-description profile-page-item-body-description" style={{position:"relative"}}>
                                            <h5>{(item.product.name).length < 28? item.product.name : (item.product.name).substring(0,30)+'...'}</h5>
                                            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start"}}>
                                                <p className="price-section" style={{textAlign:"left"}}>Price: ₹{item.product.price}</p>
                                                <button className="heart-btn-style profile-page-heart-btn" onClick={()=>addToFavourite(item.product)}>
                                                    <i className="fa fa-heart heart-icon-color heart-icon-red" style={{fontSize:"20px"}}></i>
                                                </button>
                                            </div>
                                            <div className="pos-bottom">
                                                <button className="fav-item-cart-btn" onClick={(e)=>{e.preventDefault(); addToCartFunction(item.product)}} id={"item-"+item._id}>
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            )
                        })
                    }
                </> :
                <p>Empty Wishlist !! No Item is added to wishlist Yet.</p>
            }
        </div>
    )
}
export default WishList;