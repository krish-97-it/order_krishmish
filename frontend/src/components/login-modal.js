import React,{useState} from "react";
import ValidationFunctions from "../controller/validation-functions"
import NewLoginForm from "../components/user-login-form";

export default function LoginModal({showLoginModal, closeModal, formNextSlide, formPrevSlide, displayFirstSlide, displaySecondSlide, loadUserDataFunction, loadUserData, loginErrMssg, userMobNumber }){

    const [phoneNumber, setPhoneNumber]     = useState(userMobNumber);
    const [loginNumErr, updateloginNumErr]  = useState({});
    const [otpBox, setOtpBox]               = useState('hide');
    const [otp1, setOtp1]                   = useState();
    const [otp2, setOtp2]                   = useState();
    const [otp3, setOtp3]                   = useState();
    const [otp4, setOtp4]                   = useState();

    function otpInputChange(e){
        let ele_val     =   e.target.value;
        let ele_name    =   e.target.name;  
        if(ele_val.length < 2){
            if(ele_name === 'otp1'){
                setOtp1(ele_val);
            }else if(ele_name === 'otp2'){
                setOtp2(ele_val);
            }else if(ele_name === 'otp3'){
                setOtp3(ele_val);
            }else if(ele_name === 'otp4'){
                setOtp4(ele_val);
            }
        }
    }
    function handlePhoneNumberChange(e){
        const loginNum  =   e.target.value;
        setPhoneNumber(loginNum);
        let isLoginNumValid = ValidationFunctions.phoneValidation("Mobile No.",loginNum);

        if(isLoginNumValid !== 'valid'){
            updateloginNumErr({...loginNumErr, err_mssg: isLoginNumValid, isValid: "invalid"})
        }else{
            updateloginNumErr({...loginNumErr, err_mssg: isLoginNumValid, isValid: "valid"})

        }
    }
    
    const checkPhoneNumber = (e) => {
        e.preventDefault();
        let loginNumValidation = ValidationFunctions.phoneValidation("Mobile No.",phoneNumber);
        if(loginNumValidation === 'valid'){
            updateloginNumErr({...loginNumErr, err_mssg: loginNumValidation, isValid: "valid"})
            loadUserDataFunction(phoneNumber);
        }else{
            updateloginNumErr({...loginNumErr, err_mssg: loginNumValidation, isValid: "invalid"})
        }


        // let isOtpVerified = ValidationFunctions.verifyMobOtp(mobOtp);
        // if(loginNumValidation === 'valid' && isOtpVerified === 'true'){
        //     updateloginNumErr({...loginNumErr, err_mssg: loginNumValidation, isValid: "valid"})
        //     loadUserDataFunction(phoneNumber);
        // }else{
        //     updateloginNumErr({...loginNumErr, err_mssg: loginNumValidation, isValid: "invalid"})
        // }
    }

    const getMobileOtp = (e)=>{
        e.preventDefault();
        setOtpBox('show');
        // let loginNumValidation = ValidationFunctions.phoneValidation("Mobile No.",phoneNumber);
        // if(loginNumValidation === 'valid'){
        //     updateloginNumErr({...loginNumErr, err_mssg: loginNumValidation, isValid: "valid"})
        //     let isOtpSend = ValidationFunctions.sendMobOtp(phoneNumber)
        //     if(isOtpSend === 'true'){
        //         //show otp input box
        //     }
        // }else{
        //     updateloginNumErr({...loginNumErr, err_mssg: loginNumValidation, isValid: "invalid"})
        // }
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
                                <div className="col-sm-12" style={{marginTop:"0px"}}>
                                    <h6 style={{textAlign:"left", marginBottom:"5px", fontWeight:"400"}}>Phone No<span style={{color:"red"}}>*</span></h6>
                                    <div style={{display:"flex", marginTop:"0px"}}>
                                        <div style={{width:"100%"}}>
                                            <input type="phone" className="form-control phone-login-input" id="phoneNumberOne" placeholder="Registered Mobile no..." value={phoneNumber} onChange={handlePhoneNumberChange} form-valid={loginNumErr.isValid} maxLength="10"/>
                                        </div>
                                        <button className="btn btn-success get-otp-btn" type="submit" onClick={getMobileOtp}>Get OTP</button>
                                    </div>
                                    {
                                        (loginNumErr.err_mssg !== 'valid')?
                                        <div className="invalid-feedback">
                                            {loginNumErr.err_mssg}
                                        </div>
                                        :
                                        <div className="valid-feedback">
                                            {loginNumErr.err_mssg}
                                        </div>
                                    }
                                    <div className="otp-input-section" show-otp-box={otpBox}>
                                        <input className="input" type="number" inputMode="numeric" maxLength="1" name="otp1" value={otp1} onChange={otpInputChange}/>
                                        <input className="input" type="number" inputMode="numeric" maxLength="1" name="otp2" value={otp2} onChange={otpInputChange}/>
                                        <input className="input" type="number" inputMode="numeric" maxLength="1" name="otp3" value={otp3} onChange={otpInputChange}/>
                                        <input className="input" type="number" inputMode="numeric" maxLength="1" name="otp4" value={otp4} onChange={otpInputChange}/>
                                    </div>
                                </div>
                                <div className="col-sm-12" style={{textAlign:"center"}}>
                                    <button className="btn btn-primary" type="submit" style={{width:"150px"}} onClick={checkPhoneNumber}>Submit</button>
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
                            <p className="modal-footer-p">New User Login?&nbsp;</p>
                            <button type="button" className="btn btn-primary new-user-reg-btn" onClick={formNextSlide}>Create a new account</button>
                        </div>
                    </div>
                    <div className="form-slide-two" slide-display={displaySecondSlide}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New User</h1>
                            <button type="button" className="login-modal-close" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body">
                            <NewLoginForm loadUserDataFunction={loadUserDataFunction}/>
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