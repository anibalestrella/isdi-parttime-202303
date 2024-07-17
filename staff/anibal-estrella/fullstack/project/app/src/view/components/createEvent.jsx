import React, { useState, useRef } from 'react';
import { createEvent } from '../../logic';
import { createBase64ImageObject, autosizeTextArea } from '../../logic/utilities';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '../library';
import { SelectDate, SearchArtistList as SearchArtist, MaxCharactersCounter, SearchPlace } from '../components';
import { useAppContext } from '../hooks'

export default function CreateEvent() {
    const { alert, confirm, freeze, unfreeze, navigate } = useAppContext();

    const lineUpRef = useRef(null);

    const [formData, setFormData] = useState({
        author: '',
        eventName: '',
        lineup: [],
        eventDates: '',
        eventPlace: '',
        eventDescription: '',
        eventPriceInCents: '',
        eventPoster: '',
        eventPosterUrl: '',
    });

    const [currentArtist, setCurrentArtist] = useState({
        artist: '',
        category: ''
    });

    const eventNameRef = useRef(null);
    const eventDescriptionRef = useRef(null);
    autosizeTextArea(eventNameRef.current, formData.eventName);
    autosizeTextArea(eventDescriptionRef.current, formData.eventDescription);


    const [eventPosterPreview, setEventPosterPreview] = useState("");
    const [eventPosterObject, setEventPosterObject] = useState(null);

    const handleAddArtist = () => {
        if (currentArtist.artist && currentArtist.category) {
            setFormData(prevState => ({
                ...prevState,
                lineup: [...prevState.lineup, currentArtist]
            }));
            setCurrentArtist({ artist: '', category: '' });
            console.log(currentArtist);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleArtistChange = (event) => {
        const { name, value } = event.target;
        setCurrentArtist(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEventPosterChange = async (event) => {
        let file;
        if (event.target.files && event.target.files[0]) {
            file = event.target.files[0];
        } else if (event.target.type === 'url') {
            file = event.target.value;
        }

        setFormData(prevState => ({ ...prevState, [event.target.name]: file }));

        if (file) {
            try {
                freeze();
                const eventPosterObject = await createBase64ImageObject(file);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const { author, eventPoster, eventName, eventDescription, lineup, eventDates, eventPlace, eventPriceInCents } = formData;
        console.log(formData);
        // createEvent(author, eventPoster, eventName, eventDescription, lineup, eventDates, eventPlace, eventPriceInCents);
    };



    return (
        <div id="create-event-container">
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
                    ></textarea>
                    {formData.eventDescription && (
                        <MaxCharactersCounter
                            value={formData.eventDescription}
                            maxChars={120}
                        />
                    )}
                </div>
                <div id='event-lineup' ref={lineUpRef}>
                    <h3>Line Up:</h3>
                    <SearchArtist
                        handleAddArtist={handleAddArtist}
                        handleArtistChange={handleArtistChange}
                        setCurrentArtist={setCurrentArtist}
                        currentArtist={currentArtist}
                        lineUpRef={lineUpRef}
                    />
                </div>

                <div id='event-date' className=''>
                    <h3>Dates:</h3>
                    <SelectDate />
                </div>
                <div id='event-place'>
                    <SearchPlace />
                </div>
                <div id='event-ticket-price'>
                    <h3>Ticket price:</h3>
                    <input type="text"
                        name="eventPriceInCents"
                        placeholder="Enter event ticket cost..."
                        value={formData.eventPriceInCents}
                        onChange={handleChange}
                    //required
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
                                placeholder="Enter an image URL : https://www.example.com "
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
            </form>
        </div>
    );
}
