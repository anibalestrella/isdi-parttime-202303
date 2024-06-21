
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks'
import { keyPressUtils } from '../../logic/utilities'


import { searchPlace, retrievePlaceDetails } from '../../logic';
import { Button } from '../library'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

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
    const [placeDetails, setPlaceDetails] = useState(null)
    const [selectedPlaceId, setSelectedPlaceId] = useState(null)
    const [searchAPlace, setSearchAPlace] = useState(null)

    const handleInputChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handleSearchPlaces = async () => {
        try {
            freeze();
            const details = await searchPlace(placeName);
            setPlaceDetails(details);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Place "${placeName}" was not found`)
            setPlaceDetails(null);
        } finally {
            unfreeze();
        }
    };

    const handleSelectPlace = (placeId) => { // New handler
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
            setSearchAPlace(details);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Place "${placeId}" was not found`);
            setSearchAPlace(null);
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
                    <p className="text-red-100 pt-4">{error}</p>
                }
            </div>


            {placeDetails && !error && (
                <div>
                    <table className=' w-full text-left'>

                        <tbody>
                            {placeDetails.slice(0, 5).map((item) => (
                                <React.Fragment key={item.placeId}>
                                    <tr className={selectedPlaceId === item.placeId ? ' bg-gray-100 hover:text-gray-300' : ' hover:bg-gray-100 p-0 hover:text-gray-300'} >
                                        <td class="pl-3 text-left">
                                            {item.homePage ? (<a className="hover:text-red transition-all duration-300"
                                                href={item.homePage}
                                                target="_blank"
                                                rel="noopener noreferrer" >
                                                {item.name}
                                            </a>) : (item.name)}
                                        </td>
                                        <td>{item.city}</td>
                                        <td class=" text-right align-middle p-2">
                                            {selectedPlaceId === item.placeId && (
                                                <span>
                                                    <Button className={' w-fit mt-0 mr-4'} onClick={() => handleSelectPlace(item.placeId)}>
                                                        Unselect
                                                    </Button>

                                                    <Button className={'w-fit mt-0'} onClick={() => handleRetrieveDetails(item.placeId)}>
                                                        next
                                                    </Button>

                                                </span>
                                            )}

                                            {selectedPlaceId !== item.placeId && (

                                                <Button
                                                    onClick={() => handleSelectPlace(item.placeId)}
                                                    className={selectedPlaceId ? '  opacity-10 align-middle hover:opacity-10 hover:text-white' : 'text-gray-100 hover:text-white'}
                                                    disabled={!!selectedPlaceId}>
                                                    Select
                                                </Button>

                                            )}                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <p className='mt-4 '>Place you're looking for is not in the list?</p>
                    <Button onClick={handleCreatePlace}>Create a new place</Button>

                </div >
            )}
        </div >

    </>
};

