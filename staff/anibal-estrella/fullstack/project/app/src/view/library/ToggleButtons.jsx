// src/components/ToggleButtons.js
import React from 'react';

const ToggleButtons = ({ options, selectedOption, onOptionChange }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    className={`flex text-sm px-4 py-4 rounded-full transition-all duration-200  uppercase justify-center shadow-lg border-2 border-gray-300 whitespace-nowrap min-w-fit ${selectedOption === option.value ? 'bg-red-300 text-white' : 'bg-gray-100 text-gray-700 hover:text-white hover:bg-gray-300'}`}
                    onClick={() => onOptionChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default ToggleButtons;
