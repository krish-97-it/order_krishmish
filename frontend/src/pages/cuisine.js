import React, {useRef, useState} from "react";
import ratingSvg from '../assets/rating-star.svg';

export default function Cuisine({getItemList, getFilteredItemList, getCuisineName, getFoodName, getTopPicsItemList}){

    // Horizontal scroll using buttons for food items
    const cardItem          =   useRef();
    const handlecardScroll  =   (direction) => {
        sideScroll(cardItem.current,direction,20,160,10);
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
        console.log(ele_val);
        updateFoodCategory(ele_val);
    }
    return(
        <div className="app-body">
            <div className="main-content">
                <h3 className="gradient-bg no-border-radius">What's on your mind?</h3>
                <div className="top-pics-container container mt-2">
                    <div>
                        <button className="chevron-left-button" onClick={() => handlecardScroll('left')}><i className="fa fa-lg fa-chevron-left"></i></button>
                    </div>
                    <div className="top-pics-section mt-3 " ref={cardItem}>
                        {
                            getTopPicsItemList.map((data,index) => {
                                return (
                                    <div className="top-pics-card mb-sm-0" key={index}>
                                        <button onClick={getFoodName} value={data.name}><img src={data.image.img_one} className="border-rounded top-pics-item-img" alt="Food Category"/></button>
                                        <div className="top-pics-item-name">
                                            <a className="a-tag-style" href="/">{data.name}</a>
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
                    <h3 className="gradient-bg">Check Our Menu Card</h3>
                    <div className="container-fluid">
                        <div className="filter-product-section">
                            <div className="filter-txt">Filter:</div>                                
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
                                                        <p className="item-rating">{item.rating}<img src={ratingSvg} alt="rating"/></p>
                                                        <div className="card-body card-body-style">
                                                            <h5 className="card-title all-item-card-title">{item.name}<p>{item.subtitle}</p></h5>
                                                            <p className="item-description" id={"item-"+index}>{(item.description).substring(0, 50)}<span onClick={()=> showFlullContent(index, item.description)}>...read more</span></p>
                                                            <div className="pos-bottom">
                                                                <div className="price-order">
                                                                    <p>AT {item.price}  • {item.preptime}</p>
                                                                    <button className="add-to-cart-btn">Add</button>
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
                                                        <p className="item-rating">{item.rating}<img src={ratingSvg} alt="rating"/></p>
                                                        <div className="card-body card-body-style">
                                                            <h5 className="card-title all-item-card-title">{item.name}<p>{item.subtitle}</p></h5>
                                                            <p className="item-description" id={"item-"+index}>{(item.description).substring(0, 50)}<span onClick={()=> showFlullContent(index, item.description)}>...read more</span></p>
                                                            <div className="pos-bottom">
                                                                <div className="price-order">
                                                                    <p>AT {item.price}  • {item.preptime}</p>
                                                                    <button className="add-to-cart-btn">Add</button>
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
                                    <p>No Results Found !! Please Select specific cuisine and go for a dish.</p>
                                    <h5>All Our Dishes</h5>
                                    {
                                        getItemList.map((item,index)=>{
                                            return (
                                                ((foodCategory.toLowerCase !== item.category)) ?
                                                <div className="card custom-card-width all-item-card" key={index}>
                                                    {/* <a href="/" className="a-tag-style"> */}
                                                        <img className="card-img-top img-w-100 all-item-card-img" src={item.image.img_one} alt="Food Card"/>
                                                        <p className="item-rating">{item.rating}<img src={ratingSvg} alt="rating"/></p>
                                                        <div className="card-body card-body-style">
                                                            <h5 className="card-title all-item-card-title">{item.name}<p>{item.subtitle}</p></h5>
                                                            <p className="item-description" id={"item-"+index}>{(item.description).substring(0, 50)}<span onClick={()=> showFlullContent(index, item.description)}>...read more</span></p>
                                                            <div className="pos-bottom">
                                                                <div className="price-order">
                                                                    <p>AT {item.price}  • {item.preptime}</p>
                                                                    <button className="add-to-cart-btn">Add</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    {/* </a> */}
                                                </div>  : <></>
                                            )
                                        }) 
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>


                
            </div>
        </div>
    )
}
