import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Cuisine(){

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


    return(
        <div className="app-body">
            <div className="main-content">
                <h3 className="gradient-bg no-border-radius">What's on your mind?</h3>
                <div className="top-pics-container container mt-5">
                    <div>
                        <button onClick={() => handlecardScroll('left')}><i className="fa fa-lg fa-chevron-left"></i></button>
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
                        <button onClick={() => handlecardScroll('right')}><i className="fa fa-lg fa-chevron-right"></i></button>
                    </div>
                </div>

            </div>
        </div>
    )
}
