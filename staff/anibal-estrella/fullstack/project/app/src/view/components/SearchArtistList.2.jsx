import React, { useState } from 'react';
import { useAppContext } from '../hooks'
import { keyPressUtils } from '../../logic/utilities'


import searchArtist from '../../logic/searchArtist'
import retrieveIdArtistDetailsFromDiscogs from '../../logic/retrieveIdArtistDetailsFromDiscogs'

import { Button } from '../library'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function SearchArtist({ handleChange }) {
    console.debug('// SearchArtist  -> Render')

    const { alert, freeze, unfreeze } = useAppContext()

    const [artistName, setArtistName] = useState('')

    const [searchArtistList, setSearchArtist] = useState(null)
    const [searchArtists, setSearchArtists] = useState(null);

    const [error, setError] = useState(null)
    const [selectedArtistId, setSelectedArtistId] = useState(null)

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
        // handleChange(event);
    };

    const handleRetrieveArtistsList = async () => {
        try {
            freeze();
            const artistList = await searchArtist(artistName);
            setSearchArtist(artistList);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${artistName}" was not found`);
            setSearchArtist(null);
        } finally {
            setSelectedArtistId(null)
            unfreeze();

        }
    }

    const handleSelectArtist = (id) => { // New handler
        if (selectedArtistId === id) {
            setSelectedArtistId(null);
            console.log('>>>' + { selectedArtistId } + ' id ' + id)
        } else {
            setSelectedArtistId(id);
            console.log(">>> Selected Artist ID >>> " + { selectedArtistId })
        }
    }

    const handleRetrieveDetails = async (artistId) => {
        try {
            freeze();
            const details = await retrieveIdArtistDetailsFromDiscogs(artistId);
            setSearchArtists(details);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${artistId}" was not found`);
            setSearchArtists(null);
        } finally {
            unfreeze();
            setSearchArtist(null);

        }
    }

    return <div id='search-artist'>
        <h3>Search artist:</h3>
        <div className='py-2'>
            <div className='relative'>

                <input
                    type="text"
                    placeholder="Enter artist name"
                    className='pl-4 w-full block '
                    value={artistName}
                    onChange={handleInputChange}
                    onKeyDown={(event) => keyPressUtils(event, handleRetrieveArtistsList)}
                />

                <span className='absolute top-3 right-3 h-6 w-6 rounded-full cursor-pointer' onClick={handleRetrieveArtistsList}>
                    <MagnifyingGlassIcon className='text-gray-500 ' />
                </span>
                <Button onClick={handleRetrieveArtistsList}>Search Artist</Button>
                {error && <p className="text-red-100 pt-4">{error}</p>}
            </div>

        </div>


        {searchArtistList && !error && (
            <div className='mt-4'>
                <h3>Select Artist:</h3>
                <table className=' w-full '>
                    <thead className=''>
                        {/* <tr>
                            <th>artistName</th>
                            <th>ID</th>
                            <th>action</th>
                        </tr> */}
                    </thead>
                    <tbody>
                        {searchArtistList.slice(0, 5).map((item) => (
                            <React.Fragment key={item.id}>
                                <tr className={selectedArtistId === item.id ? 'p-2 text-gray-300 bg-gray-100 hover:text-gray-300' : ' hover:bg-gray-100  hover:text-gray-300'}>
                                    <td className='pl-3 text-left '>{item.name}  </td>
                                    {/* <td className='pl-3 text-left hover:bg-gray-300'> {item.id} </td> */}
                                    <td className=' text-right align-middle p-0'>
                                        {/* If the artist is selected */}
                                        {selectedArtistId === item.id && (
                                            <span>
                                                <Button className={' w-fit my-2 mr-2 text-gray-100'} onClick={() => handleSelectArtist(item.id)}>
                                                    Unselect
                                                </Button>

                                                <Button className={'w-fit my-2 mr-2 text-gray-100'} onClick={() => handleRetrieveDetails(item.id)}>
                                                    next
                                                </Button>

                                            </span>
                                        )}

                                        {/* If no artist is selected or the current artist is not the one selected */}
                                        {selectedArtistId !== item.id && (

                                            <Button
                                                onClick={() => handleSelectArtist(item.id)}
                                                className={selectedArtistId ? ' opacity-10 align-middle hover:opacity-10 hover:text-white' : 'text-gray-100 hover:text-white my-2 mr-2'}
                                                disabled={!!selectedArtistId}>
                                                Select
                                            </Button>

                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {searchArtists && !error && (
            <div className=' bg-gray-100 p-4 rounded-lg'>
                {searchArtists.image && (
                    <div className=' mb-4'>
                        <img className='w-full object-cover aspect-square grayscale rounded-lg border-4 border-gray-400' src={searchArtists.image} alt={searchArtists.name} />
                    </div>
                )}
                <h2 className=' font-light text-5xl text-gray-400'>{searchArtists.name}</h2>
                {/* <h3>From: {searchArtists.from}</h3> */}

                {searchArtists.bio && (
                    <div>
                        <p className='text-gray-400' dangerouslySetInnerHTML={{ __html: searchArtists.bio }} />
                    </div>
                )}
                <div className="flex gap-6 mt-6" >
                    <div>
                        <h3 className='text-gray-400'>Albums</h3>
                        <ul className='text-gray-400'>
                            {searchArtists.albums.slice(0, 5).map((album, index) => (
                                <li key={index}>
                                    {album}
                                </li>
                            ))}
                            {searchArtists.albums.length > 5 && <li>
                                <a
                                    href={searchArtists.discogsUrl}
                                    className="hover:text-red transition-all duration-300"
                                    target="_blank"
                                >
                                    more ...
                                </a>
                            </li>
                            }
                        </ul>
                    </div>

                    {searchArtists.urls && (
                        <div>
                            <h3 className='text-gray-400'>Links</h3>
                            <ul className='text-gray-400'>
                                {searchArtists.urls.map((url, index) => {
                                    const urlObject = new URL(url)
                                    const siteName = urlObject.hostname.replace('www.', '')
                                    return (
                                        <li key={index}>
                                            <a href={url} className="hover:text-red transition-all duration-300" target="_blank">{siteName}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <Button onClick={() => handleSelectArtist(searchArtists.discogsId)} className={''}>
                    Select Artist
                </Button>

                <div className='pt-4 pr-2 flex justify-end text-gray-400'  >
                    <a
                        target="_blank"
                        href={searchArtists.discogsUrl}
                        className="hover:text-red transition-all duration-300 text-xs"
                    >
                        Find more {searchArtists.name}'s Info at Discogs.com
                    </a>
                </div>
            </div>
        )}
    </div>
};

