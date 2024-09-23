import React, { useState } from "react";
import GoToTop from "../components/go-to-top";
import Costant_Variables from "../controller/constant-variables";
import ValidationFunctions from "../controller/validation-functions";
import DiscountIcon from '../assets/discount_icon.png';
import Swal from 'sweetalert2';
import axios from "axios";

export default function ShowCartPage({addedCartItem, deleteCartItem, totalCartCost, getTotalDiscountCost, increaseItemQuantity, decreaseItemQuantity, loadUserData, openLoginModal, userLoggedIn, loadDeliveryAddress, orderAddress}){
    const [showAddress, setShowAddress]         = useState('show');
    const [editAddress, setEditAddress]         = useState('hide');
    const [stateErr, updateStateErr]            = useState({});
    const [districtErr, updateDistrictErr]      = useState({});
    const [cityErr, updateCityErr]              = useState({});
    const [pinCodeErr, updatePinCodeErr]        = useState({});
    const [contactNum, setContactNum]           = useState('');
    const [contactNumErr, updateContactNumErr]  = useState({});

    function handlePhoneInput(e){
        let ele_val = e.target.value;
        setContactNum(ele_val);

        let isNumValid = ValidationFunctions.phoneValidation("Phone no.",ele_val);
        if(isNumValid !== 'valid'){
            updateContactNumErr({...contactNumErr, err_mssg: isNumValid, isValid: "invalid"})
        }else{
            updateContactNumErr({...contactNumErr, err_mssg: isNumValid, isValid: "valid"});
        }

    }
    const [deliveryAddressData, setdeliveryAddressData] = useState({
        state: '',
        district: '',
        city: '',
        pinCode: '',
    });

    const APIUrls   =   {
        "saveOrderDetails"  : Costant_Variables.SERVER_BASE_URL+'/saveorderdetails'
    };

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
        if(addedCartItem.length > 0){
            let isPhoneNumValid = ValidationFunctions.phoneValidation("Phone no.",contactNum);
            if(isPhoneNumValid !== 'valid'){
                updateContactNumErr({...contactNumErr, err_mssg: isPhoneNumValid, isValid: "invalid"})
            }else{
                updateContactNumErr({...contactNumErr, err_mssg: isPhoneNumValid, isValid: "valid"});
                Swal.fire({
                    title: 'Confirm to Place Order',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    icon: 'warning'
                }
                ).then((result) => {
                    if (result.isConfirmed) {
                        orderApiCall()
                    } else{
                        Swal.close();
                    }
                })
            }
        }else{
            Swal.fire(
                {
                    title: "Empty Cart!",
                    text: "Your Cart is Empty. Please add some food first",
                    icon: "warning"
                }
            )
        }

        function orderApiCall(){
                let del_Address;
                if(orderAddress.district !=='' || orderAddress.pinCode !==''){
                    del_Address = {
                        state: orderAddress.state,
                        district: orderAddress.district,
                        city: orderAddress.city,
                        pincode: parseInt(orderAddress.pinCode)
                    }
                }else{
                    del_Address = {
                        state: loadUserData.state,
                        district: loadUserData.district,
                        city: loadUserData.city,
                        pincode: loadUserData.pincode
                    }
                }
                const formData  =   {
                    userid     : loadUserData._id,
                    useremail  : loadUserData.email,
                    phone      : parseInt(contactNum),
                    address    : del_Address,
                    offers     : appliedOffer,
                    items      : addedCartItem,
                    price      : getTotalDiscountCost(offerAmt)
                }
                const config = {
                    headers: { 'Content-Type': 'application/json'}
                }
                axios.post(APIUrls.saveOrderDetails, formData, {config})
                .then(
                    (response) => {
                        if(response.data.success === true){
                            localStorage.setItem("cartData", JSON.stringify([]));
                            Swal.fire(
                                {
                                    title: "Great!!",
                                    text: response.data.message,
                                    icon: "success"
                                }
                            ).then(
                                (result) =>{
                                    if (result.isConfirmed) {
                                        window.location.href = window.location.origin;;
                                    }
                                }
                            )
                        }else{
                            console.log("Faied to palced order")
                        }
                    }
                ).catch(error => {
                    console.log(error);
                });
    
                // setTimeout(function(){
                //     window.scrollTo({ top:0, behavior: "smooth" });
                // }, 200);
                // setTimeout(function(){
                //     setCartSlide('false');
                //     setOrderSlide('true');
                // },420)
            
        }
    }

    function enableEditBtn(e){
        e.preventDefault();
        setShowAddress('hide');
        setEditAddress('show');
        updateStateErr({});
        updateDistrictErr({});
        updateCityErr({});
        updatePinCodeErr({});
        setdeliveryAddressData({...deliveryAddressData, 'state':deliveryAddressData.state, 'district':deliveryAddressData.district, 'city':deliveryAddressData.city, 'pinCode' : deliveryAddressData.pinCode});
    }

    function cancelEditForm(e){
        e.preventDefault();
        setShowAddress('show');
        setEditAddress('hide');
    }

    function saveAddress(){
        let validationFlag = onSubmitValidation(deliveryAddressData);
        if(validationFlag){
            let convertAddressToStringData = JSON.stringify(deliveryAddressData);
            localStorage.setItem("delivery_address", convertAddressToStringData);
            loadDeliveryAddress();
            setShowAddress('show');
            setEditAddress('hide');
        }
    }

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
            let isCityValid = ValidationFunctions.cityValidation(ele,ele_val,false);

            if(isCityValid !== 'valid'){
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "invalid"})
            }else{
                updateCityErr({...cityErr, err_mssg: isCityValid, isValid: "valid"})

            }
        }else if(ele === 'pinCode'){
            let isPinCodeValid = ValidationFunctions.pinCodeValidation(ele,ele_val,false);

            if(isPinCodeValid !== 'valid'){
                updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "invalid"})
            }else{
                updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "valid"})

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

        let isPinCodeValid = ValidationFunctions.pinCodeValidation("pinCode",data.pinCode,false);
        if(isPinCodeValid !== 'valid'){
            updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "invalid"})
        }else{
            updatePinCodeErr({...pinCodeErr, err_mssg: isPinCodeValid, isValid: "valid"})
        }


        if(isStateValid === 'valid' && isDistrictValid === 'valid' && isCityValid === 'valid' && isPinCodeValid === 'valid'){
            return true
        }else{
            return false
        }
    }

    function splitar(val){
        const a = val.split("-");
        return (parseInt(a[0]));
    }
    function gethighestDuration(){
        if(addedCartItem.length > 1){
            const temp_array = addedCartItem.sort(function(a, b){return splitar(b.product.preptime)-splitar(a.product.preptime)});
            return (temp_array[0].product.preptime);
        }else{
            return "";
        }
    }

    const [appliedOffer, setAppliedOffer] = useState('');
    const [offerAmt, setOfferAmt] = useState('');
    function selectOffers(e,amt){
        e.preventDefault();
        if(addedCartItem.length > 0){
            const offer_val = e.target.value;
            const offer_name = e.target.name;
            if(offer_name === 'FISH20'){
                const ItemList     =   addedCartItem.filter((item) =>
                    item.product.tags.toLowerCase().includes('fish')
                ) 
                if(ItemList.length === addedCartItem.length){
                    setAppliedOffer(offer_name);
                    setOfferAmt(offer_val);
                    Swal.fire(
                        {
                            title: "",
                            text: "Offers applied successfully!",
                            icon: "success"
                        }
                    )
                }
                else{
                    Swal.fire(
                        {
                            title: "Failed!",
                            text: "Failed to apply selected cupon code. All Items in your cart should be Fish Items",
                            icon: "error"
                        }
                    )
                    setAppliedOffer('');
                    setOfferAmt('');
                }
            }else if(offer_name === 'VEG25'){
                const ItemList     =   addedCartItem.filter((item) =>
                    item.product.tags.toLowerCase().includes('veg')
                ) 
                if(ItemList.length === addedCartItem.length){
                    setAppliedOffer(offer_name);
                    setOfferAmt(offer_val);
                    Swal.fire(
                        {
                            title: "",
                            text: "Offers applied successfully!",
                            icon: "success"
                        }
                    )
                }else{
                    Swal.fire(
                        {
                            title: "Failed!",
                            text: "Failed to apply selected cupon code. All Items in your cart should be veg",
                            icon: "error"
                        }
                    )
                    setAppliedOffer('');
                    setOfferAmt('');
                }
            }else if(offer_name === 'DESSERT35'){
                const ItemList     =   addedCartItem.filter((item) =>
                    item.product.tags.toLowerCase().includes('dessert')
                ) 
                if(ItemList.length === addedCartItem.length){
                    setAppliedOffer(offer_name);
                    setOfferAmt(offer_val);
                    Swal.fire(
                        {
                            title: "",
                            text: "Offers applied successfully!",
                            icon: "success"
                        }
                    )
                }else{
                    Swal.fire(
                        {
                            title: "Failed!",
                            text: "Failed to apply selected cupon code. All Items in your cart should be under dessert category",
                            icon: "error"
                        }
                    )
                    setAppliedOffer('');
                    setOfferAmt('');
                }
            }else if(offer_name === 'FAN50'){
                if(amt > 1000){
                    setAppliedOffer(offer_name);
                    setOfferAmt(offer_val);
                    Swal.fire(
                        {
                            title: "",
                            text: "Offers applied successfully!",
                            icon: "success"
                        }
                    )
                }else{
                    Swal.fire(
                        {
                            title: "Failed!",
                            text: "Failed to apply selected cupon code. Ordered Item should be greater than 1000",
                            icon: "error"
                        }
                    )
                    setAppliedOffer('');
                    setOfferAmt('');
                }
            }
            else if(offer_name === 'FIRST30'){
                if(amt > 1000){
                    setAppliedOffer(offer_name);
                    setOfferAmt(offer_val);
                    Swal.fire(
                        {
                            title: "",
                            text: "Offers applied successfully!",
                            icon: "success"
                        }
                    )
                }else{
                    Swal.fire(
                        {
                            title: "Failed",
                            text: "This Offers is applicable only for first Order for a user",
                            icon: "error"
                        }
                    )
                    setAppliedOffer('');
                    setOfferAmt('');
                }
            }else{
                setAppliedOffer('not applied');
                setOfferAmt('');
            }

            document.querySelector("button.offers-check-btn-section").click();
        }else{
            Swal.fire(
                {
                    title: "Failed!",
                    text: "Your Cart is empty.",
                    icon: "error"
                }
            )
        }
    }
    
    document.addEventListener('click', function(){
        closeAccordion();
    })

    function closeAccordion(){
        let ele = document.querySelector("button.offers-check-btn-section");
        if(ele){
            let className = (ele.className).split(" ");
            if(className.length <= 1){
                document.querySelector("button.offers-check-btn-section").click();
            }
        }
    }

    return(
        <div className="app-body custom-margin-top" page-transition="on">
            <div className="main-content container cart-page-container">
                <div className="cart-slide" active-slide={showCartSlide}>
                    <div className="cart-item-billing-section">
                        <div className="cart-section" style={{flex:2}}>
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
                        <div className="billing-section" style={{flex:2}}>
                            <h3 className="gradient-bg">Order Details</h3>
                            <div className="billing-details-section">
                                <div className="delivery-address-section">
                                    <div className="show-address" show-section={showAddress}>
                                        <h6 className="order-details-sub-heading">Delivery Address:<button className="btn btn-primary edit-address-btn" onClick={enableEditBtn}>Edit</button></h6>
                                        {
                                            (orderAddress.district !=='' || orderAddress.pinCode !=='')?
                                            <p style={{textAlign:"left"}}>{orderAddress.city ? orderAddress.city+", ":""} {orderAddress.district? orderAddress.district+", ":""} {orderAddress.state? orderAddress.state+", ":""} {orderAddress.pinCode? orderAddress.pinCode:""}</p>
                                            :
                                            <p style={{textAlign:"left"}}>{loadUserData.city ? loadUserData.city+", ":""} {loadUserData.district? loadUserData.district+", ":""} {loadUserData.state? loadUserData.state+", ":""} {loadUserData.pincode? loadUserData.pincode:""}</p>
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
                                                <input type="text" className="form-control" id="pinCode" name="pinCode" placeholder="Enter your Pin code" maxLength={6} value={deliveryAddressData.pinCode} onChange={(e)=>handledeliveryAddressInput(e)} form-valid={pinCodeErr.isValid}/>
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
                                <div className="delivery-contact-number">
                                    <h6>Contact Number:<span style={{color:"red"}}>*</span></h6>
                                    <div className="del-phone-field">
                                        <input type="tel" className="form-control" id="phoneNum" name="phoneNum" placeholder="Enter your Phone no..." value={contactNum} onChange={(e)=>handlePhoneInput(e)} form-valid={contactNumErr.isValid} maxLength="10"/>
                                        {
                                            (contactNumErr.err_mssg !== 'valid')?
                                            <div className="invalid-feedback">
                                                {contactNumErr.err_mssg}
                                            </div>
                                            :
                                            <div className="valid-feedback">
                                                {contactNumErr.err_mssg}
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="delivery-time-section">
                                    <h6>Delivery In:</h6>
                                    <div className="delivery-time-txt">
                                        <i className="fa fa-clock-o" style={{fontSize:"28px", color: "green"}}></i>
                                        {
                                            (gethighestDuration() !== '')?
                                            <p>{gethighestDuration()}</p>
                                            :
                                            <p>30-35min</p>
                                        }
                                    </div>
                                </div>
                                <div className="accordion accordion-flush apply-offer-section" id="applyOfferSection">
                                    <button className="offers-check-btn-section collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#applyOffersCollapse" aria-controls="applyOffersCollapse">
                                        <h6>Apply Offers <img src={DiscountIcon} alt="discount" style={{width:"24px"}}/></h6>
                                        <p className="offers-check-button">Check</p>
                                    </button>
                                    <div id="applyOffersCollapse" className="accordion-collapse collapse offers-lists-section">
                                        <div className="offers-lists-body">
                                            <div className="avail-offer">
                                                <p>Get Flat 30% OFF on your First Order above Rs. 100</p>
                                                <button type="button" className="btn" onClick={(e)=>{selectOffers(e,totalCartCost())}} name="FIRST30" value="30">Claim</button>
                                            </div>
                                            <div className="avail-offer">
                                                <p>Get Flat 20% OFF on any Fish Dish above Rs. 100</p>
                                                <button type="button" className="btn" onClick={(e)=>{selectOffers(e,totalCartCost())}} name="FISH20" value="20">Claim</button>
                                            </div>
                                            <div className="avail-offer">
                                                <p>Get Upto 30% OFF on Ice Cream and Sweets above Rs. 100</p>
                                                <button type="button" className="btn" onClick={(e)=>{selectOffers(e,totalCartCost())}} name="DESSERT35" value="30">Claim</button>
                                            </div>
                                            <div className="avail-offer">
                                                <p>Get FLAT 50% Off on order over RS. 1000 by this One time applicable offer.</p>
                                                <button type="button" className="btn" onClick={(e)=>{selectOffers(e,totalCartCost())}} name="FAN50" value="50">Claim</button>
                                            </div>
                                            <div className="avail-offer">
                                                <p>Get Flat 25% OFF on Veg Dishes above Rs. 100</p>
                                                <button type="button" className="btn" onClick={(e)=>{selectOffers(e,totalCartCost())}} name="VEG25" value="25">Claim</button>
                                            </div>
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
                                        <p>{totalCartCost()}</p>
                                    </div>
                                    <div className="total-item-count">
                                        <p>Dicount:&nbsp;</p>
                                        <p>10%</p>
                                    </div>
                                    <div className="total-item-count">
                                        <p>Offers:&nbsp;</p>
                                        <p>{(appliedOffer !== '')?appliedOffer:"not applied"}</p>
                                    </div>
                                    <hr className="hr-line"></hr>
                                    <div className="total-item-count">
                                        <p>Amount after Discount:&nbsp;</p>
                                        <p>{getTotalDiscountCost(offerAmt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-now-btn">
                            {
                                (userLoggedIn !== 'true')?
                                <button className="btn btn-primary place-order-btn" type="button" onClick={openLoginModal}>Place Your Order</button>
                                :
                                <button className="btn btn-primary place-order-btn" type="button" onClick={placeOrder}>Place Your Order</button>
                            }
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
