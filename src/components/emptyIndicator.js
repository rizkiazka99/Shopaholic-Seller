import React from "react";
import './components.css';
import Illustration from '../assets/empty.png';

const EmptyIndicator = () => {
    return(
        <>
            <div className="empty-indicator">
                <img src={Illustration} alt='#' />
                <h4 className="pt-3">You have no product at the moment</h4> 
            </div>
        </>
    );
}

export default EmptyIndicator;