import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function reviewPage({getItemList}){

    var settings = {
        dots: false,
        infinite: false,
        // arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
    return (
        <div className="slider-container" style={{margin:"62px 0px"}}>
            {
               {
                // <Slider {...settings}>
                // {
                //     getItemList.map((item,index) => {
                //         return (
                //             <div className="" key={"offers-"+index}>
                //                 <div className="card combo-item-card"> 
                //                     {/* <a href="/" className="a-tag-style"> */}
                //                         <img className="card-img-top img-w-100" src={item.image.img_one} alt="Food Card"/>
                //                         <div className="card-body card-body-style">
                //                             <h5 className="card-title">{item.name}<p>{item.subtitle}</p></h5>
                //                             <div className="pos-bottom">
                //                                 <div className="price-order">
                //                                     <p>AT ₹{item.price}</p>
                //                                     <p>{item.preptime}</p>
                //                                     <a href="/" className="btn btn-primary">Add</a>
                //                                 </div>
                //                             </div>
                //                         </div>
                //                     {/* </a> */}
                //                 </div>
                //             </div>
                //         )
                //     })
                // }
                // </Slider>
                }
            }       
        </div>
    );
}
