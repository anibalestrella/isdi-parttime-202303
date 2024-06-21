import React from 'react';
/**
 * CreateStepsList component renders a visual representation of steps in a process.
 * 
 * @prop {string[]} steps - An array of strings representing the names of each step.
 * @prop {number} currentStep - The currently active step (1-based indexing).
 * @prop {function(number)} handleStepChange - Function called when a step is clicked, takes the index of the clicked step (1-based indexing).
 * 
 * @returns {JSX.Element} - JSX element representing the steps list.
 */

const CreateStepsList = ({ steps, currentStep, handleStepChange }) => {
    return (
        <div className="steps-list flex justify-between mb-4">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step-item p-2
                    ${currentStep === index + 1 ? '  font-bold cursor-pointer' : 'font-thin'}
                    ${index + 1 <= currentStep ? 'clickable cursor-pointer text-white' : 'not-clickable text-gray-200 cursor-default'}
                    ${index > currentStep ? ' text-gray-100 ' : ' '}}`}
                    onClick={() => currentStep >= index + 1 && handleStepChange(index + 1)}
                >
                    {step}
                </div>
            ))}
        </div>
    );
};

export default CreateStepsList;