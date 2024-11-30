import React, { useState, useEffect } from 'react';

const Popup = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose(); 
            }, 3000);

            return () => clearTimeout(timer); 
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
            <p>{message}</p>
        </div>
    );
};

export default Popup;
