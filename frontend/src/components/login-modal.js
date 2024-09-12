import React, {useState} from "react";
import Costant_Variables from "../controller/constant-variables";
import ValidationFunctions from "../controller/validation-functions"
import NewLoginForm from "../components/user-login-form";
import Swal from 'sweetalert2';
import axios from "axios";

export default function LoginModal({showLoginModal, closeModal, formNextSlide, formPrevSlide, displayFirstSlide, displaySecondSlide, loadUserDataFunction, loadUserData, loginErrMssg, userEmailId }){

    const [emailId, updateEmailId]              = useState(userEmailId);
    const [loginEmailErr, updateLoginEmailErr]  = useState({});
    const [otpBox, setOtpBox]                   = useState('hide');
    const [otp1, setOtp1]                       = useState('');
    const [otp2, setOtp2]                       = useState('');
    const [otp3, setOtp3]                       = useState('');
    const [otp4, setOtp4]                       = useState('');

    const sendOtpApiUrl                         = Costant_Variables.SERVER_BASE_URL+'/sendotp';
    const verifyOtpApiUrl                       = Costant_Variables.SERVER_BASE_URL+'/verifyotp';

    const [resendOtpTxt, setResendOtpTxt]       = useState("");
    let [seconds, setSeconds]                   = useState(59);

    function otpInputChange(e){
        let ele_val     =   e.target.value;
        let ele_name    =   e.target.name; 

        if (ele_val.match(/^\d{0,1}$/)){
            if(ele_name === 'otp1'){
                setOtp1(ele_val);
                let nextfield = document.getElementById("otp2");
                if(ele_val !== ''){
                    nextfield.focus();
                }
            }else if(ele_name === 'otp2'){
                setOtp2(ele_val);
                let nextfield = document.getElementById("otp3");
                let prevfield = document.getElementById("otp1");
                if(ele_val !== ''){
                    nextfield.focus();
                }else{
                    prevfield.focus();
                }
            }else if(ele_name === 'otp3'){
                setOtp3(ele_val);
                let nextfield = document.getElementById("otp4");
                let prevfield = document.getElementById("otp2");
                if(ele_val !== ''){
                    nextfield.focus();
                }else{
                    prevfield.focus();
                }
            }else if(ele_name === 'otp4'){
                setOtp4(ele_val);
                let prevfield = document.getElementById("otp3");
                if(ele_val === ''){
                    prevfield.focus();
                }
            }
        }
    }
    function handleEmailIdChange(e){
        const email_id      =   e.target.value;
        updateEmailId(email_id);

        let isLoginNumValid = ValidationFunctions.emailValidation("Email id",email_id);

        if(isLoginNumValid !== 'valid'){
            updateLoginEmailErr({...loginEmailErr, err_mssg: isLoginNumValid, isValid: "invalid"})
        }else{
            updateLoginEmailErr({...loginEmailErr, err_mssg: isLoginNumValid, isValid: "valid"})

        }
    }

    const verifyEmailOtp = (e) => {
        e.preventDefault();
        const joinOtps = (otp1 + otp2 + otp3 + otp4);
        if(joinOtps.length >= 4){
            let loginEmailValidation = ValidationFunctions.emailValidation("Email id",emailId);
            const formData      = {
                email : emailId,
                otp   : parseInt(joinOtps)    
            }
            const config = {
                headers: { 'Content-Type': 'application/json'}
            }
        
            if(loginEmailValidation === 'valid'){
                updateLoginEmailErr({...loginEmailErr, err_mssg: loginEmailValidation, isValid: "valid"});
                axios.post(verifyOtpApiUrl, formData, {config}).then(
                    (response) => {
                        if(response.data.success === true){
                            loadUserDataFunction(emailId);
                            updateLoginEmailErr({...loginEmailErr, err_mssg: "OTP verfied Successfully!", isValid: "valid"})
                            Swal.fire(
                                {
                                    title: "Welcome Back!",
                                    text: "Successfully Logged in",
                                    icon: "success"
                                }
                            )
                        }else{
                            updateLoginEmailErr({...loginEmailErr, err_mssg: "", isValid: "invalid"})
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
                    console.log(error);
                });
            }else{
                updateLoginEmailErr({...loginEmailErr, err_mssg: loginEmailValidation, isValid: "invalid"})
            }
        }else{
            Swal.fire(
                {
                    title: "Failed!",
                    text: "OTP should be in 4 digits",
                    icon: "error"
                }
            )
        }
    }

    const generateMobileOtp = async (e)=>{
        e.preventDefault();
        const formData      = {
            email    : emailId,
            usertype : 'existing-user',
        }
        const config = {
            headers: { 'Content-Type': 'application/json'}
        }

        let loginEmailValidation = ValidationFunctions.emailValidation("Email id",emailId);
        if(loginEmailValidation === 'valid'){
            updateLoginEmailErr({...loginEmailErr, err_mssg: "Sending OTP...", isValid: "valid"});
            document.getElementById("getOtpBtn").disabled = true;
            await axios.post(sendOtpApiUrl, formData, {config}).then(
                (response) => {
                    if(response.data.success === true){
                        updateLoginEmailErr({...loginEmailErr, err_mssg: "OTP is sent to the given email id", isValid: "valid"});
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
                        setResendButton()
                    }else{
                        updateLoginEmailErr({...loginEmailErr, err_mssg: "", isValid: "invalid"});
                        setOtpBox('hide');
                        document.getElementById("getOtpBtn").disabled = false;
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
                console.log(error);
            });

        }else{
            document.getElementById("getOtpBtn").disabled = false;
            updateLoginEmailErr({...loginEmailErr, err_mssg: loginEmailValidation, isValid: "invalid"})
        }
    }

    function setResendButton() {
        setResendOtpTxt("show");
        let ele = document.getElementById("getOtpBtn");
        // ele.disabled = true;
        setTimeout(function() {
            setResendOtpTxt("hide");
            ele.disabled = false;
        }, 59000);
    }

    function checkEnterPress(event){
        if (event.keyCode === 13) {
            // Prevent the default action
            event.preventDefault();
            verifyEmailOtp(event);
        }        
    }

    return(
        <div className="login-modal" id="loginModal" show-modal={showLoginModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="form-slide-one" slide-display={displayFirstSlide}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Sign In / Sign Up</h1>
                            <button type="button" className="login-modal-close" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body" style={{display:"flex", justifyContent:"center"}}>
                            <form className="row g-3 needs-validation old-user-form">
                                <div className="col-sm-12" style={{marginTop:"0px", padding:"0px"}}>
                                    <h6 style={{textAlign:"left", marginBottom:"5px", fontWeight:"400"}}>Email Id<span style={{color:"red"}}>*</span></h6>
                                    <div style={{display:"flex", marginTop:"0px"}}>
                                        <div style={{width:"100%"}}>
                                            <input type="text" className="form-control email-login-input" id="emailId" name="emailId" placeholder="Your registered email..." value={emailId} onChange={(e)=>handleEmailIdChange(e)} form-valid={loginEmailErr.isValid}/>
                                        </div>
                                        <button className="btn btn-success get-otp-btn" id="getOtpBtn" type="submit" onClick={generateMobileOtp}>Get OTP</button>
                                    </div>
                                    {

                                        (loginEmailErr.isValid === "invalid")?
                                        <div className="invalid-feedback">
                                            {loginEmailErr.err_mssg}
                                        </div>
                                        :
                                        <div className="valid-feedback email-id-valid-feedback">
                                            {
                                                (loginEmailErr.err_mssg !== 'valid')? loginEmailErr.err_mssg : ''
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-12 otp-box-section" show-otp-box={otpBox} style={{padding:"0px"}}>
                                    <h6 style={{textAlign:"left", marginBottom:"5px", fontWeight:"400"}}>Otp<span style={{color:"red"}}>*</span></h6>   
                                    <div className="otp-input-box">
                                        <input className="input" type="text" inputMode="numeric" maxLength="1" name="otp1" id="otp1" value={otp1} onInput={otpInputChange} onKeyDown={checkEnterPress} />
                                        <input className="input" type="text" inputMode="numeric" maxLength="1" name="otp2" id="otp2" value={otp2} onInput={otpInputChange} onKeyDown={checkEnterPress}/>
                                        <input className="input" type="text" inputMode="numeric" maxLength="1" name="otp3" id="otp3" value={otp3} onInput={otpInputChange} onKeyDown={checkEnterPress}/>
                                        <input className="input" type="text" inputMode="numeric" maxLength="1" name="otp4" id="otp4" value={otp4} onInput={otpInputChange} onKeyDown={checkEnterPress}/>
                                    </div>
                                    <p style={{fontWeight:"500", fontSize:"14px", textAlign:"left", marginBottom:"0px"}} error-mssg-style="error" resend-otp-text={resendOtpTxt}>Resend OTP in {seconds} sec...</p>
                                    <button className="btn btn-primary verify-otp-btn" type="submit" style={{width:"120px", marginTop:"24px"}} onClick={verifyEmailOtp}>Log In</button>
                                </div>
                                <div className="col-sm-12" style={{textAlign:"left", padding:"10px 15px"}}>
                                    {
                                        (loginErrMssg !== '')?
                                            <p className="login-err-mssg">{loginErrMssg}</p>
                                        :
                                        <></>
                                    }
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button> */}
                            <p className="modal-footer-p">New User?&nbsp;</p>
                            <button type="button" className="btn btn-primary new-user-reg-btn" onClick={formNextSlide}>Create a new account</button>
                        </div>
                    </div>
                    <div className="form-slide-two" slide-display={displaySecondSlide}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New User</h1>
                            <button type="button" className="login-modal-close" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body">
                            <NewLoginForm loadUserDataFunction={loadUserDataFunction} generateMobileOtp={generateMobileOtp}/>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button> */}
                            <p className="modal-footer-p">Existing User?&nbsp;</p>
                            <button type="button" className="btn btn-primary old-user-login-btn" onClick={formPrevSlide}>Log in now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
}