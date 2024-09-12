import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Costant_Variables from "../controller/constant-variables";
import ValidationFunctions from "../controller/validation-functions";
import Swal from 'sweetalert2';
import GoToTop from "../components/go-to-top";
import WishList from "../components/wishlist";
import OrderHistory from "../components/order-history";

const MyProfile = ({loadUserDataFunction, loadUserData, addToFavourite, favouriteItems, addToCartFunction}) => {

    function scrollToWishList(){
        const aria_expand = document.querySelector("button.open-wishlist-btn").getAttribute('aria-expanded');
        if(aria_expand === 'true'){
            setTimeout(function(){
                window.scrollTo({ top:325, behavior: "smooth" });
            }, 300);
        }else{
            window.scrollTo({ top:0, behavior: "smooth" });
        }
    }

    function scrollToOrderHistory(){
        const aria_expand = document.querySelector("button.order-history-btn").getAttribute('aria-expanded');
        if(aria_expand === 'true'){
            setTimeout(function(){
                window.scrollTo({ top:405, behavior: "smooth" });
            }, 300);
        }else{
            window.scrollTo({ top:0, behavior: "smooth" });
        }
    }

    const apiUrl        =   Costant_Variables.SERVER_BASE_URL+'/updateUserData';
    const [newUserData, setNewUserData] = useState({
        firstName: '',
        lastName: '',
        nickName: '',
        gender: '',
        dob:'',
        phoneNum: '',
        emailId: '',
        state: '',
        city: '',
        pinCode: '',

    });

    function enableEditBtn(){
        setLoadingMssg("");
        updateFirstNameErr({});
        updateLastNameErr({});
        updateNickNameErr({});
        updateGenderErr({});
        updateDobErr({});
        updateEmailIdErr({});
        updatePhoneNumErr({});
        updateStateErr({});
        updateCityErr({});
        updatePinCodeErr({});
        setNewUserData({...newUserData, 'firstName' : loadUserData.firstname, 'lastName':loadUserData.lastname, 'nickName':loadUserData.nickname, 'dob':loadUserData.dob, 'gender':loadUserData.gender, 'emailId':loadUserData.email, 'phoneNum':loadUserData.phone, 'state':loadUserData.state, 'city':loadUserData.city, 'pinCode' : loadUserData.pincode});
    }

    const [dpImageLink, setDpImageLink] = useState('https://img.perceptpixel.com/pykhlszs/default_dp.webp')
    const chooseProfilePicture = (event) =>{
        event.preventDefault();
        let ele_val= event.currentTarget.value;
        setDpImageLink(ele_val);
    } 

    const [firstNameErr, updateFirstNameErr]    = useState({});
    const [lastNameErr, updateLastNameErr]      = useState({});
    const [nickNameErr, updateNickNameErr]      = useState({});
    const [genderErr, updateGenderErr]          = useState({});
    const [dobErr, updateDobErr]                = useState({});
    const [emailIdErr, updateEmailIdErr]        = useState({});
    const [phoneNumErr, updatePhoneNumErr]      = useState({});
    const [stateErr, updateStateErr]            = useState({});
    const [cityErr, updateCityErr]              = useState({});
    const [pinCodeErr, updatePinCodeErr]        = useState({});

    const [loadingMssg, setLoadingMssg]         = useState("");

    const handlenewUserInput = (e) => {
        let ele         =   e.target.name;
        let ele_val     =   e.target.value;
        setNewUserData({...newUserData, [ele] : ele_val});

        if(ele === 'firstName'){
            let isfirstNameValid = ValidationFunctions.nameValidation(ele,ele_val);

            if(isfirstNameValid !== 'valid'){
                updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "invalid"})
            }else{
                updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "valid"})
            }
        }else if(ele === 'lastName'){
            let isLastNameValid = ValidationFunctions.nameValidation(ele,ele_val);

            if(isLastNameValid !== 'valid'){
                updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "invalid"})
            }else{
                updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "valid"})

            }
        }else if(ele === 'nickName'){
            let isNickNameValid = ValidationFunctions.nameValidation(ele,ele_val);

            if(isNickNameValid !== 'valid'){
                updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "invalid"})
            }else{
                updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "valid"})

            }
        }else if(ele === 'gender'){
            let isGenderValid = ValidationFunctions.requiredValidation(ele,ele_val);

            if(isGenderValid !== 'valid'){
                updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "invalid"})
            }else{
                updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "valid"})

            }
        }else if(ele === 'dob'){
            let isDobValid = ValidationFunctions.dobValidation("Date Of Birth",ele_val);

            if(isDobValid !== 'valid'){
                updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "invalid"})
            }else{
                updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "valid"})

            }
        }else if(ele === 'emailId'){
            let isEmailValid = ValidationFunctions.emailValidation(ele,ele_val);

            if(isEmailValid !== 'valid'){
                updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "invalid"})
            }else{
                updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "valid"})

            }
        }else if(ele === 'phoneNum'){
            let isPhoneNumValid = ValidationFunctions.phoneValidation(ele,ele_val);

            if(isPhoneNumValid !== 'valid'){
                updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "invalid"})
            }else{
                updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "valid"})

            }
        }else if(ele === 'state'){
            let isStateValid = ValidationFunctions.requiredValidation("State",ele_val);

            if(isStateValid !== 'valid'){
                updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "invalid"})
            }else{
                updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "valid"})

            }
        }else if(ele === 'city'){
            let isCityValid = ValidationFunctions.cityValidation(ele,ele_val);

            if(isCityValid !== 'valid'){
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "invalid"})
            }else{
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "optional"})

            }
        }else if(ele === 'pinCode'){
            let isPinCodeValid = ValidationFunctions.pinCodeValidation(ele,ele_val);

            if(isPinCodeValid !== 'valid'){
                updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "invalid"})
            }else{
                updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "optional"})

            }
        }

    }

    const onSubmitValidation = (data) => {
        let isfirstNameValid = ValidationFunctions.nameValidation("firstName",data.firstName);
        if(isfirstNameValid !== 'valid'){
            updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "invalid"})
        }else{
            updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "valid"})
        }

        let isLastNameValid  = ValidationFunctions.nameValidation("lastName",data.lastName);
        if(isLastNameValid !== 'valid'){
            updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "invalid"})
        }else{
            updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "valid"})
        }

        let isNickNameValid = ValidationFunctions.nameValidation("nickName",data.nickName);
        if(isNickNameValid !== 'valid'){
            updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "invalid"})
        }else{
            updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "valid"})
        }

        let isGenderValid = ValidationFunctions.requiredValidation("Gender",data.gender);
        if(isGenderValid !== 'valid'){
            updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "invalid"})
        }else{
            updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "valid"})

        }

        let isDobValid = ValidationFunctions.dobValidation("Date Of Birth",data.dob);
        if(isDobValid !== 'valid'){
            updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "invalid"})
        }else{
            updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "valid"})

        }
        
        let isEmailValid = ValidationFunctions.emailValidation("emailId",data.emailId);
        if(isEmailValid !== 'valid'){
            updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "invalid"})
        }else{
            updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "valid"})
        }

        let isPhoneNumValid = ValidationFunctions.phoneValidation("phoneNum",data.phoneNum);
        if(isPhoneNumValid !== 'valid'){
            updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "invalid"})
        }else{
            updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "valid"})
        }

        let isStateValid = ValidationFunctions.requiredValidation("State",data.state);
        if(isStateValid !== 'valid'){
            updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "invalid"})
        }else{
            updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "valid"})
        }

        let isCityValid = ValidationFunctions.cityValidation("city",data.city);
        if(isCityValid !== 'valid'){
            updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "invalid"})
        }else{
            updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "optional"})
        }

        let isPinCodeValid = ValidationFunctions.pinCodeValidation("pinCode",data.pinCode);
        if(isPinCodeValid !== 'valid'){
            updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "invalid"})
        }else{
            updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "optional"})
        }


        if(isfirstNameValid === 'valid' && isLastNameValid === 'valid' && isNickNameValid === 'valid' && isGenderValid === 'valid' && isDobValid === 'valid' && isEmailValid === 'valid' && isPhoneNumValid === 'valid' && isStateValid === 'valid' && isCityValid === 'valid' && isPinCodeValid === 'valid'){
            return true
        }else{
            return false
        }
    }

    const newUserFormSubmit = async(e) => {
        e.preventDefault();
        let validationFlag  = onSubmitValidation(newUserData);

        if(validationFlag){
            setLoadingMssg("Please wait !! submitting form...")
            const formData  = {
                firstname: newUserData.firstName,
                lastname: newUserData.lastName,
                nickname: newUserData.nickName,
                gender: newUserData.gender,
                dob: newUserData.dob,
                email: newUserData.emailId,
                phone: parseInt(newUserData.phoneNum),
                state: newUserData.state,
                city: newUserData.city,
                pincode: newUserData.pinCode,
                profileimg: dpImageLink
            };
            const formDataJsonString    =   JSON.stringify(formData);

            Swal.fire({
                title: 'Confirm to update',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                icon: 'warning'
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    updateApiCall()
                } else{
                    Swal.close();
                    setLoadingMssg("");
                }
            })

            const  updateApiCall = async ()=> {
                setLoadingMssg("");
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        body: formDataJsonString,
                        datatype: "JSON",
                        headers: { 'Content-Type': 'application/json' },
                    })
    
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const responseData = isJson && await response.json();

                    if(response.ok === true){
                        if(responseData.success === true){
                            localStorage.setItem("krishmish@regUserId", "krishmish@"+newUserData.emailId);
                            loadUserDataFunction(newUserData.emailId);
                            Swal.fire(
                                {
                                    title: "Great!!",
                                    text: "Successfully Updated",
                                    icon: "success"
                                }
                            ).then(
                                (result) =>{
                                    if (result.isConfirmed) {
                                        setTimeout(function(){
                                            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                        }, 300);
                                        document.querySelector("button.back-to-profile").click();
                                    }
                                }
                            )
                        }else{
                            Swal.fire(
                                {
                                    title: "Failed!",
                                    text: responseData.message,
                                    icon: "error"
                                }
                            )
                        }
                    }else{
                        Swal.fire(
                            {
                                title: "Oops...",
                                text: "Something went wrong !! Please try after sometimes.",
                                icon: "error"
                            }
                        )
                        const error = (responseData && responseData.message) || response.status;
                        return Promise.reject(error);
                    }
    
                }
                catch(error){
                    console.log("Something went wrong!! please try again later");
                }
            }

        }else{
            console.log("Invalid Form Fields");
        }

    }

    return (
        <div className="app-body">
            <div className="main-content" style={{marginTop:"61px"}}>
                <div id="userProfilePage">
                    <div className="profile-heading-section" id="myprofilepage">
                        <div className="dark-opacity">
                            <div className="profile-picture-section">
                                <img src={loadUserData.profileimg} className="profile-picture" alt="profile img"/>
                            </div>
                            <div className="user-name-section">
                                <h3 style={{color:"white", fontWeight:"600"}}>{loadUserData.firstname}&nbsp;{loadUserData.lastname}</h3>
                            </div>
                            <div className="profile-quicklinks-section">
                                <button className="profile-quicklinks"  data-bs-toggle="collapse" data-bs-target="#myWishList" onClick={scrollToWishList}>My Wishlist</button>
                                <button className="profile-quicklinks"  data-bs-toggle="collapse" data-bs-target="#orderHistory" onClick={scrollToOrderHistory}>Order History</button>
                                <button className="profile-quicklinks">Review</button>
                            </div>
                        </div>
                    </div>
                    <div className="container profile-accordion-container mt-3">
                        <div className="accordion" id="profileAccordation">
                            <div className="accordion-item profile-page-accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button open-profile-btn" type="button" data-bs-toggle="collapse" data-bs-target="#personalDetails" aria-expanded="true" aria-controls="personalDetails">
                                        Personal Details
                                    </button>
                                </h2>
                                <div id="personalDetails" className="accordion-collapse collapse show" data-bs-parent="#profileAccordation">
                                    <div className="accordion-body">

                                    <div id="profileFormSlide" className="carousel slide" data-bs-interval="false">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="edit-profile-btn-section">
                                                    <button className="btn btn-primary edit-profile-btn" type="button" data-bs-target="#profileFormSlide" data-bs-slide="next" onClick={enableEditBtn}>Edit Profile</button>
                                                </div>
                                                <div style={{marginTop:"15px"}}>
                                                    <div className="profile-data-row">
                                                        <div className="profile-label-section">
                                                            <p>Nick Name</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="profile-data-section">
                                                            {loadUserData.firstname} {loadUserData.lastname}
                                                        </div>
                                                    </div>
                                                    <div className="profile-data-row">
                                                        <div className="profile-label-section">
                                                            <p>Dob</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="profile-data-section">
                                                            {loadUserData.dob}
                                                        </div>
                                                    </div>
                                                    <div className="profile-data-row">
                                                        <div className="profile-label-section">
                                                            <p>Gender</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="profile-data-section">
                                                            {loadUserData.gender}
                                                        </div>
                                                    </div>
                                                    <div className="profile-data-row">
                                                        <div className="profile-label-section">
                                                            <p>Nick Name</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="profile-data-section">
                                                            {loadUserData.nickname}
                                                        </div>
                                                    </div>
                                                    <div className="profile-data-row">
                                                        <div className="profile-label-section">
                                                            <p>Phone No.</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="profile-data-section">
                                                            {loadUserData.phone}
                                                        </div>
                                                    </div>
                                                    <div className="profile-data-row">
                                                        <div className="profile-label-section">
                                                            <p>Email id</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="profile-data-section">
                                                            {loadUserData.email}
                                                        </div>
                                                    </div>
                                                    <div className="profile-data-row">
                                                        <div className="profile-label-section">
                                                            <p>Address</p>
                                                            <p>:</p>
                                                        </div>
                                                        <div className="profile-data-section">
                                                            {loadUserData.city ? loadUserData.city+", ":""} {loadUserData.state? loadUserData.state+", ":""} {loadUserData.pincode}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="cancel-update-btn" style={{textAlign:"right"}}>
                                                    <button className="btn btn-danger edit-profile-btn back-to-profile" type="button" data-bs-target="#profileFormSlide" data-bs-slide="prev">Cancel</button>
                                                </div>
                                                <form className="row g-3 needs-validation new-user-form" id="newUserForm" onSubmit={newUserFormSubmit}>
                                                    <div className="col-md-12 col-sm-12 new-form-field">
                                                        <label htmlFor="firstName" className="form-label">First name</label>
                                                        <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Enter your first name" value={newUserData.firstName} onChange={(e)=>handlenewUserInput(e)} form-valid={firstNameErr.isValid}/>
                                                        {
                                                            (firstNameErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {firstNameErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {firstNameErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                        <label htmlFor="lastName" className="form-label">Last name</label>
                                                        <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Enter your last name" value={newUserData.lastName} onChange={(e)=>handlenewUserInput(e)} form-valid={lastNameErr.isValid}/>
                                                        {
                                                            (lastNameErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {lastNameErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {lastNameErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                        <label htmlFor="nickName" className="form-label">Nick Name</label>
                                                        <input type="text" className="form-control" id="nickName" name="nickName" placeholder="Enter your nick name" value={newUserData.nickName} onChange={(e)=>handlenewUserInput(e)} form-valid={nickNameErr.isValid}/>
                                                        {
                                                            (nickNameErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {nickNameErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {nickNameErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                        <label htmlFor="dob" className="form-label">Date Of Birth</label>
                                                        <input type="date" className="form-control" id="dob" name="dob" value={newUserData.dob} onChange={(e)=>handlenewUserInput(e)} form-valid={dobErr.isValid} select-color={newUserData.dob === ''?'novalue':'withvalue'} maxLength={10}/>
                                                        {
                                                            (dobErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {dobErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {dobErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                    <label htmlFor="gender" className="form-label">Gender</label>
                                                        <select className="form-select" id="gender" name="gender" onChange={(e)=>handlenewUserInput(e)} form-valid={genderErr.isValid} value={newUserData.gender} select-color={newUserData.gender === ''?'novalue':'withvalue'}>
                                                            <option disabled value="">Select your gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                                        {
                                                            (genderErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {genderErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {genderErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                        <label htmlFor="phoneNum" className="form-label">Phone no.</label>
                                                        <input type="tel" className="form-control" id="phoneNum" name="phoneNum" placeholder="Enter your Phone no..." value={newUserData.phoneNum} onChange={(e)=>handlenewUserInput(e)} form-valid={phoneNumErr.isValid} maxLength="10"/>
                                                        {
                                                            (phoneNumErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {phoneNumErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {phoneNumErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                        <label htmlFor="emailId" className="form-label">Email</label>
                                                        <input type="text" className="form-control" id="emailId" name="emailId" placeholder="Enter your email..." value={newUserData.emailId} onChange={(e)=>handlenewUserInput(e)} form-valid={emailIdErr.isValid} disabled/>
                                                        {
                                                            (emailIdErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {emailIdErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {emailIdErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                        <label htmlFor="state" className="form-label">State</label>
                                                        <select className="form-select" id="state" name="state" value={newUserData.state} onChange={(e)=>handlenewUserInput(e)} form-valid={stateErr.isValid} select-color={newUserData.state === ''?'novalue':'withvalue'}>
                                                            <option value="" disabled>Choose your state</option>
                                                            {
                                                                Costant_Variables.states.map((data,index)=>{
                                                                    return(
                                                                        <option value={data} key={index}>{data}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        {
                                                            (stateErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {stateErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {stateErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 new-form-field">
                                                        <label htmlFor="city" className="form-label">City</label>
                                                        <input type="text" className="form-control" id="city" name="city" placeholder="Enter your city" value={newUserData.city} onChange={(e)=>handlenewUserInput(e)} form-valid={cityErr.isValid}/>
                                                        {
                                                            (cityErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {cityErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {cityErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 last-two-fields">
                                                        <label htmlFor="pinCode" className="form-label">Pin code</label>
                                                        <input type="text" className="form-control" id="pinCode" name="pinCode" placeholder="Enter your Pin code" value={newUserData.pinCode} onChange={(e)=>handlenewUserInput(e)} form-valid={pinCodeErr.isValid}/>
                                                        {
                                                            (pinCodeErr.err_mssg !== 'valid')?
                                                            <div className="invalid-feedback">
                                                                {pinCodeErr.err_mssg}
                                                            </div>
                                                            :
                                                            <div className="valid-feedback">
                                                                {pinCodeErr.err_mssg}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 last-two-fields">
                                                        <label htmlFor="profilePicture" className="form-label dp-label">Choose a profile picture</label>
                                                        <div className="dp-image-input-section">
                                                            <div className="choose-profile-images">
                                                                {
                                                                    Costant_Variables.dp_array.map((data,index)=>{
                                                                        return (
                                                                            <button className="dp-img-select-btn" id="dpImgBtn" onClick={chooseProfilePicture} value={data.img_link} key={index} data-active={(dpImageLink === data.img_link)?'true':'false'}>
                                                                                <img src={data.img_link} className="border-rounded" alt="Food Category" style={{width:"40px", height:"40px"}}/>
                                                                            </button>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div>
                                                                {/* <img src={dpImageLink} className="border-rounded top-pics-item-img" alt="Food Category"/> */}
                                                                <input type="text" className="form-control" id="pinCode" name="profilePicture" value={dpImageLink} placeholder="Choose your profile picture" disabled hidden/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 mt-5">
                                                        <button className="btn btn-primary update-data-btn" style={{width:"120px"}} type="submit">Update</button>
                                                        <p style={{fontWeight:"600"}} error-mssg-style="success">{loadingMssg}</p>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                        {/* <button className="carousel-control-prev" type="button" data-bs-target="#profileFormSlide" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button> */}
                                        {/* <button className="carousel-control-next" type="button" data-bs-target="#profileFormSlide" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button> */}
                                    </div>

                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item profile-page-accordion-item" id="wishListSection">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed open-wishlist-btn" type="button" id="wishlistBtn" data-bs-toggle="collapse" data-bs-target="#myWishList" aria-expanded="false" aria-controls="myWishList" onClick={scrollToWishList}>
                                        Favourite Dishes
                                    </button>
                                </h2>
                                <div id="myWishList" className="accordion-collapse collapse" data-bs-parent="#profileAccordation">
                                    <div className="accordion-body">
                                        <WishList addToCartFunction={addToCartFunction} favouriteItems={favouriteItems} addToFavourite={addToFavourite} showItems={6} parentClass={"profile-wishlist-section"}/>
                                        <div>
                                            <NavLink className="btn btn-primary" to="/myprofile/wishlist">View All</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item profile-page-accordion-item" id="orderHistorySection">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed order-history-btn" type="button" data-bs-toggle="collapse" data-bs-target="#orderHistory" aria-expanded="false" aria-controls="orderHistory" onClick={scrollToOrderHistory}>
                                        Order History
                                    </button>
                                </h2>
                                <div id="orderHistory" className="accordion-collapse collapse" data-bs-parent="#profileAccordation">
                                    <div className="accordion-body">
                                        <OrderHistory/>
                                    </div>
                                </div>
                            </div>
                            <div className="promo-banner-section mb-3">
                                <picture>
                                    <source media="(min-width:484px)" srcSet="https://img.perceptpixel.com/pykhlszs/combo-banner.webp"/>
                                    <source media="(max-width:483.98px)" srcSet="https://img.perceptpixel.com/pykhlszs/combo-mob-banner.webp"/>
                                    <img src="https://img.perceptpixel.com/pykhlszs/combo-mob-banner.webp" alt="combo banners" style={{width:"100%", height:"auto"}}/>
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
                <GoToTop/>
            </div>
        </div>
    )
}

export default MyProfile;