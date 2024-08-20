import React, {Component} from "react";
import { Link, NavLink } from "react-router-dom";

export default function Foodcard({getHomeCuisineName}){
    return(
        <div className="container-fluid mt-3 mb-3">
            <div className="food-category-container mt-5">
                <h3 className="gradient-bg">Iconic Multi Cuisine</h3>
                <div className="food-category-section mt-3 ">
                    <div className="food-card mb-sm-0">
                        <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("indian")}} value="indian">
                            <img src="https://img.perceptpixel.com/pykhlszs/indian-cuisine.webp" className="img-w-100 border-rounded food-cat-card-img" alt="Food Category"/>
                            <div className="card-name">
                                <h5>Indian</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="food-card mb-sm-0">
                    <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("chinese")}} value="chinese">
                        <img src="https://img.perceptpixel.com/pykhlszs/chinese-cuisine.webp" className="img-w-100 border-rounded food-cat-card-img" alt="Food Category"/>
                        <div className="card-name">
                            <h5>chinese</h5>
                        </div>
                    </Link>
                    </div>
                    <div className="food-card mb-sm-0">
                        <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("italian")}} value="italian">
                            <img src="https://img.perceptpixel.com/pykhlszs/italian-cuisine.webp" className="img-w-100 border-rounded food-cat-card-img" alt="Food Category"/>
                            <div className="card-name">
                                <h5>Italian</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="favourite-category-container mt-5">
                <h3 className="gradient-bg fav-cat-h3">Favourite Categories</h3>
                <div className="fav-cat-section fav-cat-banner-section">
                    <button className="carousel-control-prev carousel-control-btn-stye" type="button" data-bs-target="#product-cat" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <div>
                        <div id="product-cat" className="carousel slide" data-bs-interval="false">

                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="fav-cat-item-list">
                                        <div className="fav-cat-item">
                                            <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("starter")}} value="starter">
                                                <img src="https://img.perceptpixel.com/pykhlszs/italian-cuisine.webp" className="img-w-100 food-cat-card-img" alt="Food Category"/>
                                                <div className="card-name">
                                                    <h5 className="food-cat-name">Starter</h5>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="fav-cat-item">
                                            <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("main course")}} value="main course">
                                                <img src="https://img.perceptpixel.com/pykhlszs/italian-cuisine.webp" className="img-w-100 food-cat-card-img" alt="Food Category"/>
                                                <div className="card-name">
                                                    <h5 className="food-cat-name">Main Course</h5>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="fav-cat-item">
                                            <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("side dish")}} value="side dish">
                                                <img src="https://img.perceptpixel.com/pykhlszs/italian-cuisine.webp" className="img-w-100 food-cat-card-img" alt="Food Category"/>
                                                <div className="card-name">
                                                    <h5 className="food-cat-name">Side Dish</h5>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="fav-cat-item-list">
                                        <div className="fav-cat-item">
                                            <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("drinks")}} value="drinks">
                                                <img src="https://img.perceptpixel.com/pykhlszs/italian-cuisine.webp" className="img-w-100 food-cat-card-img" alt="Food Category"/>
                                                <div className="card-name">
                                                    <h5 className="food-cat-name">Drinks</h5>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="fav-cat-item">
                                            <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("desert")}} value="desert">
                                                <img src="https://img.perceptpixel.com/pykhlszs/italian-cuisine.webp" className="img-w-100 food-cat-card-img" alt="Food Category"/>
                                                <div className="card-name">
                                                    <h5 className="food-cat-name">Desert</h5>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="fav-cat-item">
                                            <Link to="/cuisine" className="a-tag-style" onClick={(e)=>{getHomeCuisineName("cakes and bakery")}} value="cakes and bakery">
                                                <img src="https://img.perceptpixel.com/pykhlszs/italian-cuisine.webp" className="img-w-100 food-cat-card-img" alt="Food Category"/>
                                                <div className="card-name">
                                                    <h5 className="food-cat-name">Cakes & Bakery</h5>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-indicators carousel-indicators-style">
                                <button type="button" data-bs-target="#product-cat" data-bs-slide-to="0" className="active"></button>
                                <button type="button" data-bs-target="#product-cat" data-bs-slide-to="1"></button>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-next carousel-control-btn-stye" type="button" data-bs-target="#product-cat" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>

            <div className="food-card-container mt-5">
                <h3 className="gradient-bg">Special Combos with Offers</h3>
                <div className="food-card-section mt-3">
                    <div className="card custom-card-width">
                        <a href="/" className="a-tag-style">
                            <img className="card-img-top img-w-100" src="https://img.perceptpixel.com/pykhlszs/polao-combo.webp" alt="Food Card"/>
                            <div className="card-body card-body-style">
                                <h5 className="card-title">Basanti Polao<p>with Alur Dum (4Pc.)</p></h5>
                                <div className="pos-bottom">
                                    <div className="price-order">
                                        <p>AT ₹100</p>
                                        <p>30 mins</p>
                                        {/* <a href="/" className="btn btn-primary">Add</a> */}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="card custom-card-width">
                        <a href="/" className="a-tag-style">
                            <img className="card-img-top img-w-100" src="https://img.perceptpixel.com/pykhlszs/chinese-cuisine.webp" alt="Food Card"/>
                            <div className="card-body card-body-style">
                                <h5 className="card-title">Mixed Fried Rice<p>with Chili Chiken (4Pc.)</p></h5>
                                <div className="pos-bottom">
                                    <div className="price-order">
                                        <p>AT ₹150</p>
                                        <p>40 mins</p>
                                        {/* <a href="/" className="btn btn-primary">Add</a> */}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="card custom-card-width">
                        <a href="/" className="a-tag-style">
                            <img className="card-img-top img-w-100" src="https://img.perceptpixel.com/pykhlszs/indian-cuisine.webp" alt="Food Card"/>
                            <div className="card-body card-body-style">
                                <h5 className="card-title">Biriyani<p>with Chiken Chap (1Pc.)</p></h5>
                                <div className="pos-bottom">
                                    <div className="price-order">
                                        <p>AT ₹200</p>
                                        <p>30 mins</p>
                                        {/* <a href="/" className="btn btn-primary">Add</a> */}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="card custom-card-width">
                        <a href="/" className="a-tag-style">
                            <img className="card-img-top img-w-100" src="https://img.perceptpixel.com/pykhlszs/momoburger-combo.webp" alt="Food Card"/>
                            <div className="card-body card-body-style">
                                <h5 className="card-title">Chiken Moburger<p>Cold Drinks (200ml)</p></h5>
                                <div className="pos-bottom">
                                    <div className="price-order">
                                        <p>AT ₹100</p>
                                        <p>20 mins</p>
                                        {/* <a href="/" className="btn btn-primary">Add</a> */}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="see-more-section"><a href="/" className="btn btn-primary">See More</a></div>
            </div>

            <div className="mt-5"><h3 className="gradient-bg">Customer Reviews</h3></div>
        </div>
    )
}