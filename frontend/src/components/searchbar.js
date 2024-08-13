import React from "react";

export default function SearchBar({searchItem, getSearchInput}){
    return(
        <div className="container search-form-container">
            <form className="search-form" role="search" style={{width: "100%"}}>
                <input className="form-control me-2" type="search" placeholder="Search for a food..." aria-label="Search" onChange={getSearchInput} value={searchItem}/>
                {/* <button className="btn btn-outline-success" type="submit" onClick={getSearchInput}>Search</button> */}
            </form>
        </div>
    )
}