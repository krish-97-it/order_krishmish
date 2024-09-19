import React, { useState } from "react";
import GoToTop from "../components/go-to-top";
import Costant_Variables from "../controller/constant-variables";
import ValidationFunctions from "../controller/validation-functions";

export default function ShowCartPage({addedCartItem, deleteCartItem, getTotalCost, increaseItemQuantity, decreaseItemQuantity, loadUserData}){
    
    const [showAddress, setShowAddress] = useState('show');
    const [editAddress, setEditAddress] = useState('hide');
    const [showAddressData, setShowAddressData] = useState({
        state: '',
        district: '',
        city: '',
        pinCode: '',
    });
    const [deliveryAddressData, setdeliveryAddressData] = useState({
        state: '',
        district: '',
        city: '',
        pinCode: '',
    });
    
    const [showCartSlide, setCartSlide]   = useState('true');
    const [showOrderSlide, setOrderSlide] = useState('false');
    function cancelOrder(){
        setTimeout(function(){
            window.scrollTo({ top:0, behavior: "smooth" });
        }, 200);
        setTimeout(function(){
            setCartSlide('true');
            setOrderSlide('false');
        },420)
    }
    function placeOrder(){
        setTimeout(function(){
            window.scrollTo({ top:0, behavior: "smooth" });
        }, 200);
        setTimeout(function(){
            setCartSlide('false');
            setOrderSlide('true');
        },420)
    }

    function enableEditBtn(){
        setShowAddress('hide');
        setEditAddress('show');
        updateStateErr({});
        updateDistrictErr({});
        updateCityErr({});
        updatePinCodeErr({});
        setdeliveryAddressData({...deliveryAddressData, 'state':deliveryAddressData.state, 'district':deliveryAddressData.district, 'city':deliveryAddressData.city, 'pinCode' : deliveryAddressData.pinCode});
    }

    function cancelEditForm(){
        setShowAddress('show');
        setEditAddress('hide');
    }

    function saveAddress(){
        let validationFlag = onSubmitValidation(deliveryAddressData);
        if(validationFlag){
            setShowAddressData({...showAddressData, 'state':deliveryAddressData.state, 'district':deliveryAddressData.district, 'city':deliveryAddressData.city, 'pinCode' : deliveryAddressData.pinCode});
            setShowAddress('show');
            setEditAddress('hide');
        }
    }

    const [stateErr, updateStateErr]            = useState({});
    const [districtErr, updateDistrictErr]      = useState({});
    const [cityErr, updateCityErr]              = useState({});
    const [pinCodeErr, updatePinCodeErr]        = useState({});

    const handledeliveryAddressInput = (e) => {
        let ele         =   e.target.name;
        let ele_val     =   e.target.value;
        setdeliveryAddressData({...deliveryAddressData, [ele] : ele_val});

        if(ele === 'state'){
            let isStateValid = ValidationFunctions.requiredValidation("State",ele_val);

            if(isStateValid !== 'valid'){
                updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "invalid"})
            }else{
                updateStateErr({...stateErr, err_mssg: isStateValid, isValid: "valid"});
                let dist = "district";
                setdeliveryAddressData({...deliveryAddressData, [ele] : ele_val, [dist]:''});

            }
        }else if(ele === 'district'){
            let isDistrictValid = ValidationFunctions.requiredValidation("district",ele_val);

            if(isDistrictValid !== 'valid'){
                updateDistrictErr({...districtErr, err_mssg: isDistrictValid, isValid: "invalid"})
            }else{
                updateDistrictErr({...districtErr, err_mssg: isDistrictValid, isValid: "valid"})

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
        let isDistrictValid = ValidationFunctions.requiredValidation("district",data.district);
        if(isDistrictValid !== 'valid'){
            updateDistrictErr({...districtErr, err_mssg: isDistrictValid, isValid: "invalid"})
        }else{
            updateDistrictErr({...districtErr, err_mssg: isDistrictValid, isValid: "valid"})
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


        if(isStateValid === 'valid' && isDistrictValid === 'valid' && isCityValid === 'valid' && isPinCodeValid === 'valid'){
            return true
        }else{
            return false
        }
    }

    return(
        <div className="app-body custom-margin-top" page-transition="on">
            <div className="main-content container cart-page-container">
                <div className="cart-slide" active-slide={showCartSlide}>
                    <div className="cart-item-billing-section">
                        <div style={{flex:2}}>
                            <h3 className="gradient-bg added-item-txt">Added Items</h3>
                            <div className="cart-item-section">
                                {
                                    (addedCartItem.length) > 0 ? 
                                    <>
                                        {
                                            addedCartItem.map((item,index) =>{
                                                return(
                                                    <div className="added-cart-item" key={"item-"+index}>
                                                        <div className="added-item-img">
                                                            <img src={item.product.image.img_one} alt="food"/>
                                                        </div>
                                                        <div className="item-body-description">
                                                            <h5>{(item.product.name).length < 28? item.product.name : (item.product.name).substring(0,30)+'...'}</h5>
                                                            <div className="cart-item-btn-section">
                                                                <div>

                                                                    <div className="quantity-btn-section">
                                                                        <span>Qty:</span>
                                                                        <div className="increase-decrease-btn">
                                                                            <button onClick={()=>{increaseItemQuantity((item))}}>+</button>
                                                                            <span>{item.item_quantity}</span>
                                                                            <button onClick={()=>{decreaseItemQuantity((item))}}>-</button>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <p className="price-section">Price: {(item.item_quantity)+" x ₹"+(item.product.price)}</p>
                                                                </div>
                                                                <button className="remove-from-cart-btn" onClick={()=>{deleteCartItem(item)}}>Remove Item</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </> :
                                    <p>Your Cart is empty !! No item added yet.</p>
                                }
                            </div>
                        </div>
                        <div style={{flex:2}}>
                            <h3 className="gradient-bg">Order Details</h3>
                            <div className="billing-details-secton">
                                <div className="delivery-address-section">
                                    <div className="show-address" show-section={showAddress}>
                                        <h6 className="order-details-sub-heading">Delivery Address:<button className="btn btn-primary edit-address-btn" onClick={enableEditBtn}>Edit</button></h6>
                                        {
                                            (showAddressData.district !== '' && showAddressData.pinCode !== '' )?
                                            <p style={{textAlign:"left"}}>{showAddressData.city ? showAddressData.city+", ":""} {showAddressData.district? showAddressData.district+", ":""} {showAddressData.state? showAddressData.state+", ":""} {showAddressData.pinCode}</p>
                                            :
                                            <p style={{textAlign:"left"}}>{loadUserData.city ? loadUserData.city+", ":""} {loadUserData.district? loadUserData.district+", ":""} {loadUserData.state? loadUserData.state+", ":""} {loadUserData.pincode}</p>
                                        }
                                    </div>
                                    <div className="edit-address" show-section={editAddress}>
                                        <h6 className="order-details-sub-heading">Add Address:</h6>
                                        <form className="row g-3 needs-validation delivery-address-form">
                                            <div className="col-md-6 col-sm-12 new-form-field">
                                                <label htmlFor="state" className="form-label">State<span style={{color:"red"}}>*</span></label>
                                                <select className="form-select address-select" id="state" name="state" value={deliveryAddressData.state} onChange={(e)=>handledeliveryAddressInput(e)} form-valid={stateErr.isValid} select-color={deliveryAddressData.state === ''?'novalue':'withvalue'}>
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
                                                <select className="form-select address-select" id="district" name="district" value={deliveryAddressData.district} onChange={(e)=>handledeliveryAddressInput(e)} form-valid={districtErr.isValid} select-color={deliveryAddressData.district === ''?'novalue':'withvalue'}>
                                                <option value="" disabled>Choose your district</option>
                                                    {
                                                        Costant_Variables.states_districts.map((data,index)=>
                                                        (data.state === deliveryAddressData.state)?
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
                                                <input type="text" className="form-control" id="city" name="city" placeholder="Enter your city" value={deliveryAddressData.city} onChange={(e)=>handledeliveryAddressInput(e)} form-valid={cityErr.isValid}/>
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
                                                <input type="text" className="form-control" id="pinCode" name="pinCode" placeholder="Enter your Pin code" value={deliveryAddressData.pinCode} onChange={(e)=>handledeliveryAddressInput(e)} form-valid={pinCodeErr.isValid}/>
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
                                        </form>
                                        <div className="edit-address-btn-section">
                                            <button className="btn btn-primary cancel-edit-address-btn" onClick={cancelEditForm}>Cancel</button>
                                            <button className="btn btn-primary save-address-btn" onClick={saveAddress}>Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-amount-details">
                                <h6 className="order-details-sub-heading">Billing Summary</h6>
                                    <div className="total-item-count">
                                        <p>Total Items:&nbsp;</p>
                                        <p>{(addedCartItem.length)}</p>
                                    </div>
                                    <div className="total-item-count">
                                        <p>Total Amount:&nbsp;</p>
                                        <p>{getTotalCost()}</p>
                                    </div>
                                    <div className="total-item-count">
                                        <p>Dicount:&nbsp;</p>
                                        <p>10%</p>
                                    </div>
                                    <hr className="hr-line"></hr>
                                    <div className="total-item-count">
                                        <p>Amount after Discount:&nbsp;</p>
                                        <p>{getTotalCost() === 0 ? '0' : (getTotalCost() - ((getTotalCost()*10)/100))}</p>
                                    </div>
                                </div>
                                <div className="order-now-btn">
                                    <button className="btn btn-primary place-order-btn" type="button" onClick={placeOrder}>Place Your Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="last-order-section">
                        <h3>
                            Last Ordered Items
                        </h3>
                    </div>
                </div>
                <div className="order-slide slide-transition" active-slide={showOrderSlide}>
                    <div className="cancel-order-btn-section">
                        <button className="btn btn-primary cancel-order-btn" type="button" onClick={cancelOrder}>back</button>
                    </div>
                </div>
            </div>
            <GoToTop/>
        </div>
    )
}
