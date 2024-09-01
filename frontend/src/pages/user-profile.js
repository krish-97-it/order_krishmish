import React from "react";
import customFunctions from "../controller/validation-functions";
import { Link } from "react-router-dom";

const MyProfile = ({loadUserData}) => {
    console.log(loadUserData);
    return (
        <div className="app-body">
            <div className="main-content">
                <div className="container-fluid">
                    <div className="profile-heading-section">
                        <div className="dark-opacity">
                            <div className="profile-picture-section">
                                <img src="" className="profile-picture"/>
                            </div>
                            <div className="user-name-section">
                                <h3>{loadUserData.firstname}&nbsp;{loadUserData.lastname}</h3>
                            </div>
                            <div className="profile-quicklinks-section">
                                <Link to="#mywishlist" className="profile-quicklinks">My Wishlist</Link>
                                <Link to="#mywishlist" className="profile-quicklinks">Order History</Link>
                                <Link to="#mywishlist" className="profile-quicklinks">Reviews</Link>
                            </div>
                        </div>
                    </div>
                    <div className="profile-body-section mt-5">
                        <p>First Name : {loadUserData.firstname}</p>
                        <p>Last Name : {loadUserData.lastname}</p>
                        <p>Nick Name : {loadUserData.nickname}</p>
                        <p>Date Of Birth : {loadUserData.dob}</p>
                        <p>Gender : {loadUserData.gender}</p>
                        <p>Email : {loadUserData.email}</p>
                        <p>Mobile No. : {loadUserData.phone}</p>
                        <p>State : {loadUserData.state}</p>
                        <p>City : {loadUserData.city}</p>
                        <p>Pin Code : {loadUserData.pincode}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;