import React,{useState} from "react";
import axios from "axios";

export default function LoginModal({showLoginModal, closeModal, formNextSlide, formPrevSlide, displayFirstSlide, displaySecondSlide, loadUserDataFunction, loadUserData }){
    let states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"
    ];

    const [phoneNumber, setPhoneNumber] = useState('');
    function handlePhoneNumberChange(e){
        setPhoneNumber(e.target.value);
    }
    
    const checkPhoneNumber = (e) => {
        e.preventDefault();
        loadUserDataFunction(phoneNumber);
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

    const handlenewUserInput = (e) => {
        let ele         =   e.target.name;
        let ele_val     =   e.target.value;
        setNewUserData({...newUserData, [ele]:[ele_val]});

        if(ele === 'firstName'){
            let isfirstNameValid = nameValidation(ele,ele_val);

            if(isfirstNameValid !== 'valid'){
                updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "invalid"})
            }else{
                updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "valid"})

            }
        }else if(ele === 'lastName'){
            let isLastNameValid = nameValidation(ele,ele_val);

            if(isLastNameValid !== 'valid'){
                updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "invalid"})
            }else{
                updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "valid"})

            }
        }else if(ele === 'nickName'){
            let isNickNameValid = nameValidation(ele,ele_val);

            if(isNickNameValid !== 'valid'){
                updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "invalid"})
            }else{
                updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "valid"})

            }
        }else if(ele === 'gender'){
            let isGenderValid = requiredValidation(ele,ele_val);

            if(isGenderValid !== 'valid'){
                updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "invalid"})
            }else{
                updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "valid"})

            }
        }else if(ele === 'dob'){
            let isDobValid = dobValidation("Date Of Birth",ele_val);

            if(isDobValid !== 'valid'){
                updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "invalid"})
            }else{
                updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "valid"})

            }
        }else if(ele === 'emailId'){
            let isEmailValid = emailValidation(ele,ele_val);

            if(isEmailValid !== 'valid'){
                updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "invalid"})
            }else{
                updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "valid"})

            }
        }else if(ele === 'phoneNum'){
            let isPhoneNumValid = phoneValidation(ele,ele_val);

            if(isPhoneNumValid !== 'valid'){
                updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "invalid"})
            }else{
                updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "valid"})

            }
        }else if(ele === 'state'){
            let isStateValid = requiredValidation("State",ele_val);

            if(isStateValid !== 'valid'){
                updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "invalid"})
            }else{
                updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "valid"})

            }
        }else if(ele === 'city'){
            let isCityValid = cityValidation(ele,ele_val);

            if(isCityValid !== 'valid'){
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "invalid"})
            }else{
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "optional"})

            }
        }else if(ele === 'pinCode'){
            let isPinCodeValid = pinCodeValidation(ele,ele_val);

            if(isPinCodeValid !== 'valid'){
                updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "invalid"})
            }else{
                updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "optional"})

            }
        }

    }

    const onSubmitValidation = (data) => {
        let isfirstNameValid = nameValidation("firstName",data.firstName[0]);
        if(isfirstNameValid !== 'valid'){
            updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "invalid"})
        }else{
            updateFirstNameErr({...firstNameErr, err_mssg: isfirstNameValid, isValid: "valid"})
        }

        let isLastNameValid  = nameValidation("lastName",data.lastName[0]);
        if(isLastNameValid !== 'valid'){
            updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "invalid"})
        }else{
            updateLastNameErr({...lastNameErr, err_mssg: isLastNameValid, isValid: "valid"})
        }

        let isNickNameValid = nameValidation("nickName",data.nickName[0]);
        if(isNickNameValid !== 'valid'){
            updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "invalid"})
        }else{
            updateNickNameErr({...nickNameErr, err_mssg: isNickNameValid, isValid: "valid"})
        }

        let isGenderValid = requiredValidation("Gender",data.gender[0]);
        if(isGenderValid !== 'valid'){
            updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "invalid"})
        }else{
            updateGenderErr({...genderErr, err_mssg: isGenderValid, isValid: "valid"})

        }

        let isDobValid = dobValidation("Date Of Birth",data.dob[0]);
        if(isDobValid !== 'valid'){
            updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "invalid"})
        }else{
            updateDobErr({...dobErr, err_mssg: isDobValid, isValid: "valid"})

        }
        
        let isEmailValid = emailValidation("emailId",data.emailId[0]);
        if(isEmailValid !== 'valid'){
            updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "invalid"})
        }else{
            updateEmailIdErr({...emailIdErr, err_mssg: isEmailValid, isValid: "valid"})
        }

        let isPhoneNumValid = phoneValidation("phoneNum",data.phoneNum[0]);
        if(isPhoneNumValid !== 'valid'){
            updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "invalid"})
        }else{
            updatePhoneNumErr({...phoneNumErr, err_mssg: isPhoneNumValid, isValid: "valid"})
        }

        let isStateValid = requiredValidation("State",data.state[0]);
        if(isStateValid !== 'valid'){
            updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "invalid"})
        }else{
            updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "valid"})
        }

        let isCityValid = cityValidation("city",data.city[0]);
        if(isCityValid !== 'valid'){
            updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "invalid"})
        }else{
            updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "optional"})
        }

        let isPinCodeValid = pinCodeValidation("pinCode",data.pinCode[0]);
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
        let validationFlag = onSubmitValidation(newUserData);

        if(validationFlag){
            const formData = {
                firstname: newUserData.firstName[0],
                lastname: newUserData.lastName[0],
                nickname: newUserData.nickName[0],
                gender: newUserData.gender[0],
                dob: newUserData.dob[0],
                email: newUserData.emailId[0],
                phone: parseInt(newUserData.phoneNum[0]),
                state: newUserData.state[0],
                city: newUserData.city[0],
                pincode: newUserData.pinCode[0], 
            };
            const formDataJsonString    =   JSON.stringify(formData);

            try {
                const response = await fetch('http://localhost:4000/addNewUser', {
                    method: 'POST',
                    body: formDataJsonString,
                    datatype: "JSON",
                    headers: { 'Content-Type': 'application/json' },
                })

                const isJson = response.headers.get('content-type')?.includes('application/json');
                const responseData = isJson && await response.json();

                if(response.ok == true){
                    localStorage.setItem("krishmish@regUserId", "krishmish@"+newUserData.phoneNum[0]);
                    loadUserDataFunction(newUserData.phoneNum[0]);
                }else{
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

    function nameValidation(ele,val){
        let ele_name = (ele === 'firstName') ? "First name" : "Last Name";
        ele_name     = (ele === 'nickName') ? "Nick Name": ele_name;
        let reg_exp  = /^[a-zA-Z][a-zA-Z\-\ \.]{2,}$/i;

        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg    =   ele_name+" is required";
            return err_mssg;
        }else if(val.length <= 2){
            let err_mssg = ele_name+" should be minimum 3 characters.";
            return err_mssg;
        }else if(!reg_exp.test(val)){
            let err_mssg = 'Accepts Alphabels Only';
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }

    function emailValidation(ele,val){
        var reg_exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,13}))$/;
        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg    =   "Email-Id is required";
            return err_mssg;
        }else if(!reg_exp.test(val)){
            let err_mssg    =   "Email-id is not valid";
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }
    function phoneValidation(ele,val){
        let reg_exp  = /^\d{10}$/;

        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg    =   "Mobile No is required";
            return err_mssg;
        }else if(!reg_exp.test(val)){
            let err_mssg = 'Mobile No. should be 10 digits.';
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }
    function dobValidation(ele,val){
        let currentDate =  new Date();
        let currentYear =  currentDate.getFullYear();
        let birthDate   =  new Date(val);
        let birthYear   =  birthDate.getFullYear();

        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg    =   ele+" is required";
            return err_mssg;
        }else if(birthYear > currentYear) {
            let err_mssg    =   "Future date is not allowed";
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }

    function requiredValidation(ele,val){
        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg = ele+" is required";
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }

    function cityValidation(ele,val){
        let reg_exp  = /^[a-zA-Z][a-zA-Z\-\ \.]{0,}$/i;

        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg = 'valid';
            return err_mssg;
        }else if(!reg_exp.test(val)){
            let err_mssg = 'Accepts Alphabels Only';
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }
    function pinCodeValidation(ele,val){
        let reg_exp  = /^\d{0,}$/;

        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg = 'valid';
            return err_mssg;
        }else if(!reg_exp.test(val)){
            let err_mssg = 'Pin code should be digits.';
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }

    return(
        <div className="login-modal" id="loginModal" show-modal={showLoginModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="form-slide-one" slide-display={displayFirstSlide}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Log In</h1>
                            <button type="button" className="login-modal-close" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body" style={{display:"flex", justifyContent:"center"}}>
                            <form className="row g-3 needs-validation old-user-form">
                                <div className="col-sm-12">
                                    <input type="phone" className="form-control" id="phoneNumberOne" placeholder="Enter your Mobile Number" value={phoneNumber} onChange={handlePhoneNumberChange} required/>
                                    <div className="valid-feedback">
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button className="btn btn-primary" type="submit" style={{width:"200px"}} onClick={checkPhoneNumber}>Get OTP</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button> */}
                            <p>New User Login?&nbsp;</p>
                            <button type="button" className="btn btn-primary new-user-reg-btn" onClick={formNextSlide}>Create a new account</button>
                        </div>
                    </div>
                    <div className="form-slide-two" slide-display={displaySecondSlide}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New User</h1>
                            <button type="button" className="login-modal-close" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body">
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
                                <div className="col-md-12 col-sm-12 new-form-field">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select className="form-select" id="state" name="state" value={newUserData.state} onChange={(e)=>handlenewUserInput(e)} form-valid={stateErr.isValid} select-color={newUserData.state === ''?'novalue':'withvalue'}>
                                        <option value="" disabled>Choose your state</option>
                                        {
                                            states.map((data,index)=>{
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
                                <div className="col-md-6 col-sm-12">
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
                                <div className="col-sm-12">
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
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button> */}
                            <p>Existing User?&nbsp;</p>
                            <button type="button" className="btn btn-primary old-user-login-btn" onClick={formPrevSlide}>Log in now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
}