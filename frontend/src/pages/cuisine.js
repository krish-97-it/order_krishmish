import React, {useRef, useState} from "react";
import { useLocation } from 'react-router-dom';
import ratingSvg from '../assets/rating-star.svg';
import vegIcon from '../assets/veg-icon.webp';
import nonVegIcon from '../assets/non-veg-icon.webp';
import BottomToast from "../components/bottom-toast";
import GoToTop from "../components/go-to-top";


export default function Cuisine({getItemList, getFilteredItemList, getInputCuisine, getCuisineName, getFoodName, getFoodNameByCategory, getSortFilterInput, getTopPicsItemList, addToCartFunction, addedCartItem, totalCartItem}){

    const location = useLocation();
    const currentPath = location.pathname;

    // Horizontal scroll using buttons for food items
    const cardItem          =   useRef();
    const handlecardScroll  =   (direction) => {
        sideScroll(cardItem.current,direction,20,160,10);
    }


    const filterCatItem     =   useRef();
    const catFilterScroll   =   (direction) => {
        sideScroll(filterCatItem.current,direction,20,160,10);
    }


    function sideScroll(element,direction,speed,distance,step){
        var scrollAmount    = 0;
        var slideTimer      = setInterval(function(){
            if(direction === 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                clearInterval(slideTimer);
            }
        }, speed);
    }


    // show full description on click readmore on each item card
    function showFlullContent(i, text){
        let ele_id      = "item-"+i;  // current item id generate
        let ele         = document.getElementById(ele_id);
        ele.innerHTML   = " ";
        ele.innerHTML   = text;
    }


    const [foodCategory, updateFoodCategory] = useState('All');
    function getFoodCategory(event){
        let ele_val      = event.target.value;
        updateFoodCategory(ele_val);
    }

    return(
        <div className="app-body">
            <div className="main-content" style={{position:"relative"}}>
                <h3 className="gradient-bg no-border-radius mb-0">What's on your mind?</h3>
                <div className="select-cuisine-bg">
                    <div className="dark-opacity">
                        <div className="select-cuisine-container container">
                            <div className="select-cuisine-section cuisine-select-dropdown" show-on-cuisine-page = {currentPath === '/cuisine' ? 'on' : 'off'}>
                                <p style={{border: "2px solid #8b8b8b", padding: "10px", color:"#fffcd9", background: "black", background: "rgb(0, 0, 0, 0.5)"}}>Choose a Specific CUISINE & Order your Favourite Dishes !!</p>
                                <select id="cuisineselect" className="form-select item-filter-select" aria-label="Default select example" onChange={getInputCuisine}>
                                    <option defaultValue="all cuisines">All Cuisines</option>
                                    <option value="indian">Indian</option>
                                    <option value="chinese">Chinese</option>
                                    <option value="american">American</option>
                                    <option value="italian">Italian</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-pics-container container-fluid mt-2">
                    <div>
                        <button className="chevron-left-button" onClick={() => handlecardScroll('left')}><i className="fa fa-lg fa-chevron-left"></i></button>
                    </div>
                    <div className="top-pics-section mt-3 " ref={cardItem}>
                        {
                            getTopPicsItemList.map((data,index) => {
                                return (
                                    <div className="top-pics-card mb-sm-0" key={index}>
                                        <button className="item-btn-background" onClick={getFoodName} value={data.name}>
                                            <img src={data.image.img_one} className="border-rounded top-pics-item-img" alt="Food Category"/>
                                        </button>
                                        <div className="top-pics-item-name">
                                            <button className="item-name-background" onClick={getFoodName} value={data.name}>
                                                <span className="a-tag-style">{data.name}</span>
                                            </button>
                                        </div>
                                    </div> 
                                )
                            })
                        }
                    </div>
                    <div>
                        <button className="chevron-right-button" onClick={() => handlecardScroll('right')}><i className="fa fa-lg fa-chevron-right"></i></button>
                    </div>
                </div>
                <div className="show-all-products">
                    <h3 className="gradient-bg no-border-radius">
                        Food under <span className="cuisine-name-txt">{getCuisineName !== 'cuisines' ? getCuisineName.toUpperCase():'ALL'}</span> cuisine
                    </h3>
                    
                    <div className="container-fluid">
                        <div className="food-category-filter-section">
                            <div className="btn-for-scroll">
                                <button className="chevron-left-button" onClick={() => catFilterScroll('left')}><i className="fa fa-lg fa-chevron-left"></i></button>
                            </div>
                            <div className="food-category-buttons" ref={filterCatItem}>
                                <button type="button" className="btn text-nowrap btn-starter font-color-w" onClick={getFoodNameByCategory} value="starter">Starter</button>
                                <button type="button" className="btn text-nowrap btn-main-course font-color-w" onClick={getFoodNameByCategory} value="main course">Main Course</button>
                                <button type="button" className="btn text-nowrap btn-side-dish font-color-w" onClick={getFoodNameByCategory} value="side dish">Side Dish</button>
                                <button type="button" className="btn text-nowrap btn-drinks font-color-w" onClick={getFoodNameByCategory} value="drinks">Drinks</button>
                                <button type="button" className="btn text-nowrap btn-snacks" onClick={getFoodNameByCategory} value="snacks">Snacks</button>
                                <button type="button" className="btn text-nowrap btn-desert" onClick={getFoodNameByCategory} value="dessert">Dessert</button>
                                <button type="button" className="btn text-nowrap btn-combos font-color-w" onClick={getFoodNameByCategory} value="combos">Combos</button>
                            </div>
                            <div className="btn-for-scroll">
                                <button className="chevron-right-button" onClick={() => catFilterScroll('right')}><i className="fa fa-lg fa-chevron-right"></i></button>
                            </div>
                        </div>
                        <div className="product-filter-container">
                            <div className="filter-product-section">
                                {/* <div className="filter-txt">Filter:</div> */}
                                <div className="dropdown sort-by-btn-section">
                                    <button className="btn btn-secondary dropdown-toggle sort-by-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort By
                                    </button>
                                    <ul className="dropdown-menu dropdown-area-expand" aria-labelledby="dropdownMenuButton1" style={{padding : "10px", color: "#4b4b4b", fontweight: "500"}}>
                                        <li>
                                            <div className="form-check form-check-inline sort-by-form-check">
                                                <label className="form-check-label" htmlFor="inlineRadio1">Default</label>
                                                <input className="form-check-input-sort-by" type="radio" name="radiobtnsortby" id="radio-btn1" onChange={getSortFilterInput} value="Default" defaultChecked/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check form-check-inline sort-by-form-check">
                                                <label className="form-check-label" htmlFor="inlineRadio2">Rating</label>
                                                <input className="form-check-input-sort-by" type="radio" name="radiobtnsortby" id="radio-btn2" onChange={getSortFilterInput} value="rating"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check form-check-inline sort-by-form-check">
                                                <label className="form-check-label" htmlFor="inlineRadio3">Delivery Time</label>
                                                <input className="form-check-input-sort-by" type="radio" name="radiobtnsortby" id="radio-btn3" onChange={getSortFilterInput} value="delivery-time"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check form-check-inline sort-by-form-check">
                                                <label className="form-check-label" htmlFor="inlineRadio4">Cost Low-to-High</label>
                                                <input className="form-check-input-sort-by" type="radio" name="radiobtnsortby" id="radio-btn4" onChange={getSortFilterInput} value="cost-low-to-high"/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check form-check-inline sort-by-form-check">
                                                <label className="form-check-label" htmlFor="inlineRadio5">Cost high-to-low</label>
                                                <input className="form-check-input-sort-by" type="radio" name="radiobtnsortby" id="radio-btn5" onChange={getSortFilterInput} value="cost-high-to-low"/>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="veg-nonveg-option">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="radiobtn" id="radio-btn-1" onChange={getFoodCategory} value="All" defaultChecked/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="radiobtn" id="radio-btn-2" onChange={getFoodCategory} value="Veg"/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">Veg</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="radiobtn" id="radio-btn-3" onChange={getFoodCategory} value="Non Veg"/>
                                        <label className="form-check-label" htmlFor="inlineRadio3">Non-veg</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5>{(getFilteredItemList.length > 0 && foodCategory !=='All') ? "Showing results for: "+foodCategory+" Dishes" : ''}</h5>
                        <div className="food-card-section all-product-show mt-3 mb-3">
                            {
                                (getFilteredItemList.length > 0) ?
                                <>
                                    {
                                        (foodCategory !== 'All') ?
                                        getFilteredItemList.map((item,index)=>{
                                            return (
                                                (((foodCategory.toLowerCase()) === item.category)) ?
                                                <div className="card custom-card-width all-item-card" key={item.category+"-"+index}>
                                                    
                                                    {/* <a href="/" className="a-tag-style"> */}
                                                        <img className="card-img-top img-w-100 all-item-card-img" src={item.image.img_one} alt="Food Card"/>
                                                        <p className="item-category-symbol"><img src={((item.category) === 'veg') ? vegIcon : nonVegIcon} alt="Food Category"/></p>
                                                        <p className="item-rating">{item.rating}<img src={ratingSvg} alt="rating"/></p>
                                                        <div className="card-body card-body-style">
                                                            <h5 className="card-title all-item-card-title">{item.name}<p>{item.subtitle}</p></h5>
                                                            <p className="item-description" id={"item-"+index}>{(item.description).substring(0, 50)}<span onClick={()=> showFlullContent(index, item.description)}>...read more</span></p>
                                                            <div className="pos-bottom">
                                                                <div className="price-order">
                                                                    <p key={"item-"+index}>₹{item.price}  • {item.preptime}</p>
                                                                    <button className="add-to-cart-btn" onClick={()=>addToCartFunction(item)} id={"item-"+item._id}>
                                                                        Add
                                                                        {
                                                                            addedCartItem.map(data =>
                                                                                data.product._id === item._id ? <span className="highlight-quantity-txt" key={"item-"+data.product._id}>{data.item_quantity}</span> : <></>
                                                                            )
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    {/* </a> */}
                                                </div>  : <></>
                                            )
                                        }) :
                                        getFilteredItemList.map((item,index)=>{
                                            return (
                                                <div className="card custom-card-width all-item-card" key={index}>
                                                    {/* <a href="/" className="a-tag-style"> */}
                                                        <img className="card-img-top img-w-100 all-item-card-img" src={item.image.img_one} alt="Food Card"/>
                                                        <p className="item-category-symbol"><img src={((item.category) === 'veg') ? vegIcon : nonVegIcon} alt="Food Category"/></p>
                                                        <p className="item-rating">{item.rating}<img src={ratingSvg} alt="rating"/></p>
                                                        <div className="card-body card-body-style">
                                                            <h5 className="card-title all-item-card-title">{item.name}<p>{item.subtitle}</p></h5>
                                                            <p className="item-description" id={"item-"+index}>{(item.description).substring(0, 50)}<span onClick={()=> showFlullContent(index, item.description)}>...read more</span></p>
                                                            <div className="pos-bottom">
                                                                <div className="price-order">
                                                                    <p key={"item-"+index}>₹{item.price}  • {item.preptime}</p>
                                                                    <button className="add-to-cart-btn" onClick={()=>addToCartFunction(item)} id={"item-"+item._id}>
                                                                        Add
                                                                        {
                                                                            addedCartItem.map(data =>
                                                                                data.product._id === item._id ? <span className="highlight-quantity-txt" key={"item-"+data.product._id}>{data.item_quantity}</span> : <></>
                                                                            )
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    {/* </a> */}
                                                </div>
                                            )
                                        })
                                    }
                                </>
                                : 
                                <div>
                                    <p><span className="no-result-txt">No Results Found !!</span> Please Select specific cuisine or all cuisines and search again.</p>
                                    <h5>All Our Dishes</h5>
                                    <div className="food-card-section all-product-show mt-3 mb-3">
                                        {
                                            getItemList.map((item,index)=>{
                                                return (
                                                    ((foodCategory.toLowerCase !== item.category)) ?
                                                    <div className="card custom-card-width all-item-card" key={index}>
                                                        {/* <a href="/" className="a-tag-style"> */}
                                                            <img className="card-img-top img-w-100 all-item-card-img" src={item.image.img_one} alt="Food Card"/>
                                                            <p className="item-category-symbol"><img src={((item.category) === 'veg') ? vegIcon : nonVegIcon} alt="Food Category"/></p>
                                                            <p className="item-rating">{item.rating}<img src={ratingSvg} alt="rating"/></p>
                                                            <div className="card-body card-body-style">
                                                                <h5 className="card-title all-item-card-title">{item.name}<p>{item.subtitle}</p></h5>
                                                                <p className="item-description" id={"item-"+index}>{(item.description).substring(0, 50)}<span onClick={()=> showFlullContent(index, item.description)}>...read more</span></p>
                                                                <div className="pos-bottom">
                                                                    <div className="price-order">
                                                                        <p key={"item-"+index}>₹{item.price}  • {item.preptime}</p>
                                                                        <button className="add-to-cart-btn" onClick={()=>addToCartFunction(item)} id={"item-"+item._id}>
                                                                            <span>Add</span>
                                                                            {
                                                                                addedCartItem.map(data =>
                                                                                    data.product._id === item._id ? <span className="highlight-quantity-txt" key={"item-"+data.product._id}>{data.item_quantity}</span> : <></>
                                                                                )
                                                                            }
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        {/* </a> */}
                                                    </div>  : <></>
                                                )
                                            }) 
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {
                    (totalCartItem > 0)?
                    <BottomToast/>
                    :
                    <></>
                }
                <GoToTop/>
            </div>
        </div>
    )
}
