import React from "react";
import './components.css';
import Illustration from '../assets/empty.png';

const EmptySearchResult = () => {
    return(
        <>
            <div className="empty-search-result">
                <img src={Illustration} alt='#' />
                <h4 className="pt-3">Couldn't find what you're looking for</h4> 
            </div>
        </>
    );
}

export default EmptySearchResult;