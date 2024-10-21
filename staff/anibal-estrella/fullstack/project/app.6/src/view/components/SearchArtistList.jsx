import React, { useState, useRef } from 'react';
import { useAppContext } from '../hooks';
import { keyPressUtils } from '../../logic/utilities';
import { searchArtistDiscogs, retrieveArtistDetailsFromDiscogs, searchArtistSpotify } from '../../logic';
import { Button, ToggleButtons, InlineLoader } from '../library';
import { MagnifyingGlassIcon, XCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function SearchArtist({ handleAddArtist, setCurrentArtist, lineUpRef, removeArtistFromParent }) {
    const { alert, freeze, unfreeze, inlineFreeze } = useAppContext();
    const [useInlineLoader, setUseInlineLoader] = useState(false);

    const [artistName, setArtistName] = useState('');
    const [searchArtistList, setSearchArtistList] = useState(null);
    const [searchArtists, setSearchArtists] = useState({});
    const [expandedArtists, setExpandedArtists] = useState({});
    const [selectedCategories, setSelectedCategories] = useState({});
    const [addedArtists, setAddedArtists] = useState([]);
    const [addedArtist, setAddedArtist] = useState(null);
    const [expandedBios, setExpandedBios] = useState({});

    const [error, setError] = useState(null);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const [spotifyArtistList, setSpotifyArtistList] = useState(null);
    const artistRefs = useRef({});

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
    };

    const handleRetrieveArtistsList = async (event) => {
        event.preventDefault();
        try {
            freeze();
            await handleDiscogsSearch(artistName);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${artistName}" was not found`);
            setSearchArtistList(null);
        } finally {
            setSelectedArtistId(null);
            unfreeze();
        }
    };

    const handleSpotifySearch = async (name) => {
        try {
            const data = await searchArtistSpotify(name);
            setSpotifyArtistList(data.artists.items);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDiscogsSearch = async (artistName) => {
        try {
            const data = await searchArtistDiscogs(artistName);
            setSearchArtistList(data);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${artistName}" was not found`);
            setSearchArtistList(null);
        }
    };

    const handleToggleExpand = async (id, name) => {
        setExpandedArtists((prevExpandedArtists) => ({
            ...Object.fromEntries(Object.keys(prevExpandedArtists).map(discogsId => [discogsId, false])),
            [id]: !prevExpandedArtists[id],
        }));

        setSelectedArtistId(id);

        if (!expandedArtists[id]) {
            await handleRetrieveArtistDetails(id, name);

            // Ensure the element exists before scrolling into view
            setTimeout(() => {
                if (artistRefs.current[id]) {
                    artistRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);  // Adding a slight delay to ensure the DOM updates before scrolling
        } else {
            setSearchArtists((prevSearchArtists) => ({
                ...prevSearchArtists,
                [id]: null,
            }));
        }
    };

    const handleRetrieveArtistDetails = async (discogsId, name) => {
        try {
            setUseInlineLoader(true);
            inlineFreeze();
            const details = await retrieveArtistDetailsFromDiscogs(discogsId);
            const spotifyData = await handleSpotifySearch(name);

            setSearchArtists((prevSearchArtists) => ({
                ...prevSearchArtists,
                [discogsId]: details,
            }));
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${discogsId}" was not found`);
            setSearchArtists((prevSearchArtists) => ({
                ...prevSearchArtists,
                [discogsId]: null,
            }));
        } finally {
            setUseInlineLoader(false);
        }
    };

    const handleArtistLineupCategoryChange = (category, discogsId) => {
        setSelectedCategories((prevCategories) => ({
            ...prevCategories,
            [discogsId]: category,
        }));
    };

    const handleAddArtistToLineupWithCategory = (discogsId) => {
        if (addedArtists.some((artist) => artist.id === discogsId)) {
            alert('Artist is already in the lineup', 'error');
            return;
        }

        const artistDetails = searchArtists[discogsId];
        if (!artistDetails) {
            console.warn("Artist details not found for ID:", discogsId);
            return;
        }

        let category = selectedCategories[discogsId];
        if (!category) {
            category = 'headliner'; // Default category if none selected
            setSelectedCategories((prevCategories) => ({
                ...prevCategories,
                [discogsId]: category,
            }));
        }
        const currentArtistDetails = {
            artist: artistDetails.name,
            discogsId: discogsId,
            discogsUrl: artistDetails.discogsUrl,
            category,
            albums: artistDetails.albums,
            spotifyUrl: spotifyArtistList?.[0]?.external_urls?.spotify || '', // Add Spotify URL
            image: artistDetails.image, // Add image if needed
            bio: artistDetails.bio // Add bio if needed
        };

        setCurrentArtist(currentArtistDetails);

        handleAddArtist(currentArtistDetails);

        setAddedArtists((prevArtists) => {
            const newArtists = [
                ...prevArtists,
                { id: discogsId, name: artistDetails.name, category },
            ];

            return newArtists;
        });

        setAddedArtist(artistDetails.name)

        setExpandedArtists((prevExpandedArtists) => ({
            ...prevExpandedArtists,
            [discogsId]: false,  // Close the expanded item after adding to the lineup
        }));

        if (lineUpRef.current) {
            lineUpRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        setSearchArtistList(null);
        setArtistName('');
    };

    const handleRemoveArtist = (discogsId) => {
        setAddedArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== discogsId));

        if (addedArtist === addedArtists.find((artist) => artist.id === discogsId)?.name) {
            setAddedArtist(null);
        }

        removeArtistFromParent(discogsId);
    };

    const toggleBioExpansion = (discogsId) => {
        setExpandedBios((prevBios) => ({
            ...prevBios,
            [discogsId]: !prevBios[discogsId],
        }));
    };

    const categoryOptions = [
        { value: 'opener', label: 'Opener' },
        { value: 'headliner', label: 'Headliner' },
        { value: 'specialGuest', label: 'Special Guest' },
        { value: 'other', label: 'Other' },
    ];

    return (<>
        {addedArtists.length > 0 && (
            <div id='lineUp-list' className='my-2'>
                <ul id='lineup-artists-list' className=''>
                    {addedArtists.map((artist) => (
                        <li id={`lineup-item-artist-${artist.id}`} key={artist.id} className='flex items-center uppercase justify-between mt-2 pr-2  text-gray-300 font-normal bg-lime-100 hover:bg-gray-200 hover:text-white rounded-xl text-lg ' >
                            <span className='bg-red-100 text-white py-2 px-4 rounded-s-xl  '>{artist.category} artist:</span> <span className='pl-3  '>{artist.name} </span>
                            <XCircleIcon className='h-6 w-6 text-gray-300 hover:text-red-100 cursor-pointer' onClick={() => handleRemoveArtist(artist.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        )}
        <div id='search-artist'>

            <div className='relative'>
                <input
                    type="text"
                    placeholder="Enter artist name to search..."
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

            {searchArtistList && !error && (
                <div className='mt-4'>
                    <h2>Select Artist:</h2>
                    <div id='artist-list' className='w-full'>
                        {searchArtistList.slice(0, 5).map((item) => (
                            <div key={item.id}>

                                <div id={`artist-list-item-${item.placeId}`} key={item.id}
                                    className={`mt-2 group ${selectedArtistId === item.id ? 'text-gray-300 bg-gray-80 rounded-xl ' : ' rounded-xl bg-gray-100  text-gray-300 '}`}>

                                    <div className='flex justify-between items-center rounded-xl   hover:pl-8 hover:bg-gray-80  py-2 px-2 transition-all duration-100 cursor-pointer'
                                        onClick={() => handleToggleExpand(item.id, item.name)}>

                                        {expandedArtists[item.id] && searchArtists[item.id] ?
                                            <div id={`artist-item-caption-${item.placeId}`} className='pl-3 text-left uppercase invisible '>
                                                {item.name}
                                            </div> : <div id={`artist-item-caption-${item.placeId}`} className='pl-3 text-left uppercase  '>
                                                {item.name}
                                            </div>
                                        }

                                        {selectedArtistId === item.id & useInlineLoader ? <InlineLoader /> : ''}
                                        <div className='text-right align-middle p-0 group-hover:animate-bounce [animation-delay:-0.15s]  '>
                                            <ChevronDownIcon className={`h-6 w-6 transform transition-transform ${expandedArtists[item.id] ? 'rotate-180' : ''}`} title={`Expand for ${item.name}\'s details `} />                                        </div>
                                    </div>


                                </div>

                                {expandedArtists[item.id] && searchArtists[item.id] && (
                                    <div ref={(el) => (artistRefs.current[item.id] = el)}>
                                        <div className='px-6 pt-6 pb-3 bg-gray-100 rounded-xl border-t-2 border-gray-300 border-dotted'>
                                            <div>
                                                <div className='mb-4 '>
                                                    {searchArtists[item.id]?.image ?
                                                        <div>
                                                            <div className='pt-2'>

                                                                <span className=' text-xs uppercase font-normal  text-gray-300'> artist</span>
                                                                <h2 className=' font-light text-5xl text-gray-300' >

                                                                    {searchArtists[item.id].name}
                                                                </h2>
                                                            </div>

                                                            <img
                                                                className='w-full object-cover aspect-square grayscale rounded-lg border-4 border-gray-400'
                                                                src={searchArtists[item.id].image}
                                                                alt={searchArtists[item.id].name}
                                                            />
                                                        </div> : <h2 className="font-light text-7xl text-gray-300"> {searchArtists[item.id].name}</h2>
                                                    }
                                                </div>
                                            </div>
                                            {searchArtists[item.id].bio && (
                                                <div>
                                                    <p className=' text-xs uppercase font-normal my-2 text-gray-300'> artist bio</p>
                                                    {searchArtists[item.id].bio && (
                                                        <div>
                                                            <p className='text-gray-400 text-base'>
                                                                {expandedBios[item.id] || searchArtists[item.id].bio.length <= 500 ? (
                                                                    <span dangerouslySetInnerHTML={{ __html: searchArtists[item.id].bio }} />
                                                                ) : (
                                                                    <span dangerouslySetInnerHTML={{ __html: `${searchArtists[item.id].bio.slice(0, 500)}...` }} />
                                                                )}
                                                            </p>
                                                            {searchArtists[item.id].bio.length > 500 && (
                                                                <div
                                                                    className=" text-lime-300 hover:text-lime-200 text-sm uppercase w-full cursor-pointer ">
                                                                    onClick={() => toggleBioExpansion(item.id)}
                                                                    {expandedBios[item.id] ? 'Show less' : 'Show more'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                </div>
                                            )}
                                            <div className="flex gap-6 pt-4">
                                                <div className='flex-1 max-w-1/2'>
                                                    <h3 className='text-gray-400'>Albums</h3>
                                                    <ul className='text-gray-400'>
                                                        {searchArtists[item.id].albums.slice(0, 5).map((album, index) => (
                                                            <li key={index}>{album}</li>
                                                        ))}
                                                        {searchArtists[item.id].albums.length > 5 && (
                                                            <li>
                                                                <a href={searchArtists[item.id].discogsUrl} className="
                                                              font-normal
                                                              text-lime-300
                                                              hover:text-lime-100 transition-all duration-100" target="_blank">
                                                                    more ...
                                                                </a>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                                {searchArtists[item.id].urls && (
                                                    <div className='flex-1'>
                                                        <h3 className='text-gray-400'>Links</h3>
                                                        <ul className='text-gray-400'>
                                                            {searchArtists[item.id].urls.map((url, index) => {
                                                                const urlObject = new URL(url);
                                                                const siteName = urlObject.hostname.replace('www.', '');
                                                                return (
                                                                    <li key={index}>
                                                                        <a href={url} className=" 
                                                                        font-normal
                                                                        text-lime-300 hover:text-lime-200 transition-all duration-100" target="_blank">{siteName}</a>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}

                                                {spotifyArtistList && spotifyArtistList[0]?.name === searchArtists[item.id].name && (
                                                    <div id='spotify-profile' className='flex-1 '>
                                                        <h3 className='text-gray-400'>Listen on</h3>
                                                        <ul className='text-gray-400 *:mb-3 hover:*:px-1 *:py-1 *:rounded-lg *:transition-all *:duration-75 *:max-w-fit'>
                                                            <li className='hover:bg-gray-100'>
                                                                <a
                                                                    href={spotifyArtistList[0].external_urls.spotify}
                                                                    className='flex items-center'
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <img
                                                                        src="/assets/Spotify_Icon_RGB_Black.png"
                                                                        alt="Spotify Logo"
                                                                        className='mr-2 w-6 aspect-square'
                                                                    />
                                                                    <span>Spotify</span>
                                                                </a>
                                                            </li>
                                                            <li className='hover:bg-gray-100'>
                                                                <a
                                                                    href={spotifyArtistList[0].external_urls.spotify}
                                                                    className='flex items-center'
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <img
                                                                        src="/assets/Apple_Music_Icon_blk_sm.svg"
                                                                        alt="Apple Logo"
                                                                        className='mr-2 w-6 aspect-square'
                                                                    />
                                                                    <span>Apple Music</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </ div>


                                                )}

                                            </div>



                                            <div className='pt-4 pr-2 flex justify-end text-gray-400'>
                                                <a target="_blank" href={searchArtists[item.id].discogsUrl}
                                                    className=" font-normal
                                                text-lime-300
                                                hover:text-lime-100
                                                transition-all
                                                duration-100
                                                text-xs">
                                                    Find more {searchArtists[item.id].name}'s Info at Discogs.com
                                                </a>
                                            </div>

                                        </div>

                                        <div id='lineUp-selector' className='flex-1 flex flex-col  bg-gray-80 p-6 rounded-xl border-t-2 border-gray-300 border-dotted    '>

                                            <div id='lineUp-categories' className='my-2 flex flex-col flex-wrap '>
                                                <h3 className='text-gray-400 '>Choose Artist Category</h3>
                                                <ToggleButtons
                                                    options={categoryOptions}
                                                    selectedOption={selectedCategories[item.id] || ''}
                                                    onOptionChange={(category) => handleArtistLineupCategoryChange(category, item.id)}
                                                />
                                            </div>

                                            <div className='my-2'>
                                                <Button type="button" className="flex btn btn-primary w-full p-8 items-center justify-center text-white text-xl" onClick={() => handleAddArtistToLineupWithCategory(item.id)} >
                                                    {addedArtist === item.name ? `${item.name} just added to Line Up` : `Add ${item.name} to Line Up`}

                                                </Button>
                                            </div>

                                        </div>
                                    </div>

                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </>
    );
}