import React from "react";

export default function LoginModal({loginModal, closeModal, formNextSlide, formPrevSlide, displayFirstSlide, displaySecondSlide}){
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

    return(
        <div className="login-modal" id="loginModal" show-modal={loginModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="form-slide-one" slide-display={displayFirstSlide}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Log In</h1>
                            <button type="button" className="login-modal-close" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body" style={{display:"flex", justifyContent:"center"}}>
                            <form className="row g-3 needs-validation old-user-form ">
                                <div className="col-sm-12">
                                    {/* <label htmlFor="validationCustom01" className="form-label">First name</label> */}
                                    <input type="phone" className="form-control" id="validationCustom01" placeholder="Enter your Mobile Number" required/>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button className="btn btn-primary" type="submit" style={{width:"200px"}}>Get OTP</button>
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
                            <form className="row g-3 needs-validation new-user-form">
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustom01" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="validationCustom01" placeholder="Enter your first name" required/>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustom02" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="validationCustom02" placeholder="Enter your last name" required/>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustom02" className="form-label">Date Of Birth</label>
                                    <input type="date" className="form-control" id="validationCustom02" required/>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustom02" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="validationCustom02" placeholder="Enter your email" required/>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustomUsername" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        {/* <span className="input-group-text" id="inputGroupPrepend">@</span> */}
                                        <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="Enter your username" required/>
                                        <div className="invalid-feedback">
                                            Please choose a username.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustom03" className="form-label">City</label>
                                    <input type="text" className="form-control" id="validationCustom03" placeholder="Enter your city" required/>
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustom04" className="form-label">State</label>
                                    <select className="form-select" id="validationCustom04" required>
                                        <option disabled value="">Choose your state</option>
                                        {
                                            states.map((data,index)=>{
                                                return(
                                                    <option value={data} key={index}>{data}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="validationCustom05" className="form-label">Zip</label>
                                    <input type="text" className="form-control" id="validationCustom05" placeholder="Enter your pin code" required/>
                                    <div className="invalid-feedback">
                                        Please provide a valid zip.
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-check">
                                        <div className="agree-check-form">
                                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                                            <label className="form-check-label" htmlFor="invalidCheck">
                                                Agree to terms and conditions
                                            </label>
                                        </div>
                                        <div className="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
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