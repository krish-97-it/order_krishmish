import React from "react";
import { NavLink, useLocation } from 'react-router-dom';

export default function SearchBar({searchItem, getSearchInput, clearInput, getInputCuisine, getFilteredItemList}){
    const location          = useLocation();
    const currentPath       = location.pathname;
    const websiteBaseUrl    = window.location.origin;
    let currentPageUrl      = window.location.href;
    currentPageUrl          = currentPageUrl.replace(/\/$/, "");  // removing slach from end

    function disableOnSubmit(e){
        e.preventDefault();
        document.querySelector('#searchInput').blur();
        setTimeout(function(){
            document.getElementById("showAllProducts").scrollIntoView({ behavior: "smooth" });
        },100);
    }

    function onClickSearchBar(e){
        if(currentPath.includes('/cuisine')){
            e.preventDefault();
        }
    }

    return(

        <div className="search-pos-fixed" search-bar-hide={(websiteBaseUrl === currentPageUrl || currentPath.includes('/cuisine')) ? 'off' : 'on'}>
            <div className="container-fluid search-form-container" id="searchformid" search-bar-hide={(websiteBaseUrl === currentPageUrl || currentPath.includes('/cuisine')) ? 'off' : 'on'} >
                <div className="search-input-section">
                    <NavLink className="nav-link search-bar-page-load" to={(currentPath.includes('/cuisine')? '#':'/cuisine')} onClick={onClickSearchBar}>
                        <form className="search-form" style={{width: "100%"}} onSubmit={disableOnSubmit}>
                            <input className="form-control me-2 search-input-box" type="" placeholder="Search for a food..." id="searchInput" aria-label="Search" onChange={getSearchInput} value={searchItem}/>
                            {/* <button className="btn btn-outline-success" type="submit" onClick={getSearchInput}>Search</button> */}
                        </form>
                    </NavLink>
                </div>
                <div className="clear-text-btn-section">
                    <button onClick={()=>clearInput()}>x</button>
                </div>
                {/* <div className="select-cuisine-section" show-on-cuisine-page = {currentPath === '/cuisine' ? 'on' : 'off'}>
                    <select id="cuisineselect" className="form-select item-filter-select" aria-label="Default select example" onChange={getInputCuisine}>
                        <option defaultValue="all cuisines">All Cuisines</option>
                        <option value="indian">Indian</option>
                        <option value="chinese">Chinese</option>
                        <option value="american">american</option>
                        <option value="italian">Italian</option>
                    </select>
                </div> */}
            </div>
            {/* <div className="container-fluid show-results-text">
                <p className="mb-0">Search results: {getFilteredItemList.length}</p>
            </div> */}
        </div>
    )
}