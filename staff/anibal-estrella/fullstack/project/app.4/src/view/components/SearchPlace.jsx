
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks'
import { keyPressUtils } from '../../logic/utilities'


import searchPlace from '../../logic/searchPlace';
import { Button } from '../library'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchPlace = () => {
    console.debug('// SearchPlace -> Render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [error, setError] = useState(null)

    const [placeName, setPlaceName] = useState('');
    const [placeDetails, setPlaceDetails] = useState(null);

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

    const handleCreatePlace = () => {
        console.log('Create new Place');
    }



    return (
        <div className='my-2'>
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
                    <ul>Result:</ul>

                    <table className=' w-full text-left'>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>city</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placeDetails.slice(0, 5).map((item) => (
                                <React.Fragment key={item.placeId}>
                                    <tr >
                                        <td>
                                            {item.homePage ? (
                                                <a
                                                    className="hover:text-red transition-all duration-300"
                                                    href={item.homePage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.name}
                                                </a>
                                            ) : (
                                                item.name
                                            )}
                                        </td>
                                        <td>{item.city}</td>
                                        <td>
                                            <Button>select</Button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <Button onClick={handleCreatePlace}>Create a new place</Button>

                </div >
            )}
        </div >
    );

};

export default SearchPlace;
