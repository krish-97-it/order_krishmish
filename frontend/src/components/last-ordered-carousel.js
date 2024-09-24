import React, {useRef} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function LastOrderedItemCarousel({orderHistoryData, addToCartFunction, addedCartItem}){

    const slider = useRef(null);
    const carouselSettings = {
        largeDesktop: {
            breakpoint: { max: 5000, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        desktop: {
          breakpoint: { max: 1023.98, min: 768 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 767.98, min: 424 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 423.98, min: 320 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
    };
    const leftArrowStyle = {
        background: "transparent",
        border: 0,
        color: "black",
        fontSize: "20px",
        padding: "0px 0px 0px 10px"
    };
    const rightArrowStyle = {
        background: "transparent",
        border: 0,
        color: "black",
        fontSize: "20px",
        padding: "0px 10px 0px 0px"
    };
    const CustomRight = ({ onClick }) => (
        <button className="combo-carousel-arrow right" onClick={() => slider?.current?.next(1)} style={rightArrowStyle}>
            <i className="fa fa-lg fa-chevron-right"></i>
        </button>
      );
    const CustomLeft = ({ onClick }) => (
        <button className="combo-carousel-arrow left" onClick={() => slider?.current?.previous(1)} style={leftArrowStyle}>
            <i className="fa fa-lg fa-chevron-left"></i>
        </button>
    );
    return(
        <div className="combo-item-carousel-section container">
            <div className="combo-page-item-section">
                <CustomLeft/>
                <Carousel
                    responsive={carouselSettings}
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    arrows={false}
                    renderButtonGroupOutside={true}
                    renderDotsOutside={true}
                    sliderClass=""
                    slidesToSlide={1}
                    // showDots
                    swipeable
                    // adaptiveHeight={true}
                    // customLeftArrow={<CustomLeft />}
                    // customRightArrow={<CustomRight />}
                    ref={slider}
                >
                    {
                        (orderHistoryData.length > 0)?
                            orderHistoryData[0].ordered_items.map((item,j)=>{
                                return(
                                    <div className="card combo-item-card active h-100" key={j}> 
                                        <img className="combo-card-img card-img-top img-w-100" src={item.product.image.img_one} alt="Food Card"/>
                                        <div className="card-body card-body-style">
                                            <h5 className="card-title" style={{margin:"0px"}}>{item.product.name}<p style={{margin:"0px 0px 5px 0px"}}>{item.product.subtitle}</p></h5>
                                            <div className="price-order" style={{margin:"0px 0px 45px 0px"}}>
                                                <p>AT ₹{item.product.price}  • {item.product.preptime}</p>
                                            </div>
                                            <div className="pos-bottom" style={{textAlign:"center"}}>
                                                <button className="btn btn-pimaary combo-page-add-to-cart-btn" style={{width:"100%"}} onClick={()=>addToCartFunction(item.product)} id={"item-"+item.product._id}>
                                                    Add To Cart
                                                    {
                                                        addedCartItem.map(dataItem =>
                                                            dataItem.product._id === item.product._id ? <span className="highlight-quantity-txt combo-page-qty-btn" key={"item-"+dataItem.product._id}>{dataItem.item_quantity}</span> : <></>
                                                        )
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        :
                        <></>
                    }
                </Carousel>
                <CustomRight/>
            </div>
        </div>
    )
}

export default LastOrderedItemCarousel;