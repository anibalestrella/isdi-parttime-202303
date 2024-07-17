import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks'
import { keyPressUtils } from '../../logic/utilities'

import { searchPlace, retrievePlaceDetails } from '../../logic';
import { Button } from '../library'
import { MagnifyingGlassIcon, XCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

/**
 * SearchPlace component allows users to search for places.
 * 
 * It provides a search bar for users to enter a place name, a search button to trigger the search, 
 * and displays the search results in a table format (limited to the first 5 results). 
 * The component also includes functionality to handle errors during search and the option to create a new place 
 * if the desired place is not found.
 * 
 */

export default function SearchPlace() {
    console.debug('// SearchPlace -> Render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [error, setError] = useState(null)

    const [placeName, setPlaceName] = useState('')
    const [placeResultList, setPlaceResultList] = useState(null)
    const [selectedPlaceId, setSelectedPlaceId] = useState(null)
    const [retrievedPlaceDetails, setRetrievedPlaceDetails] = useState(null)

    const handleInputChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handleSearchPlaces = async () => {
        try {
            freeze();
            const details = await searchPlace(placeName);
            setPlaceResultList(details);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Place "${placeName}" was not found`)
            setPlaceResultList(null);
        } finally {
            unfreeze();
        }
    };

    const handleSelectPlace = (placeId) => {
        if (selectedPlaceId === placeId) {
            setSelectedPlaceId(null);
            console.log('>>>' + { selectedPlaceId } + ' placeId: ' + placeId)
        } else {
            setSelectedPlaceId(placeId);
            console.log(">>> Selected Place ID >>> " + { selectedPlaceId })
        }
    }


    const handleRetrieveDetails = async (placeId) => {
        try {
            freeze();
            const details = await retrievePlaceDetails(placeId);
            setRetrievedPlaceDetails(details);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Place "${placeId}" was not found`);
            setRetrievedPlaceDetails(null);
        } finally {
            unfreeze();
            setSearchPlace(null);

        }
    }

    const handleCreatePlace = () => {
        console.log('Create new Place');
    }



    return <>
        <h3>Search place:</h3>
        <div id='search-place' className='my-2'>

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
                {error &&
                    <div className="full">

                        <p className="text-red-100 pt-4">{error}</p>
                        <Button onClick={handleCreatePlace}>Create a new place</Button>
                    </div>

                }
            </div>


            {placeResultList && !error && (
                <div>
                    <div className='w-full text-left'>
                        {placeResultList.slice(0, 5).map((item) => (
                            <React.Fragment key={item.placeId}>
                                <div className={selectedPlaceId === item.placeId ? 'bg-gray-100 hover:text-gray-300 flex items-center' : 'hover:bg-gray-100 p-0 hover:text-gray-300 flex items-center cursor-pointer'} onClick={() => handleRetrieveDetails(item.placeId)}>
                                    <div className="pl-3 text-left flex-1">
                                        {item.homePage ? (
                                            <a className="hover:text-red transition-all duration-300"
                                                href={item.homePage}
                                                target="_blank"
                                                rel="noopener noreferrer" >
                                                {item.name}
                                            </a>) : (item.name)}
                                    </div>
                                    <div className="flex-1">
                                        {item.city}
                                    </div>
                                    <div className='text-right align-middle p-0 group-hover:animate-bounce [animation-delay:-0.15s]'>
                                        <ChevronDownIcon className='h-6 w-6 ' title={`Expand for ${item.name}\'s details `} />
                                    </div>
                                    <div className="text-right align-middle p-2" >
                                        {retrievedPlaceDetails && (
                                            <div className="rounded-xl bg-gray-100 p-4">

                                                <h3 className=' text-gray-400 '>
                                                    {retrievedPlaceDetails.name}
                                                </h3>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <p className='mt-4'>Place you're looking for is not in the list?</p>
                    <Button onClick={handleCreatePlace}>Create a new place</Button>
                </div>
            )}


        </div>
    </>
};
