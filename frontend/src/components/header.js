import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Brandlogo from '../assets/shop-logo-one-1.jpg';
import BrandName from '../assets/krishmish_brand_name_logo.webp';
import HamburgerIcon from '../assets/hamburger.svg';
import { Link } from "react-router-dom";
import lightDarkIcon from '../assets/day-light-mode-icon.svg';
import LoginModal from './login-modal';

const Navbar = (props) => {

    const [isActive, setActive] = useState(null);
    function closeOffCanvas(e) {
        let eleid       = e.target.id;
        setActive(eleid);
        if(window.outerWidth < 768){
            document.querySelector("button.navbar-toggler").click();
        }
    }

    const [currentTheme, setDarkTheme] = useState('dark-mode-off');
    
    function onDarkTheme(){
        document.getElementById('app-theme').setAttribute("dark-theme","on");
        setDarkTheme("dark-mode-on");
    }

    function offDarkTheme(){
        document.getElementById('app-theme').setAttribute("dark-theme","off");
        setDarkTheme("dark-mode-off");
    }

    function toggleTheme(event){
        let val = event.currentTarget.value;
        val === 'dark-mode-on' ? offDarkTheme() : onDarkTheme();
        closeOffCanvas();
    }

    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-custom-style bg-dark navbar-dark fixed-top">
                <div className="container-fluid navbar-container-style">
                    <Link className="navbar-brand" to="/"><img src={Brandlogo} alt="Brand"/></Link>
                    <img src={BrandName} alt="brand-name" className="brand-name-logo"/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        {/* <span className="navbar-toggler-icon"></span> */}
                        <img src={HamburgerIcon} alt="toggle" style={{width:"36px", paddingTop:"3px"}}/>
                    </button>
                    <div className="offcanvas offcanvas-end bg-dark navbar-dark" data-bs-scroll="true" data-bs-backdrop="static" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            {/* <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Home</h5> */}
                            {/* <Link className="navbar-brand" to="/"><img src={Brandlogo} alt="Brand"/></Link> */}
                            <img src={BrandName} alt="brand-name" className="brand-name-logo-toggle"/>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3 navbar-nav-collapse align-items-baseline">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" onClick={closeOffCanvas}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cuisine" onClick={closeOffCanvas}>Cuisine</NavLink>
                                </li>
                                <li className="nav-item"> 
                                    <NavLink className="nav-link" to="/special-combos" onClick={closeOffCanvas}>Combos & Offers</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/reviews" onClick={closeOffCanvas}>Reviews</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link position-relative" to="/mycart" onClick={closeOffCanvas}>
                                        <i className="fa fa-shopping-cart" style={{fontSize:"24px"}}></i>
                                        <span>&nbsp;Cart</span>
                                        {
                                            (props.totalCartItem > 0)?
                                            <span className="position-absolute top-0 badge rounded-pill bg-success">
                                                <span>{props.totalCartItem}</span>
                                                <span className="visually-hidden">Total Cart Item</span>
                                            </span>
                                            :
                                            <></>
                                        }
                                    </NavLink>
                                </li>
                            </ul>
                            <>
                                {
                                    (props.searchbar ) === "true" ?
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                        <button className="btn btn-outline-success" type="submit">{this.props.searchbar}</button>
                                    </form> : <></>
                                }
                            </>

                            <div className='right-align-nav-elements'>
                                {
                                    (props.isUserLoggedIn === 'true')?
                                        <div className="dropdown" style={{textAlign:"left"}}>
                                            <button className="btn btn-secondary dropdown-toggle profile-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{paddingLeft:"0px", display:"flex", alignItems:"end"}}>
                                                <i className="fa fa-user" style={{fontSize:"28px"}}></i>
                                                <span style={{paddingLeft:"10px"}}>{props.loadUserData.nickname}</span>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-start custom-dropdown-menu-style">
                                                {/* <li><button className="dropdown-item" type="button" onClick={props.openUserProfile}>Profile</button></li> */}
                                                <li><NavLink className="dropdown-item-custom-style" id="dropdown-one" to="/myprofile" onClick={(e)=>closeOffCanvas(e)} dropdown-item-active={(isActive === 'dropdown-one')?"true":"false"}>Profile</NavLink></li>
                                                <li><NavLink className="dropdown-item-custom-style" id="dropdown-two" to="/myprofile/wishlist" onClick={(e)=>closeOffCanvas(e)} dropdown-item-active={(isActive === 'dropdown-two')?"true":"false"}>Favourites</NavLink></li>
                                                <li><NavLink className="dropdown-item-custom-style" id="dropdown-three" to="/myprofile/order-history" onClick={(e)=>closeOffCanvas(e)} dropdown-item-active={(isActive === 'dropdown-three')?"true":"false"}>Order Hitory</NavLink></li>   
                                                <li><button className="dropdown-item" type="button" onClick={props.signOutUser}>Sign Out</button></li>
                                                <li style={{display:"flex", paddingLeft:"15px", paddingTop:"5px"}}>
                                                    <span>Dark Mode: &nbsp;</span>
                                                    <button className="dark-mode" onClick={toggleTheme} value={currentTheme}>
                                                        <img src={lightDarkIcon} alt="icon"/>
                                                        <span>
                                                            {
                                                                currentTheme === 'dark-mode-on' ?  'On' : 'Off'
                                                            }
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    :
                                    <button className="btn btn-secondary profile-dropdown" type="button" style={{paddingLeft:"0px", display:"flex", alignItems:"end"}} onClick={props.openLoginModal}>
                                        <i className="fa fa-user" style={{fontSize:"28px"}}></i>
                                        <span style={{paddingLeft:"10px"}}>Log in</span>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <>
            {
                (props.showLoginModal) === "show" ? 
                <LoginModal show=" show" showLoginModal={props.showLoginModal} closeModal={props.closeLoginModal} formNextSlide={props.formNextSlide} formPrevSlide={props.formPrevSlide} displayFirstSlide={props.displayFirstSlide} displaySecondSlide={props.displaySecondSlide} loadUserDataFunction={props.loadUserDataFunction} loginErrMssg={props.loginErrMssg} userEmailId={props.userEmailId} />
                : 
                <LoginModal show="" showLoginModal={props.showLoginModal} closeModal={props.closeLoginModal} formNextSlide={props.formNextSlide} formPrevSlide={props.formPrevSlide} displayFirstSlide={props.displayFirstSlide} displaySecondSlide={props.displaySecondSlide} loadUserDataFunction={props.loadUserDataFunction} userEmailId={props.userEmailId} />
            }
            </>
        </header>
    )
}
export default Navbar;