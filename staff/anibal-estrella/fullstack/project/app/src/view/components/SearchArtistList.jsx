import React, { useState } from 'react';
import { useAppContext } from '../hooks'
import { keyPressUtils } from '../../logic/utilities'
import { searchArtist, retrieveArtistIDFromDiscogs } from '../../logic'
import { Button, ToggleButtons } from '../library'
import { MagnifyingGlassIcon, XCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

export default function SearchArtist({ handleAddArtist, setCurrentArtist }) {
    console.debug('// SearchArtist  -> Render')

    const { alert, freeze, unfreeze } = useAppContext()

    const [artistName, setArtistName] = useState('')
    const [searchArtistList, setSearchArtist] = useState(null)
    const [searchArtists, setSearchArtists] = useState(null)
    const [expandedArtists, setExpandedArtists] = useState({})
    const [selectedCategories, setSelectedCategories] = useState({})
    const [addedArtists, setAddedArtists] = useState([])


    const [error, setError] = useState(null)
    const [selectedArtistId, setSelectedArtistId] = useState(null)

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
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

    const handleToggleExpand = async (id) => {
        setExpandedArtists((prevExpanded) => ({
            ...prevExpanded,
            [id]: !prevExpanded[id],
        }));
        if (expandedArtists[id]) {
            setSelectedArtistId(null);
            setSearchArtists((prevState) => ({
                ...prevState,
                [id]: null,
            }));
        } else {
            setSelectedArtistId(id);
            await handleRetrieveArtistDetails(id);
        }
    };

    const handleRetrieveArtistDetails = async (artistId) => {
        try {
            freeze();
            const details = await retrieveArtistIDFromDiscogs(artistId);
            setSearchArtists((prevState) => ({
                ...prevState,
                [artistId]: details,
            }));
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${artistId}" was not found`);
            setSearchArtists((prevState) => ({
                ...prevState,
                [artistId]: null,
            }));
        } finally {
            unfreeze();
        }
    }

    const handleCategoryChange = (category, artistId) => {
        setSelectedCategories((prevCategories) => ({
            ...prevCategories,
            [artistId]: category,
        }));
    };

    const handleAddArtistWithCategory = (artistId) => {
        const category = selectedCategories[artistId];
        const artistDetails = searchArtists[artistId];
        setCurrentArtist({ artist: artistDetails.name, category: category });
        handleAddArtist(artistId, category);
        setAddedArtists((prevArtists) => [
            ...prevArtists,
            { id: artistId, name: artistDetails.name, category },
        ]);
    };

    const handleRemoveArtist = (artistId) => {
        setAddedArtists((prevArtists) =>
            prevArtists.filter((artist) => artist.id !== artistId)
        );
    };

    const categoryOptions = [
        { value: 'opener', label: 'Opener' },
        { value: 'headliner', label: 'Headliner' },
        { value: 'specialGuest', label: 'Special Guest' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <div id='search-artist'>
            <label>Search artist:</label>
            <div className='py-2'>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder="Enter artist name"
                        className='pl-4 w-full block'
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
                    <div id='artist-list' className='w-full'>
                        {searchArtistList.slice(0, 5).map((item) => (
                            <div id='artist-list-item' key={item.id} className={`p-2 ${selectedArtistId === item.id ? 'text-gray-300 bg-gray-100 rounded-xl ' : 'mt-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-300 hover:text-white'}`}>
                                <div className='flex justify-between items-center'>
                                    <div id='item-caption' className='pl-3 text-left uppercase'>
                                        {item.name}
                                    </div>
                                    <div className='text-right align-middle p-0'>
                                        <ChevronDownIcon className='h-6 w-6 cursor-pointer' onClick={() => handleToggleExpand(item.id)} />
                                    </div>
                                </div>
                                {expandedArtists[item.id] && searchArtists && searchArtists[item.id] && (
                                    <div className='pl-3 '>
                                        <div className='bg-gray-100 p-4 mt-4 '>
                                            {searchArtists[item.id].image && (
                                                <div className='mb-4 '>
                                                    <img className='w-full object-cover aspect-square grayscale rounded-lg border-4 border-gray-400' src={searchArtists[item.id].image} alt={searchArtists[item.id].name} />
                                                </div>
                                            )}
                                            <h2 className='font-light text-5xl text-gray-400'>{searchArtists[item.id].name}</h2>
                                            {searchArtists[item.id].bio && (
                                                <div>
                                                    <p className='text-gray-400' dangerouslySetInnerHTML={{ __html: searchArtists[item.id].bio }} />
                                                </div>
                                            )}
                                            <div className="flex gap-6 mt-6">
                                                <div>
                                                    <h3 className='text-gray-400'>Albums</h3>
                                                    <ul className='text-gray-400'>
                                                        {searchArtists[item.id].albums.slice(0, 5).map((album, index) => (
                                                            <li key={index}>{album}</li>
                                                        ))}
                                                        {searchArtists[item.id].albums.length > 5 && (
                                                            <li>
                                                                <a href={searchArtists[item.id].discogsUrl} className="hover:text-red transition-all duration-300" target="_blank">
                                                                    more ...
                                                                </a>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                                {searchArtists[item.id].urls && (
                                                    <div>
                                                        <h3 className='text-gray-400'>Links</h3>
                                                        <ul className='text-gray-400'>
                                                            {searchArtists[item.id].urls.map((url, index) => {
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

                                            <div id='artist-category ' className='my-4'>
                                                <h3>Choose Artist Category</h3>
                                                <ToggleButtons
                                                    options={categoryOptions}
                                                    selectedOption={selectedCategories[item.id] || ''}
                                                    onOptionChange={(category) => handleCategoryChange(category, item.id)}
                                                />
                                            </div>

                                            <div className='my-8'>
                                                <Button type="button" className="flex btn btn-primary w-full p-8 items-center justify-center" onClick={() => handleAddArtistWithCategory(item.id)} >
                                                    Add Artist
                                                </Button>
                                            </div>

                                            <div className='pt-4 pr-2 flex justify-end text-gray-400'>
                                                <a target="_blank" href={searchArtists[item.id].discogsUrl} className="hover:text-red transition-all duration-300 text-xs">
                                                    Find more {searchArtists[item.id].name}'s Info at Discogs.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>




            )}

            {addedArtists.length > 0 && (
                <div className='mt-8'>
                    <h3>Added Artists:</h3>
                    <ul className='list-disc pl-5'>
                        {addedArtists.map((artist) => (
                            <li key={artist.id} className='flex items-center justify-between'>
                                <span>{artist.name} - {artist.category}</span>
                                <XCircleIcon className='h-6 w-6 text-red-500 cursor-pointer' onClick={() => handleRemoveArtist(artist.id)} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
