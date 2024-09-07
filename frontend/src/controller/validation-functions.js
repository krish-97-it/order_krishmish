var custom_functions = {
    nameValidation : function(ele,val){
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
    },

    emailValidation : function(ele,val){
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
    },

    phoneValidation : function(ele,val){
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
    },
    
    dobValidation: function (ele,val){
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
    },

    requiredValidation: function(ele,val){
        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg = ele+" is required";
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    },

    cityValidation : function(ele,val){
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
    },

    pinCodeValidation: function (ele,val){
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
    },

    verifyMobOtp : function (val){
        if(!val || val === '' || val === null || val === 'undefined'){
            let err_mssg = 'Incorrect Otp';
            return err_mssg;
        }else{
            let err_mssg = 'valid';
            return err_mssg;
        }
    }
}

export default custom_functions;