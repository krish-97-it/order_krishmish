import React, { useState } from "react";
import GoToTop from "../components/go-to-top";
import ReviewFormModal from "../components/review-form-modal";

export default function ReviewPage({getReviewList, loadUserData, isUserLoggedIn}){
	const NumberOfCardsPerLoad         = 12;
	const [cardCount, updateCardCount] = useState(NumberOfCardsPerLoad);
	function loadData(){
		if(getReviewList.length > NumberOfCardsPerLoad && cardCount < getReviewList.length){
			let loopLimit = cardCount + NumberOfCardsPerLoad;
			if(((getReviewList.length - cardCount) < NumberOfCardsPerLoad)){
				loopLimit   = getReviewList.length;
			}
			for(let i=cardCount; i<loopLimit; i++){
				let div = document.createElement('div');
				div.className   = 'card custom-card-width all-item-card review-card-section';
				div.id          = 'item'+i;
				div.key         = i;
				const card_html =	'<div class="user-img-section">'+
										'<img class="card-img-top review-user-img" src="'+getReviewList[i].profilepic+'" alt="Food Card"/>'+
								  	'</div>'+
								  	'<div class="card-body card-body-style">'+
										'<h5 class="card-title all-item-card-title">'+getReviewList[i].firstname+' '+getReviewList[i].lastname+'<p>'+getReviewList[i].district+', '+getReviewList[i].state+'</p></h5>'+
										'<p>'+getReviewList[i].comment+'</p>'+
										'<p>'+getRatingHtml(getReviewList[i].rating)+'</p>'+
								  	'</div>';

				div.innerHTML   = card_html;
				document.getElementById('reviewSection').appendChild(div);
			}
			updateCardCount(loopLimit);
		}
	}

	function getRatingHtml(data){
		let temp = '';
		for(let j = 1; j<=5; j++){
			if(j <= data){
				temp += '<span class="rating-star-style" style="color: #eb9200">'+
							'<i class="fa fa-star"></i>'+
						'</span>';
			}
		}
		return temp;
	}

	return (
		<div className="app-body">
			<div className="main-content mb-3" style={{marginTop:"61px"}}>
				<ReviewFormModal loadUserData={loadUserData} isUserLoggedIn = {isUserLoggedIn}/>
				<h3 className="gradient-bg no-border-radius">User Reviews</h3>
				{
					(getReviewList.length > 0)?
						<div className="container-fluid">
							<div id='reviewSection' className='review-card-container'>
								{ 
								getReviewList.map((data,index)=>{
									return (
										(index < 12)?
										<div className="card custom-card-width all-item-card review-card-section" id={"item"+index} key={index}>
											<div className="user-img-section"><img className="card-img-top review-user-img" src={data.profilepic} alt="Food Card"/></div>
											<div className="card-body card-body-style">
												<h5 className="card-title all-item-card-title">{data.firstname} {data.lastname} <p>{data.district}, {data.state}</p></h5>
												<p className="">{data.comment}</p>
												<p>
													{
														[1, 2, 3, 4, 5].map((star,index) => {
															return(
																(star <= data.rating)?
																<span className='rating-star-style' key={index} style={{color: '#eb9200'}}>
																	{/* ★ */}
																	<i className="fa fa-star"></i>
																</span>
																:
																<></>
															)
														})
													}
												</p>
											</div>
										</div>
										:
										<></>
									)
								})
								}
							</div>
							<div>
								<button className="btn load-more-data-btn" onClick={loadData}>Load more</button>
							</div>
						</div> 
					:
					<div className="container">
						<p>
						No Reviews Added Yet
						</p>
					</div>
				}         
			</div>
			<GoToTop/>
		</div>
	)
}
