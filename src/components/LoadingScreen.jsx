import React from 'react';
import "../styles/loadingScreen.css"
const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;