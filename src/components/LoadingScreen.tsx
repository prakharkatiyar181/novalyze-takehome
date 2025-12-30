import React from 'react';
import Icon from '../img/icon-bg.png';
import '../styles/loading.css';

const LoadingScreen: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-glow"></div>
                <div className="loading-orbit"></div>
                <img src={Icon} alt="Loading..." className="loading-icon" />
            </div>
        </div>
    );
};

export default LoadingScreen;
