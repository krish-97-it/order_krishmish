import React, {useState} from "react";
import Costant_Variables from "../controller/constant-variables";
import ValidationFunctions from "../controller/validation-functions";
import Swal from "sweetalert2";
import axios from "axios";

const LoginForm = ({loadUserDataFunction})=> {

    const apiUrl            =   Costant_Variables.SERVER_BASE_URL+'/addNewUser';
    const sentOtpUrl        =   Costant_Variables.SERVER_BASE_URL+'/sendotp';
    const verifyOtpApiUrl   =   Costant_Variables.SERVER_BASE_URL+'/verifyotp';

    const [dpImageLink, setDpImageLink] = useState('https://img.perceptpixel.com/pykhlszs/default_dp.webp')
    const chooseProfilePicture = (event) =>{
        event.preventDefault();
        let ele_val= event.currentTarget.value;
        setDpImageLink(ele_val);
    } 

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
        district: '',
        pinCode: '',

    });

    const [firstNameErr, updateFirstNameErr]    = useState({});
    const [lastNameErr, updateLastNameErr]      = useState({});
    const [nickNameErr, updateNickNameErr]      = useState({});
    const [genderErr, updateGenderErr]          = useState({});
    const [dobErr, updateDobErr]                = useState({});
    const [emailIdErr, updateEmailIdErr]        = useState({});
    const [phoneNumErr, updatePhoneNumErr]      = useState({});
    const [stateErr, updateStateErr]            = useState({});
    const [cityErr, updateCityErr]              = useState({});
    const [districtErr, updateDistErr]          = useState({});
    const [pinCodeErr, updatePinCodeErr]        = useState({});

    const [loadingMssg, setLoadingMssg]         = useState("");
    const [msgStyle, setMsgStyle]               = useState("success");

    const [isEmailVerified, setValidEmailId]    = useState("false");
    let [seconds, setSeconds]                   = useState(59);

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
            setValidEmailId("false");
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
                let dist = "district";
                setNewUserData({...newUserData, [ele] : ele_val, [dist]:''});

            }
        }else if(ele === 'city'){
            let isCityValid = ValidationFunctions.cityValidation(ele,ele_val,true);

            if(isCityValid !== 'valid'){
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "invalid"})
            }else{
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "optional"})

            }
        }else if(ele === 'district'){
            let isDistrictValid = ValidationFunctions.requiredValidation("District",ele_val);

            if(isDistrictValid !== 'valid'){
                updateDistErr({...districtErr, err_mssg: isDistrictValid, isValid: "invalid"})
            }else{
                updateDistErr({...districtErr, err_mssg: isDistrictValid, isValid: "valid"})

            }
        }else if(ele === 'pinCode'){
            let isPinCodeValid = ValidationFunctions.pinCodeValidation(ele,ele_val,true);

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
        }else if(isEmailVerified === 'false'){
            updateEmailIdErr({...emailIdErr, err_mssg: "Email is not verified", isValid: "invalid"})
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

        let isDistrictValid = ValidationFunctions.requiredValidation("District",data.district);
        if(isDistrictValid !== 'valid'){
            updateDistErr({...districtErr, err_mssg: isDistrictValid, isValid: "invalid"})
        }else{
            updateDistErr({...districtErr, err_mssg: isDistrictValid, isValid: "valid"})
        }

        let isCityValid = ValidationFunctions.cityValidation("city",data.city);
        if(isCityValid !== 'valid'){
            updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "invalid"})
        }else{
            updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "optional"})
        }

        let isPinCodeValid = ValidationFunctions.pinCodeValidation("pinCode",data.pinCode,false);
        if(isPinCodeValid !== 'valid'){
            updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "invalid"})
        }else{
            updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "optional"})
        }


        if(isfirstNameValid === 'valid' && isLastNameValid === 'valid' && isNickNameValid === 'valid' && isGenderValid === 'valid' && isDobValid === 'valid' && (isEmailValid === 'valid' && isEmailVerified === 'true') && isPhoneNumValid === 'valid' && isStateValid === 'valid' && isDistrictValid === 'valid' && isCityValid === 'valid' && isPinCodeValid === 'valid'){
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
                district: newUserData.district,
                pincode: newUserData.pinCode,
                profileimg: dpImageLink
            };
            const formDataJsonString    =   JSON.stringify(formData);

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
                        setLoadingMssg("");
                        Swal.fire(
                            {
                                title: "Success!",
                                text: "User Successfully Registered",
                                icon: "success"
                            }
                        ).then(
                            (result) =>{
                                if (result.isConfirmed) {
                                    localStorage.setItem("krishmish@regUserId", "krishmish@"+newUserData.emailId);
                                    loadUserDataFunction(newUserData.emailId);
                                }
                            }
                        )
                    }else{
                        setLoadingMssg("");
                        Swal.fire(
                            {
                                title: "Failed!",
                                text: "User Registration Failed",
                                icon: "error"
                            }
                        )
                    }
                }else{
                    setLoadingMssg("Something went wrong !! Please try after sometimes...");
                    setMsgStyle("error");
                    const error = (responseData && responseData.message) || response.status;
                    return Promise.reject(error);
                }

            }
            catch(error){
                console.log("Something went wrong!! please try again later");
            }

        }else{
            console.log("Invalid Form Fields");
        }

    }

    const [otpBox, setOtpBox]        = useState('hide');
    const [otpInput, setotpInput]    = useState('');
    function otpInputChange(e){
        let ele_val     =   e.target.value;
        setotpInput(ele_val);
    }

    const generateMobileOtp = async (e)=>{
        e.preventDefault();
        const formData      = {
            email     : newUserData.emailId,
            usertype  : 'new-user'
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }

        let isEmailValid = ValidationFunctions.emailValidation("Email id", newUserData.emailId);
        if(isEmailValid === 'valid'){
            updateEmailIdErr({...emailIdErr, err_mssg: "Sending OTP...", isValid: "valid"});
            document.getElementById("newUserGetOtpBtn").disabled = true;
            await axios.post(sentOtpUrl, formData, {config}).then(
                (response) => {
                    if(response.data.success === true){
                        updateEmailIdErr({...emailIdErr, err_mssg: "OTP is sent to the given email id", isValid: "valid"});
                        let resendTimer = setInterval(function(){
                            let time = seconds--;
                            if(time > 0){
                                setSeconds(time);
                            }else{
                                clearInterval(resendTimer);
                                setSeconds(59);
                            }
                        }, 1000);
                        setOtpBox('show');
                        setResendButton();
                    }else{
                        updateEmailIdErr({...emailIdErr, err_mssg: "", isValid: "invalid"});
                        setOtpBox('hide');
                        document.getElementById("newUserGetOtpBtn").disabled = false;
                        Swal.fire(
                            {
                                title: "Failed!",
                                text: response.data.message,
                                icon: "error"
                            }
                        )
                    }
                }
            ).catch(error => {
                // console.log(error);
                updateEmailIdErr({...emailIdErr, err_mssg: "Something Went wrong!", isValid: "invalid"});
                document.getElementById("newUserGetOtpBtn").disabled = false;
            });

        }else{
            document.getElementById("getOtpBtn").disabled = false;
            updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "invalid"})
        }
        console.log(emailIdErr.isValid);
    }

    const verifyEmailOtp = (e) => {
        e.preventDefault();
        if(otpInput.length >= 4){
            let isEmailValid = ValidationFunctions.emailValidation("Email id",newUserData.emailId);
            const formData      = {
                email : newUserData.emailId,
                otp   : parseInt(otpInput)    
            }
            const config = {
                headers: { 'Content-Type': 'application/json'}
            }
        
            if(isEmailValid === 'valid'){
                updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "valid"})
                axios.post(verifyOtpApiUrl, formData, {config}).then(
                    (response) => {
                        if(response.data.success === true){
                            setValidEmailId('true');
                            setOtpBox('hide');
                            setResendOtpTxt('hide');
                            updateEmailIdErr({...emailIdErr, err_mssg: "OTP verfied Successfully!", isValid: "valid"})
                        }else{
                            updateEmailIdErr({...emailIdErr, err_mssg: "OTP Verification Failed!", isValid: "invalid"})
                        }
                    }
                ).catch(error => {
                    console.log(error);
                });
            }else{
                updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "invalid"})
            }
        }
    }

    const [resendOtpTxt, setResendOtpTxt]  = useState("");
    function setResendButton() {
        setResendOtpTxt("show");
        let ele = document.getElementById("newUserGetOtpBtn");
        setTimeout(function() {
            setResendOtpTxt("hide");
            ele.disabled = false;
        }, 59000);
    }

    function checkEnterPress(event){
        console.log(event.keyCode);
        if (event.keyCode === 13) {
            // Prevent the default action
            event.preventDefault();
            verifyEmailOtp(event);
        }        
    }

    return(
        <form className="row g-3 needs-validation new-user-form" id="newUserForm" onSubmit={newUserFormSubmit}>
            <div className="col-md-12 col-sm-12 new-form-field">
                <label htmlFor="firstName" className="form-label">First name<span style={{color:"red"}}>*</span></label>
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
                <label htmlFor="lastName" className="form-label">Last name<span style={{color:"red"}}>*</span></label>
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
                <label htmlFor="nickName" className="form-label">Nick Name<span style={{color:"red"}}>*</span></label>
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
                <label htmlFor="dob" className="form-label">Date Of Birth<span style={{color:"red"}}>*</span></label>
                <input type="date" className="form-control" id="dob" name="dob" onChange={(e)=>handlenewUserInput(e)} form-valid={dobErr.isValid} select-color={newUserData.dob === ''?'novalue':'withvalue'}maxLength={10}/>
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
            <label htmlFor="gender" className="form-label">Gender<span style={{color:"red"}}>*</span></label>
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
            <div className="col-md-6 col-sm-12 new-form-field" style={{position:"relative"}}>
                <label htmlFor="emailId" className="form-label">Email<span style={{color:"red"}}>*</span></label>
                <input type="text" className="form-control" id="emailId" name="emailId" placeholder="Enter your email..." value={newUserData.emailId} onChange={(e)=>handlenewUserInput(e)} form-valid={emailIdErr.isValid} style={{paddingRight:"85px"}}/>
                <button className="btn btn-success new-user-get-otp-btn" id="newUserGetOtpBtn" type="submit" onClick={generateMobileOtp}>Get OTP</button>
                {
                    (emailIdErr.isValid === "invalid")?
                    <div className="invalid-feedback">
                        {emailIdErr.err_mssg}
                    </div>
                    :
                    <div className="valid-feedback email-id-valid-feedback">
                        {
                            (emailIdErr.err_mssg !== 'valid')? emailIdErr.err_mssg : ''
                        }
                    </div>
                }
                <div className="otp-box-section" new-user-show-otp-box={otpBox} style={{marginTop:"5px", padding:"0px", flexDirection:"row" }}>
                    <div className="" style={{textAlign:"left"}}>
                        <input className="input" type="text" inputMode="numeric" maxLength="4" name="otpInput" id="otpInput" style={{width:"70px", padding:"2px 10px", textAlign:"left"}} value={otpInput} onInput={otpInputChange} onKeyDown={checkEnterPress} />
                    </div>
                    <div style={{textAlign:"left", marginLeft:"-2px"}}>
                        <button className="btn btn-primary verify-otp-btn" type="submit" style={{width:"70px", borderRadius:"0px 2px 18px 0px", padding:"3px"}} onClick={verifyEmailOtp}>Verify</button>
                    </div>
                </div>
                <span style={{textAlign:"left", fontSize:"12px"}} new-user-show-otp-box={otpBox} error-mssg-style="error" new-user-resend-otp-text={resendOtpTxt}>Resend OTP in {seconds} sec...</span>
            </div>
            <div className="col-md-6 col-sm-12 new-form-field">
                <label htmlFor="phoneNum" className="form-label">Phone no.<span style={{color:"red"}}>*</span></label>
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
                <label htmlFor="state" className="form-label">State<span style={{color:"red"}}>*</span></label>
                <select className="form-select" id="state" name="state" value={newUserData.state} onChange={(e)=>handlenewUserInput(e)} form-valid={stateErr.isValid} select-color={newUserData.state === ''?'novalue':'withvalue'}>
                    <option value="" disabled>Choose your state</option>
                    {
                        Costant_Variables.states_districts.map((data,index)=>{
                            return(
                                <option value={data.state} key={index}>{data.state}</option>
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
                <label htmlFor="district" className="form-label">District<span style={{color:"red"}}>*</span></label>
                <select className="form-select" id="district" name="district" value={newUserData.district} onChange={(e)=>handlenewUserInput(e)} form-valid={districtErr.isValid} select-color={newUserData.district === ''?'novalue':'withvalue'}>
                    <option value="" disabled>Choose your district</option>
                    {
                        Costant_Variables.states_districts.map((data)=>
                            (data.state === newUserData.state)?
                            data.districts.map((d,i)=>{
                             return(
                                <option value={d} key={i}>{d}</option>
                             )
                            })
                            :
                            <></>
                        )
                    }
                </select>
                {
                    (districtErr.err_mssg !== 'valid')?
                    <div className="invalid-feedback">
                        {districtErr.err_mssg}
                    </div>
                    :
                    <div className="valid-feedback">
                        {districtErr.err_mssg}
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
                <input type="text" className="form-control" id="pinCode" name="pinCode" placeholder="Enter your Pin code" maxLength={6} value={newUserData.pinCode} onChange={(e)=>handlenewUserInput(e)} form-valid={pinCodeErr.isValid}/>
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
            <div className="col-sm-12 check-term-condition">
                <div className="form-check">
                    <div className="agree-check-form">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                        <label className="form-check-label" htmlFor="invalidCheck">
                            Agree to terms and conditions
                        </label>
                    </div>
                    {/* <div className="invalid-feedback">
                        You must agree before submitting.
                    </div> */}
                </div>
            </div>
            <div className="col-sm-12">
                <button className="btn btn-primary new-user-form-submit" type="submit">Submit form</button>
                <p style={{fontWeight:"600"}} error-mssg-style={msgStyle}>{loadingMssg}</p>
            </div>
        </form>
    )
}

export default LoginForm