import React, { useState } from 'react'
import { useAppContext } from '../hooks'
import { Button } from '../library'
import { SearchArtistList as SearchArtist, SearchPlace, UploadMedia, EditPublishEventReview, CreateStepsList } from './'

/**
 * CreateEventReview component handles the multi-step process of creating an event review.
 * 
 * @prop {number} currentStep - Current step in the process (1-based indexing).
 * @prop {function} handleNextStep - Function called to move to the next step.
 * @prop {function} handlePreviousStep - Function called to move to the previous step.
 * @prop {function} handleChange - Function to handle form input changes.
 * @prop {object} eventReviewFormData - Object containing current event review data.
 * @prop {function} handleFileChange - Function to handle file upload changes.
 * @prop {function} handleCancelCreate - Function called to cancel the review creation process.
 * 
 * @returns {JSX.Element} - JSX element representing the component.
 */

function CreateEventReview({ handleCancelCreate, user }) {
    console.log('CreateEventReview => RENDER');

    const { alert, confirm, freeze, unfreeze, navigate } = useAppContext()


    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const [eventReviewFormData, setEventReviewFormData] = useState({
        author: '',
        poster: '',
        name: '',
        description: '',
        lineUp: [],
        dates: [],
        place: '',
        price: 0,
        likes: [],
        eventReviews: []
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setEventReviewFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const steps = ['Search Artist', 'Search Place', 'Upload Image', 'Publish Event'];
    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const handleStepChange = (step) => {
        setCurrentStep(step);
    };

    const [stepData, setStepData] = useState({
        step1: {},
        step2: {},
        step3: {},
        step4: {},
    });

    const handleCancelCreateClick = () => {
        setStepData({
            step1: {},
            step2: {},
            step3: {},
            step4: {}
        });
        // prompt for review
        const actionType = 'create'
        confirm(`${user.name}, are you sure you want leave your event review creation? `, actionType);
    };


    const handleSubmit = (event, data) => {
        evnt.preventDefault();
        setStepData(prevData => ({
            ...prevData,
            [`step${currentStep}`]: data
        }));
        console.log(stepData);
    };



    return <>
        {/* {currentStep > 1 && (
            )} */}
        <div>
            <CreateStepsList steps={steps} currentStep={currentStep} handleStepChange={handleStepChange} />
        </div>
        <h2>create Event Review:</h2>
        <div id='create-event-review' className='flex flex-col p-2'>
            <div className='flex flex-col rounded-2xl p-4  bg-pattern-02 bg-gray-300 duration-300 bg-center h-auto'>
                {currentStep === 1 && <SearchArtist handleChange={handleChange} eventReviewFormData={eventReviewFormData} />}
                {currentStep === 2 && <SearchPlace handleChange={handleChange} eventReviewFormData={eventReviewFormData} />}
                {currentStep === 3 && <UploadMedia eventReviewFormData={eventReviewFormData} />}
                {currentStep === 4 && <EditPublishEventReview eventReviewFormData={eventReviewFormData} />}
            </div>

            <div className='flex justify-between mt-4'>
                <Button onClick={handleCancelCreateClick} className={'button-cancel hover:button-cancel-hover'}>
                    Cancel
                </Button>
                {currentStep > 2 && (
                    <Button onClick={() => handlePreviousStep(eventReviewFormData)} className="mt-auto max-w-fit">
                        Previous
                    </Button>
                )}
                {currentStep < 4 && (
                    <Button onClick={() => handleNextStep(eventReviewFormData)} className="mt-auto max-w-fit">
                        Next
                    </Button>
                )}
            </div>
        </div>
    </>
        ;
}



export default CreateEventReview
