import React from "react";
import { NavLink, useLocation } from 'react-router-dom';

export default function SearchBar({searchItem, getSearchInput, clearInput, getInputCuisine}){
    const location = useLocation();
    const currentPath = location.pathname;
    return(

        <div className="container search-form-container" id="searchformid" search-bar-hide={currentPath === '/special-combos' ? 'on' : 'off'} >
            <div className="search-input-section">
                <NavLink className="nav-link search-bar-page-load" to="/cuisine">
                    <form className="search-form" role="search" style={{width: "100%"}}>
                        <input className="form-control me-2 search-input-box" type="" placeholder="Search for a food..." id="searchInput" aria-label="Search" onChange={getSearchInput} value={searchItem}/>
                        {/* <button className="btn btn-outline-success" type="submit" onClick={getSearchInput}>Search</button> */}
                    </form>
                </NavLink>
            </div>
            <div className="clear-text-btn-section">
                <button onClick={()=>clearInput()}>x</button>
            </div>
            <div className="select-cuisine-section" show-on-cuisine-page = {currentPath === '/cuisine' ? 'on' : 'off'}>
                <select id="cuisineselect" className="form-select item-filter-select" aria-label="Default select example" onChange={getInputCuisine}>
                    <option defaultValue="cuisines">Cuisines</option>
                    <option value="indian">Indian</option>
                    <option value="chinese">Chinese</option>
                    <option value="italian">Italian</option>
                </select>
            </div>
        </div>
    )
}