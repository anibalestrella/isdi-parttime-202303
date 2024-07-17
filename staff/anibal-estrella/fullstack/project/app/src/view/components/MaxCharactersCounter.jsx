// maxCharactersCounter.js

import React from 'react';

/**
 * A component that displays the remaining character count for a text input.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the text input.
 * @param {number} props.maxChars - The maximum number of characters allowed.
 * @returns {JSX.Element} The character counter component.
 */
const MaxCharactersCounter = ({ value, maxChars }) => {
    const charsRemaining = maxChars - value.length;
    const isExceeded = charsRemaining < 0;

    return (
        <div className={`mb-4 text-xs py-1 px-4 rounded-lg bg-gray-100 flex`}>
            <span className="text-left text-gray-300 uppercase flex-1">

                characters remaining:
            </span>
            <span className={`flex-1 text-right ${isExceeded ? 'text-red-300' : 'text-gray-300'}`}>

                {charsRemaining}
            </span>
        </div>
    );
};

export default MaxCharactersCounter;
