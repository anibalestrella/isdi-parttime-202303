import React, { useState } from 'react';
import { useAppContext } from '../hooks';
import { keyPressUtils } from '../../logic/utilities';
import { searchPlace, retrievePlaceDetails } from '../../logic';
import { Button, InlineLoader } from '../library';
import { GoogleMapsContainer } from '../components';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function SearchPlace({ onAddPlace }) {
    console.debug('// SearchPlace -> Render');

    const { alert, freeze, unfreeze, inlineFreeze } = useAppContext();

    const [useInlineLoader, setUseInlineLoader] = useState(false);
    const [error, setError] = useState(null);
    const [placeName, setPlaceName] = useState('');
    const [placeResultList, setPlaceResultList] = useState(null);
    const [expandedItem, setExpandedItem] = useState(null);
    const [retrievedPlaceDetails, setRetrievedPlaceDetails] = useState({});

    // New state to track the added place
    const [addedPlace, setAddedPlace] = useState(null);

    const handleInputChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handleSearchPlaces = async (event) => {
        event.preventDefault();
        try {
            const details = await searchPlace(placeName);
            setPlaceResultList(details);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Place "${placeName}" was not found`);
            setPlaceResultList(null);
        } finally {
            unfreeze();
        }
    };

    const handleAddPlace = (placeId) => {
        const place = placeResultList.find(item => item.placeId === placeId);
        if (place) {
            onAddPlace(place);  // Calls the parent's function to add the place
            setAddedPlace(placeId); // Update the added place
            setExpandedItem(null);  // Close the expanded item after selection
            setPlaceResultList(null);  // Clear the place results and search form
        }
        setPlaceName('');
    };

    const handleRetrieveDetails = async (placeId) => {
        try {
            setUseInlineLoader(true);
            inlineFreeze();
            const details = await retrievePlaceDetails(placeId);
            setRetrievedPlaceDetails((prevDetails) => ({
                ...prevDetails,
                [placeId]: details,
            }));
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Place "${placeId}" was not found`);
            setRetrievedPlaceDetails((prevDetails) => ({
                ...prevDetails,
                [placeId]: null,
            }));
        } finally {
            setUseInlineLoader(false);
        }
    };

    const handleCreatePlace = () => {
        console.log('Create new Place');
    };

    const handleToggleExpand = async (id) => {
        setExpandedItem((prevExpandedItem) => (prevExpandedItem === id ? null : id));

        // Retrieve details if the item is expanded and details are not already fetched
        if (expandedItem !== id && !retrievedPlaceDetails[id]) {
            await handleRetrieveDetails(id);
        }
    };

    return (
        <>
            <div id='search-place' className='my-2'>
                {/* Conditionally render the search form and results */}
                {!addedPlace && (
                    <div className="relative">
                        <input
                            className='pl-4 w-full block'
                            type="text"
                            value={placeName}
                            onChange={handleInputChange}
                            onKeyDown={(event) => keyPressUtils(event, handleSearchPlaces)}
                            placeholder="Enter place name" />
                        <span className='absolute top-3 right-3 h-6 w-6 rounded-full cursor-pointer'>
                            <MagnifyingGlassIcon className='text-gray-500 ' />
                        </span>
                        <Button onClick={handleSearchPlaces}>Search for a place</Button>
                        {error && (
                            <div className="full">
                                <p className="text-red-100 pt-4">{error}</p>
                                <Button onClick={handleCreatePlace}>Create a new place</Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Search results */}
                {placeResultList && !error && !addedPlace && (
                    <div id='place-list' className='w-full text-left'>
                        {placeResultList.slice(0, 5).map((item) => (
                            <React.Fragment key={item.placeId}>
                                <div id={`place-item-${item.placeId}`}
                                    className={`mt-2 hover:pl-8 hover:bg-gray-80 py-2 px-2 transition-all duration-100 cursor-pointer group uppercase ${expandedItem === item.placeId ? 'text-gray-300 bg-gray-80 rounded-xl ' : 'rounded-xl bg-gray-100  text-gray-300 '}`}
                                    onClick={() => handleToggleExpand(item.placeId)}
                                >
                                    <div className=''>
                                        <div id={`place-item-caption-${item.placeId}`} className="pl-3 flex row justify-between items-center">
                                            {expandedItem === item.placeId && retrievedPlaceDetails[item.placeId] ? (
                                                <div className=' invisible'>
                                                    {item.name + " | "}
                                                    <span className='font-light'>
                                                        {item.city}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className=''>
                                                    {item.name + " | "}
                                                    <span className='font-light'>
                                                        {item.city}
                                                    </span>
                                                </div>
                                            )}

                                            {expandedItem === item.placeId && useInlineLoader ? <InlineLoader /> : ''}

                                            <span className='align-middle p-0 group-hover:animate-bounce'>
                                                <ChevronDownIcon className='h-6 w-6' title={`Expand for ${item.name}'s details`} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {expandedItem === item.placeId && retrievedPlaceDetails[item.placeId] && (
                                    <div className="rounded-xl bg-gray-100 p-4">
                                        <p className='text-gray-400'>{retrievedPlaceDetails[item.placeId].type}</p>
                                        <h3 className='text-gray-400'>
                                            {retrievedPlaceDetails[item.placeId].name}
                                        </h3>
                                        <p className='text-gray-400'> {retrievedPlaceDetails[item.placeId].city}, {retrievedPlaceDetails[item.placeId].address}</p>
                                        {retrievedPlaceDetails[item.placeId].geolocationCoordinates ? (
                                            <div>
                                                <GoogleMapsContainer
                                                    lat={retrievedPlaceDetails[item.placeId].geolocationCoordinates.latitude}
                                                    lng={retrievedPlaceDetails[item.placeId].geolocationCoordinates.longitude}
                                                />
                                            </div>
                                        ) : (
                                            <span className='text-gray-400'>
                                                Info2: {item.name}
                                            </span>
                                        )}
                                        <div className='my-2'>
                                            <Button
                                                type="button"
                                                className="flex btn btn-primary w-full p-8 items-center justify-center text-white text-xl"
                                                onClick={() => handleAddPlace(item.placeId)} >
                                                {/* Update button text based on addedPlace state */}
                                                {addedPlace === item.placeId ? `${item.name} just added to Line Up` : `Add ${item.name} to Line Up`}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        <p className='mt-4'>Place you're looking for is not in the list?</p>
                        <Button onClick={handleCreatePlace}>Create a new place</Button>
                    </div>
                )}
            </div>
        </>
    );
}