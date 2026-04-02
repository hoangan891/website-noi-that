// src/components/common/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ small, white }) => {
    const sizeClass = small ? 'w-4 h-4' : 'w-8 h-8';
    const colorClass = white ? 'border-white' : 'border-gray-600';

    return (
        <div className="flex justify-center items-center">
            <div
                className={`animate-spin rounded-full ${sizeClass} border-t-2 border-b-2 ${colorClass}`}
            ></div>
        </div>
    );
};

export default LoadingSpinner;