import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Brandlogo from '../assets/shop-logo-one-1.jpg';
import { Link } from "react-router-dom";
import lightDarkIcon from '../assets/day-light-mode-icon.svg';

const Navbar = (props) => {

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
        console.log(val);
        val === 'dark-mode-on' ? offDarkTheme() : onDarkTheme();
    }

    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-custom-style bg-dark navbar-dark fixed-top">
                <div className="container-fluid navbar-container-style">
                    <Link className="navbar-brand" to="/"><img src={Brandlogo} alt="Brand" height="50px" width="54px"/></Link>
                    <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end bg-dark navbar-dark" data-bs-scroll="true" data-bs-backdrop="static" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            {/* <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Home</h5> */}
                            <Link className="navbar-brand" to="/"><img src={Brandlogo} alt="Brand" height="50px" width="54px"/></Link>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3 navbar-nav-collapse">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cuisine</a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink className="dropdown-item" to="/indian-cuisine" value="indian">Inidian</NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li>
                                            <NavLink className="dropdown-item" to="/chinese-cuisine" value="chinese">Chineese</NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li>
                                            <NavLink className="dropdown-item" to="/italian-cuisine" value="italian">Italian</NavLink>
                                        </li>
                                    </ul>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cuisine">Cuisine</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/special-combos">Combos & Offers</NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" to="/most-loved-dishes">Most Loved</NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/reviews">Reviews</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/mycart">My Cart</NavLink>
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

                            <button className="dark-mode" onClick={toggleTheme} value={currentTheme}>
                                <img src={lightDarkIcon} alt="icon"/>
                                <span>
                                    {
                                        currentTheme === 'dark-mode-on' ?  'On' : 'Off'
                                    }
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;