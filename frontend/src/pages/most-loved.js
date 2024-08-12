import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function MostLovedDish(){

    const [foodlist, getFoodList] = useState([]);
    const apiURL = 'http://localhost:4000/getFoodMenu';

    function loadData(){
        axios.get(apiURL).then((res) => {
            getFoodList(res.data[1].data);
            console.log(res.data[1].data);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return(
        <div className="app-body">
            <div className="main-content">
                    <div className="food-category-container mt-5">
                        <h3 className="gradient-bg no-border-radius">Most Loved Food</h3>
                        <div className="food-item-section mt-3 ">
                            {
                                foodlist.map((data,index) => {
                                    return (
                                        <div className="food-card food-item-card mb-sm-0">
                                            <a href="/"><img src={data.image.img_one} className="border-rounded food-item-img" alt="Food Category"/></a>
                                            <div className="food-item-name">
                                                <a className="a-tag-style" href="/">{data.name}</a>
                                            </div>
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
