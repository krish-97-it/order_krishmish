import React, {useRef} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ComboItemCarousel({comboItemList, getHomeCuisineName, addToCartFunction, addedCartItem}){

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
                        comboItemList.map((item,index) => {
                            return (
                                <div className="card combo-item-card active h-100" key={"combo-"+index}> 
                                    <img className="combo-card-img card-img-top img-w-100" src={item.image.img_one} alt="Food Card"/>
                                    <div className="card-body card-body-style">
                                        <h5 className="card-title" style={{margin:"0px"}}>{item.name}<p style={{margin:"0px 0px 5px 0px"}}>{item.subtitle}</p></h5>
                                        <div className="price-order" style={{margin:"0px 0px 45px 0px"}}>
                                            <p>AT ₹{item.price}  • {item.preptime}</p>
                                        </div>
                                        <div className="pos-bottom" style={{textAlign:"center"}}>
                                            {/* <Link to="/cuisine" className="btn btn-primary" style={{width:"100%"}} onClick={()=>getHomeCuisineName(item.name)}>Check Now</Link> */}
                                            <button className="btn btn-primary" style={{width:"100%"}} onClick={()=>addToCartFunction(item)} id={"item-"+item._id}>
                                                Add To Cart
                                                {
                                                    addedCartItem.map(data =>
                                                        data.product._id === item._id ? <span className="highlight-quantity-txt" key={"item-"+data.product._id}>{data.item_quantity}</span> : <></>
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
                <CustomRight/>
            </div>
        </div>
    )
}

export default ComboItemCarousel;