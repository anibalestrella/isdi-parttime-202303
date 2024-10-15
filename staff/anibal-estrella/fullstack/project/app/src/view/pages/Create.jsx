import React, { useState, useEffect } from 'react'
import { isUserLoggedIn } from './../../logic/users/'
import { useAppContext } from '../hooks'
import { Button } from '../library'
import { CreateEventReview, CreateStepsList, CreateEvent } from '../components'

/**
 * Create.jsx component allows users to either create a review or create an event.
 * 
 * @prop {string} city - City where the user is located (likely passed as props).
 * @prop {object} ipGeoLocation - IP geolocation data (likely passed as props).
 * @prop {function} openDrawer - Function to open the drawer (likely passed as props).
 * @prop {boolean} isDrawerOpen - Flag indicating if the drawer is open (likely passed as props).
 * @prop {object} user - User object containing user information (likely passed as props).
 */

const Create = ({ city, ipGeoLocation, openDrawer, isDrawerOpen, user, handleCancelCreate }) => {
    const { alert, freeze, unfreeze, inlineFreeze, navigate, confirm } = useAppContext()

    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    const [create, setCreate] = useState('hello');


    const handleCreateReview = () => {
        // setCreate('create review');
        navigate('/create-review')
    };

    const handleCreateEvent = () => {
        // setCreate('create event')
        navigate('/create-event')
    };


    return (
        <div>
            <section id="create" className='p-4'>

                {create === 'hello' && (
                    <div>
                        <div>
                            {isUserLoggedIn() ? (
                                <div>
                                    {user && (
                                        <h2>{user.name}, What do you want to do?</h2>
                                    )}
                                    <div className="grid gap-2 pt-4 md:grid-cols-2 mb-4">
                                        <div className="flex flex-col rounded-2xl p-4 bg-pattern-02 bg-gray-300 hover:bg-gray-200 duration-300 bg-center h-60">
                                            <h3 className="text-4xl">Review an event</h3>
                                            <p>Fill up the fields, create event, text review, images, audio, video, score...</p>
                                            <Button onClick={handleCreateReview} className="mt-auto max-w-fit">
                                                Create Review
                                            </Button>
                                        </div>
                                        <div className="flex flex-col rounded-2xl p-4 bg-pattern-02 bg-gray-300 hover:bg-gray-200 duration-300 bg-right h-60">
                                            <h3 className="text-4xl">Create an event</h3>
                                            <p>Fill up the fields, date, place, poster, line up artists...</p>
                                            <Button onClick={handleCreateEvent} className="mt-auto max-w-fit">
                                                Create Event
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p>Hi! please <a href="/login" className='text-blue-500 underline'>Login</a> to create an event </p>
                                </>
                            )}
                        </div>

                    </div>
                )}

                {create === 'create review' && (
                    <div>


                        <CreateEventReview
                            handleCancelCreate={handleCancelCreate}
                            user={user}
                        />

                    </div>
                )}
                {create === 'create event' && (
                    <CreateEvent handleCancelCreate={handleCancelCreate} user={user}
                    />)}


            </section>
        </div>
    )
};

export default Create;
