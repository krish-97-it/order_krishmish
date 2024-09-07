import React, {useState} from "react";
import Costant_Variables from "../controller/constant-variables";
import ValidationFunctions from "../controller/validation-functions"

const LoginForm = ({loadUserDataFunction})=> {

    const apiUrl        =   Costant_Variables.SERVER_BASE_URL+'/addNewUser';

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
    const [pinCodeErr, updatePinCodeErr]        = useState({});

    const [loadingMssg, setLoadingMssg]         = useState("");
    const [msgStyle, setMsgStyle]               = useState("success");

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
        console.log(data);
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

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formDataJsonString,
                    datatype: "JSON",
                    headers: { 'Content-Type': 'application/json' },
                })

                const isJson = response.headers.get('content-type')?.includes('application/json');
                const responseData = isJson && await response.json();
                console.log(responseData);
                if(response.ok === true){
                    if(responseData.success === true){
                        localStorage.setItem("krishmish@regUserId", "krishmish@"+newUserData.phoneNum);
                        loadUserDataFunction(newUserData.phoneNum);
                        setLoadingMssg("User Successfully Registered !!");
                        setMsgStyle("success");
                    }else{
                        setLoadingMssg(responseData.message);
                        setMsgStyle("error");
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

    return(
        <form className="row g-3 needs-validation new-user-form" id="newUserForm" onSubmit={newUserFormSubmit}>
            <div className="col-md-12 col-sm-12 new-form-field">
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
                <label htmlFor="emailId" className="form-label">Email</label>
                <input type="text" className="form-control" id="emailId" name="emailId" placeholder="Enter your email..." value={newUserData.emailId} onChange={(e)=>handlenewUserInput(e)} form-valid={emailIdErr.isValid}/>
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
                <button className="btn btn-primary" type="submit">Submit form</button>
                <p style={{fontWeight:"600"}} error-mssg-style={msgStyle}>{loadingMssg}</p>
            </div>
        </form>
    )
}

export default LoginForm