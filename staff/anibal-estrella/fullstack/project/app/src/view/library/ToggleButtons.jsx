// src/components/ToggleButtons.js
import React from 'react';

const ToggleButtons = ({ options, selectedOption, onOptionChange }) => {
    return (
        <div className="flex space-x-2">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={`flex px-4 py-4 rounded-full transition-all duration-300 w-full uppercase justify-center items-center shadow-lg border-2 border-gray-300 ${selectedOption === option.value ? 'bg-red-300 text-white' : 'bg-gray-100 text-gray-700 hover:text-white hover:bg-gray-300'}`}
                    onClick={() => onOptionChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default ToggleButtons;
