import React, { useState, useEffect } from 'react'
import { isUserLoggedIn } from './../../logic/users/'
import { useAppContext } from '../hooks'
import { Button } from '../library'


// import { SearchArtistList as SearchArtist, SearchPlace } from '../components'
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Create = ({ city, ipGeoLocation, openDrawer, isDrawerOpen, user }) => {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error


    const [formData, setFormData] = useState({
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

    const handleCreate = () => {
        console.log('create!!!');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    }
    return <section id="create" className='p-4'>

        <div>
            {isUserLoggedIn() ? (
                <div>
                    {user &&
                        <h2>
                            {user.name}, What do you want to do?
                        </h2>
                    }
                </div>
            ) : (<> </>)}
        </div>

        <div className='grid gap-2 pt-4 md:grid-cols-2 mb-4'>
            <div className='flex flex-col rounded-2xl p-4  bg-pattern-02 bg-gray-300 hover:bg-gray-200 duration-300 bg-center h-60 '>
                <h3 className=' text-4xl'>Review an event</h3>
                <p>Fill up the fields, create event, text review, images, audio, video, score...</p>
                <Button onClick={handleCreate} className={' mt-auto max-w-fit'}>Create Review</Button>
            </div>
            <div className='flex flex-col rounded-2xl p-4  bg-pattern-02 bg-gray-300 hover:bg-gray-200 duration-300 bg-right h-60'>
                <h3 className=' text-4xl'>Create an event</h3>
                <p>Fill up the fields, date, place, poster, line up artists...</p>
                <Button onClick={handleCreate} className={'mt-auto max-w-fit'}>Create Event</Button>
            </div>
        </div>

    </section>

};

export default Create;
