import React from 'react';
import { Button } from '../library'

const EditPublishEventReview = ({ steps, currentStep, handleStepChange }) => {

    const handlePublish = (event) => {
        console.log('Publish');
    }
    return (
        <div className="steps-list mb-4">

            <h3 className="">Edit & Publish Event Review:</h3>
            <form action="" onSubmit={handlePublish}>
                <textarea
                    className=' w-full text-gray-300 font-normal p-4 text-base'
                    type="text" id="event-text" name="event-text" rows={20}
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                >
                </textarea>
                <Button onClick={handlePublish} className={'w-full mt-0 '}>Publish Event Review</Button>
            </form>
        </div >
    );
};

export default EditPublishEventReview;