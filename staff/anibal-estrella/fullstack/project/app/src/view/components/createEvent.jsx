import React, { useState, useRef } from 'react';
import { createEvent } from '../../logic';
import { isUserLoggedIn } from '../../logic/users/';
import { createBase64ImageObject, autosizeTextArea } from '../../logic/utilities';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '../library';
import { SelectDate, SearchArtistList as SearchArtist, MaxCharactersCounter, SearchPlace } from '../components';
import { useAppContext } from '../hooks';

export default function CreateEvent({ handleCancelCreate, user }) {
    const { alert, confirm, freeze, unfreeze, navigate } = useAppContext();

    const lineUpRef = useRef(null);

    const [formData, setFormData] = useState({
        author: '',
        eventName: '',
        eventLineup: [],
        eventDates: '',
        eventPlace: '',
        eventDescription: '',
        eventPrice: '',
        eventPoster: '',
        eventPosterUrl: '',
    });

    const [currentArtist, setCurrentArtist] = useState({
        artist: '',
        name: '',
        category: '',
        discogsUrl: '',
        image: '',
        albums: [],
        bio: '',
        urls: [],
    });

    const eventNameRef = useRef(null);
    const eventDescriptionRef = useRef(null);
    autosizeTextArea(eventNameRef.current, formData.eventName);
    autosizeTextArea(eventDescriptionRef.current, formData.eventDescription);

    const [eventPosterPreview, setEventPosterPreview] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleArtistChange = (event) => {
        const { name, value } = event.target;
        console.log(`Updating ${name} to ${value}`); // Log the name and value being set
        setCurrentArtist(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddArtist = (currentArtistDetails) => {

        if (currentArtistDetails.artist && currentArtistDetails.category) {

            setFormData(prevState => {
                const updatedLineup = [...prevState.eventLineup, currentArtistDetails];

                return { ...prevState, eventLineup: updatedLineup };
            });
            console.log("Updated Lineup:", formData.eventLineup);

            setCurrentArtist({
                artist: '',
                name: '',
                category: '',
                discogsUrl: '',
                image: '',
                albums: [],
                bio: '',
                urls: [],
            });
        } else {
            console.warn("Artist or category is missing, cannot add to lineup.");
        }
    };
    const handleAddPlace = (place) => {
        setFormData(prevState => ({
            ...prevState,
            eventPlace: place
        }));
        console.log("Added Place:", formData.eventPlace);

    };
    const handleEventPosterChange = async (event) => {
        let file, imageUrl;

        if (event.target.type === 'file' && event.target.files && event.target.files[0]) {
            file = event.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                eventPoster: file,
                eventPosterUrl: '', // Clear URL input if file is selected
            }));
        } else if (event.target.type === 'url') {
            imageUrl = event.target.value;
            setFormData(prevState => ({
                ...prevState,
                eventPosterUrl: imageUrl,
                eventPoster: '', // Clear file input if URL is selected
            }));
        }

        if (file || imageUrl) {
            try {
                freeze();
                const eventPosterObject = await createBase64ImageObject(file || imageUrl);
                setEventPosterPreview(eventPosterObject.file);
            } catch (error) {
                console.error('Error converting file to base64:', error);
                alert(error.message);
            }
            unfreeze();
        }
    };

    const handleRemovePoster = () => {
        setEventPosterPreview('');
        setFormData(prevState => ({
            ...prevState,
            eventPoster: '',
            eventPosterUrl: ''
        }));
    };
    const handleRemoveArtist = (artistId) => {
        setFormData(prevState => {
            const updatedLineup = prevState.eventLineup.filter(artist => artist.artistId !== artistId);
            return { ...prevState, eventLineup: updatedLineup };
        });
    };
    const handleRemovePlace = (placeId) => {
        console.log("Removed Place:", placeId);
    };

    const handleDateChange = (selectedDate) => {
        setFormData((prevState) => ({
            ...prevState,
            eventDates: selectedDate, // Update the eventDates with the selected date
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { author, eventPoster, eventName, eventDescription, eventLineup, eventDates, eventPlace, eventPrice } = formData;


        if (eventLineup.length === 0) {
            alert("Please add at least one artist to the lineup.")
            return;
        }

        if (!eventPlace) {
            alert("Please select a place for the event.");
            return;
        }
        try {
            freeze();
            createEvent(author, eventPoster, eventName, eventDescription, eventLineup, eventDates, eventPlace, eventPrice)
                .then(() => {
                    alert(`Thank you ${user.name}!\n you have successfully created event: ${eventName}`);
                })
                .catch(error => alert(error.message));
        } catch (error) {
            alert(error.message);
        }
        unfreeze();
    };

    const handleCancelCreateClick = () => {
        const actionType = 'create';
        confirm(`${user.name}, are you sure you want to leave your event creation? `, actionType);
    };

    return (
        <div id="create-event-container" className='p-4'>
            {isUserLoggedIn() ? (
                <>
                    <p>Hi {user && user.name}!</p>
                    <h2>Create Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div id='event-name'>
                            <h3>Name:</h3>
                            <textarea
                                name="eventName"
                                placeholder="Write a name for this event..."
                                value={formData.eventName}
                                onChange={handleChange}
                                ref={eventNameRef}
                                className='h-14'
                            ></textarea>
                        </div>
                        <div id='event-description'>
                            <h3>Description:</h3>
                            <textarea
                                name="eventDescription"
                                placeholder="Describe the event using no more than 120 characters..."
                                value={formData.eventDescription}
                                onChange={handleChange}
                                ref={eventDescriptionRef}
                                className='h-14'
                            ></textarea>
                            {formData.eventDescription && (
                                <MaxCharactersCounter
                                    value={formData.eventDescription}
                                    maxChars={120}
                                />
                            )}
                        </div>
                        <div id='event-lineUp' ref={lineUpRef}>
                            <h3>Line Up:</h3>
                            <SearchArtist
                                handleAddArtist={handleAddArtist}
                                removeArtistFromParent={handleRemoveArtist}
                                handleArtistChange={handleArtistChange}
                                setCurrentArtist={setCurrentArtist}
                                currentArtist={currentArtist}
                                lineUpRef={lineUpRef}
                            />
                        </div>
                        <div id='event-place'>
                            <h3>Place:</h3>

                            <SearchPlace onAddPlace={handleAddPlace} />
                            {formData.eventPlace && (
                                // <p>Selected place: {formData.eventPlace.name} ({formData.eventPlace.city})</p>
                                <div id={`place-selected}`} className='flex items-center uppercase justify-between mt-2 pr-2  text-gray-300 font-normal bg-lime-100  rounded-xl text-lg ' >
                                    <span className='bg-red-100 text-white py-2 px-4 rounded-s-xl  '>{formData.eventPlace.city} place:</span> <span className='pl-3  '>{formData.eventPlace.name} </span>
                                    <XCircleIcon className='h-6 w-6 text-gray-300 hover:text-red-100 cursor-pointer' onClick={() => handleRemovePlace(formData.eventPlace.placeId)} />
                                </div>
                            )}
                        </div>
                        <div id='event-date'>
                            <h3>Dates:</h3>
                            <SelectDate onDateChange={handleDateChange} />
                        </div>
                        <div id='event-ticket-price'>
                            <h3>Ticket price:</h3>
                            <input
                                type="text"
                                name="eventPrice"
                                placeholder="Enter event ticket cost..."
                                value={formData.eventPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div id='event-poster' className="flex flex-col">
                            <h3>Event Poster:</h3>
                            <div className="grid grid-flow-row">
                                <label htmlFor='eventPoster'>
                                    <input
                                        onChange={handleEventPosterChange}
                                        id='eventPoster'
                                        type='file'
                                        name='eventPoster'
                                        accept="image/*"
                                        className='w-full h-11 text-sm pl-0 file:h-11 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs transition-all ease-in-out duration-300 file:text-white file:uppercase file:bg-lime-300 file:hover:drop-shadow-lg file:hover:bg-lime-200 file:active:drop-shadow-none active:bg-gray-100'
                                    />
                                    <input
                                        type="url"
                                        id="eventPosterUrl"
                                        placeholder="Enter an image URL: https://www.example.com"
                                        name="eventPosterUrl"
                                        value={formData.eventPosterUrl}
                                        onChange={handleEventPosterChange}
                                    />
                                </label>
                                {eventPosterPreview && (
                                    <div className="w-full">
                                        <div className="relative">
                                            <XCircleIcon className='w-8 h-8 absolute top-0 right-0 hover:text-red-100 cursor-pointer drop-shadow-lg text-lime-200' onClick={handleRemovePoster} />
                                            <img className="aspect-auto object-cover rounded-xl transition duration-150 mr-2 bg-gray-200" src={eventPosterPreview} alt='Event poster' />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button type="submit">Create Event</Button>
                        <Button onClick={handleCancelCreateClick} className={'button-cancel hover:button-cancel-hover'}>
                            Cancel
                        </Button>
                    </form>
                </>
            ) : (
                <p>Hi! please <a href="/login">Login</a> to create an event </p>
            )}
        </div>
    );
}