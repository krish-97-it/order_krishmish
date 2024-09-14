import React from "react";
import Slider from "react-slick";
import sadSvg from '../assets/sad-face-in-rounded-square-svgrepo-com.svg';


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
      <div className="app-body">
          <div className="main-content container">
              <div className="error-page-msg-section">
                  <div className="sad-face-icon" style={{backgroundColor:"white", paddingTop:"10px"}}>
                      <img src={sadSvg} alt="error"/>
                  </div>
                  <h1>Working in Progress !!</h1>
                  <h3>No reviews added yet</h3>
                  {/* <div className="mt-2">
                      <NavLink to="/" type="button" className="btn btn-primary">Go Back</NavLink>
                  </div> */}
              </div>
          </div>
      </div>
      // <div className="slider-container" style={{margin:"62px 0px"}}>
      //     {

            //  {
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
              // }
      //     }       
      // </div>
    )
}
