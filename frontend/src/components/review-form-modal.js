import React,{useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Costant_Variables from "../controller/constant-variables";

const ReviewFormModal = ({loadUserData, isUserLoggedIn}) => {

    // console.log(userComment);
    const [rating, setRating]             = useState(0);
    const [formSlide, setFormSlide]       = useState('true');
    const [successSlide, setSuccessSlide] = useState('false');
    const [comment, updateComment]        = useState('');
    const saveReviewUrl                   = Costant_Variables.SERVER_BASE_URL+'/savereview';
    const currentUserReviewUrl            = Costant_Variables.SERVER_BASE_URL+'/getuserreview';

    function handleUserComment(e){
        let ele_val = e.target.value;
        updateComment(ele_val);
    }

    function submitReviewForm(e){
        e.preventDefault();
        if(rating !== 0){
            const formData  =   {
                userid     : loadUserData._id,
                firstname  : loadUserData.firstname,
                lastname   : loadUserData.lastname,
                state      : loadUserData.state,
                district   : loadUserData.district,
                rating     : rating,
                comment    : comment,
                profilepic : loadUserData.profileimg
            }
            const config = {
                headers: { 'Content-Type': 'application/json'}
            }
            axios.post(saveReviewUrl, formData, {config})
            .then(
                (response) => {
                    if(response.data.success === true){
                        setFormSlide('false');
                        setSuccessSlide('true');
                        setTimeout(function(){
                            window.location.reload();
                        }, 500);
                    }else{
                        setFormSlide('true');
                        setSuccessSlide('false');
                    }
                }
            ).catch(error => {
                console.log(error);
            });
        }else{
            Swal.fire(
                {
                    title: "No input",
                    text: "You need to rate us before submit!!",
                    icon: "warning"
                }
            )
        }
    }

    function showLoginMsg(){
		Swal.fire(
			{
				title: "",
				text: "You need to login first!!",
				icon: "warning"
			}
		)
	}

    function checkUserComment(){
        const formData  =   {
            userid   : loadUserData._id,
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }
        axios.post(currentUserReviewUrl, formData, {config})
        .then(
            (response) => {
                if(response.data.success === true){
                    const resData = response.data.data;
                    if(resData.length > 0){
                        setRating(resData[0].rating);
                        updateComment(resData[0].comment)
                    }else{
                        console.log("No record found");
                    }
                }else{
                    console.log("Faied to load review")
                }
            }
        ).catch(error => {
            console.log(error);
        });
    }

    return(
        <div className="review-page-banner-section">
            <div className="container">
                {
                    (isUserLoggedIn === 'true')?
                    <button className="add-review-banner" onClick={checkUserComment} data-bs-toggle="modal" data-bs-target="#reviewFormModal">
                        <picture>
                            <source media="(min-width:768px)" srcSet="https://img.perceptpixel.com/pykhlszs/review_page_banner_desktop.webp"/>
                            <source media="(max-width:767.98px)" srcSet="https://img.perceptpixel.com/pykhlszs/review_page_mob_banner.jpeg"/>
                            <img src="https://img.perceptpixel.com/pykhlszs/review_page_mob_banner.jpeg" alt="order history" style={{width:"100%", height:"auto"}}/>
                        </picture>
                    </button>
                    :
                    <button className="add-review-banner" onClick={showLoginMsg}>
                        <picture>
                            <source media="(min-width:768px)" srcSet="https://img.perceptpixel.com/pykhlszs/review_page_banner_desktop.webp"/>
                            <source media="(max-width:767.98px)" srcSet="https://img.perceptpixel.com/pykhlszs/review_page_mob_banner.jpeg"/>
                            <img src="https://img.perceptpixel.com/pykhlszs/review_page_mob_banner.jpeg" alt="order history" style={{width:"100%", height:"auto"}}/>
                        </picture>
                    </button>
                }
            </div>
            <div className="modal fade review-form-modal" id="reviewFormModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="form-slide-one" active-slide={formSlide}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalheading">Share Your Experience</h5>
                                <button type="button" className="login-modal-close" data-bs-dismiss="modal">X</button>
                            </div>
                            <div className="modal-body" style={{display:"flex", justifyContent:"center"}}>
                                <div className="form-body-section">
                                    <form className="row review-data-form" onSubmit={submitReviewForm}>
                                        <div className="col-md-12 col-sm-12 comment-text-area">
                                            <label htmlFor="lastName" className="form-label">Rate us:</label>
                                            <div className="review-rating-section">
                                                {
                                                    [1, 2, 3, 4, 5].map((star,z) => {
                                                        return(
                                                            <span className='rating-star-style' key={z} style={{color: (rating >= star) ? '#eb9200' : 'gray'}} onClick={()=>{setRating(star)}} >
                                                                {/* ★ */}
                                                                <i className="fa fa-star"></i>
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-sm-12 user-comment">
                                            <label htmlFor="comment" className="form-label">Leave a Comment:</label>
                                            <textarea className="form-control" id="comment" rows="3" value={comment} onChange={handleUserComment}></textarea>
                                        </div>
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-check">
                                                <div className="agree-check-form">
                                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                                                    <label className="form-check-label" htmlFor="invalidCheck">
                                                        I acknowledge that all particulars shared by me are genuine to the best of my belief
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <button className="btn btn-primary review-form-submit" type="submit">Submit form</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="form-slide-two" active-slide={successSlide}>
                            <div className="modal-header">
                                <button type="button" className="login-modal-close" data-bs-dismiss="modal">X</button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <p>Thank You for share your experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewFormModal;