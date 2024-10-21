import React, { useState, useEffect } from 'react'
import { isUserLoggedIn } from './../../logic/users/'
import { useAppContext } from '../hooks'
import { Button } from '../library'



const CreateMenu = ({ user, handleClose, openDrawer }) => {
    const { navigate } = useAppContext()

    const [create, setCreate] = useState('hello');


    const handleCreateReview = () => {
        openDrawer()
        // setCreate('create review');
        navigate('/create-review')
    };

    const handleCreateEvent = () => {
        // setCreate('create event')
        openDrawer()
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
                                        <div className="flex flex-col rounded-2xl p-4 bg-pattern-02 bg-gray-300 hover:bg-gray-200 duration-300 bg-center h-48">
                                            <h3 className="text-4xl">Review an event</h3>
                                            <p>Fill up the fields, create event, text review, images, audio, video, score...</p>
                                            <Button onClick={handleCreateReview} className="mt-auto max-w-fit">
                                                Review Event
                                            </Button>
                                        </div>
                                        <div className="flex flex-col rounded-2xl p-4 bg-pattern-02 bg-gray-300 hover:bg-gray-200 duration-300 bg-right h-48">
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



            </section>
        </div>
    )
};

export default CreateMenu;
