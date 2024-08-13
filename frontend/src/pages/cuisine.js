import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ratingSvg from '../assets/rating-star.svg';

export default function Cuisine({getFilteredItemList}){

    // api call to get food menus from backend db. Api written in backend project
    const [foodlist, getFoodList]   =   useState([]);
    const apiURL                    =   'http://localhost:4000/getFoodMenu';

    function loadData(){
        axios.get(apiURL).then((res) => {
            getFoodList(res.data[1].data);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        loadData();
    }, []);


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

    function showFlullContent(i, text){
        let ele_id = "item-"+i;
        let ele = document.getElementById(ele_id);
        ele.innerHTML = " ";
        ele.innerHTML = text;
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
                            foodlist.map((data,index) => {
                                return (
                                    <div className="top-pics-card mb-sm-0" key={index}>
                                        <a href="/"><img src={data.image.img_one} className="border-rounded top-pics-item-img" alt="Food Category"/></a>
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
                    <div className="food-card-section all-product-show container-fluid mt-3 mb-3">
                        {
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
                    </div>
                </div>


                
            </div>
        </div>
    )
}
