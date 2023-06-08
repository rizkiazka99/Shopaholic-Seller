import React from "react";
import ReactLoading from 'react-loading';
import './components.css';

const LoadingIndicator = () => {
    return (
        <>
            <div className="loading-indicator">
                <ReactLoading
                    type='cylon'
                    height={100}
                    width={100}
                    className='mx-auto'
                    color="#ADFF2F"
                />
            </div>
        </>
    );
}

export default LoadingIndicator;