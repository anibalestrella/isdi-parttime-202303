import React, { useState } from 'react';
import { useAppContext } from '../hooks';
import { searchArtistSpotify } from '../../logic';
import { Button } from '../library';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function SearchArtistSpotify() {
    console.debug('// SearchArtistSpotify  -> Render');

    const { alert, freeze, unfreeze } = useAppContext();

    const [artistName, setArtistName] = useState('');
    const [results, setResults] = useState([]);
    const [expandedArtistId, setExpandedArtistId] = useState(null);

    const handleSearch = async () => {
        try {
            freeze();
            const data = await searchArtistSpotify(artistName);
            setResults(data.artists.items);
        } catch (error) {
            alert(error.message);
        } finally {
            unfreeze();
        }
    };



    const toggleExpand = (artistId) => {
        if (expandedArtistId === artistId) {
            setExpandedArtistId(null);
        } else {
            setExpandedArtistId(artistId);
        }
    };

    return (
        <div className="">
            <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Enter Artist Name..."
            />
            <Button onClick={handleSearch}>Search Spotify</Button>

            <div className='mt-4'>
                {results && results.map((artist) => (
                    <div key={artist.id} className='bg-gray-100 p-2 rounded-lg mb-4 text-gray-500'>
                        <div className="flex items-center justify-between ">
                            <p className='uppercase font-bold text-gray-500 size-5 w-full'>{artist.name}</p>
                            <button
                                className="flex items-center space-x-1"
                                onClick={() => toggleExpand(artist.id)}
                            >
                                <span className='uppercase font-normal text-gray-500'>
                                    {expandedArtistId === artist.id ? 'Collapse' : 'Expand'}
                                </span>
                                {expandedArtistId === artist.id ? (
                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        {expandedArtistId === artist.id && (
                            < div className=' flex flex-col'>
                                {artist.images.length > 0 && (
                                    <img src={artist.images[0].url} alt={`${artist.name} Art`} />
                                )}
                                <p> <span className=' font-bold'> Genres: </span>{artist.genres.join(', ')}</p>
                                <p>Followers: {artist.followers.total}</p>
                                <p>Popularity: {artist.popularity}</p>
                                <a
                                    href={artist.external_urls.spotify}
                                    className='flex items-center'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="/assets/Spotify_Icon_RGB_Black.png"
                                        alt="Spotify Logo"
                                        className='m-2 w-6 aspect-square'
                                    />
                                    <span>
                                        Listen on Spotify
                                    </span>
                                </a>
                            </ div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
