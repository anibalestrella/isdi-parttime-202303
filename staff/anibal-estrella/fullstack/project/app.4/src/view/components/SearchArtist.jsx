import { useEffect, useState } from 'react'
import { useAppContext } from '../hooks'

import retrieveIdArtistDetailsFromDiscogs from '../../logic/retrieveIdArtistDetailsFromDiscogs'
import { Button } from '../library'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchArtist = () => {
    console.debug('// SearchArtist  -> Render')

    const { alert, freeze, unfreeze } = useAppContext()

    const [artistName, setArtistName] = useState('');
    const [searchArtists, setSearchArtists] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
    };


    const handleRetrieveDetails = async () => {
        try {
            freeze();
            const details = await retrieveIdArtistDetailsFromDiscogs(artistName);
            setSearchArtists(details);
            setError(null);
        } catch (error) {
            alert(error.message, 'error');
            setError(`Artist "${artistName}" was not found`);
            setSearchArtists(null);
        } finally {
            unfreeze();
        }
    }

    return (
        <div>
            <div className="flex flex-row w-full my-2">
                <div className='relative w-full'>
                    <input type="text" value={artistName} onChange={handleInputChange} placeholder="Enter artist name" className='pl-8' />
                    <span className='absolute top-3 left-1 h-6 w-6  rounded-full'>
                        <MagnifyingGlassIcon className='text-gray-500 ' />
                    </span>
                    <Button onClick={handleRetrieveDetails}>Search Artist</Button>
                </div>

            </div>

            {error && <p className="text-lime-200">{error}</p>}

            {searchArtists && !error && (
                <div>
                    {searchArtists.image && (
                        <div className='my-2'>
                            <img className='w-full object-cover aspect-square grayscale rounded-lg border-4 border-white' src={searchArtists.image} alt={searchArtists.name} />
                        </div>
                    )}
                    <h2 className=' font-light text-5xl '>{searchArtists.name}</h2>
                    <h3 className=' font-light text-5xl '>{searchArtists.discogsId}</h3>

                    {/* <h3>From: {searchArtists.from}</h3> */}

                    {searchArtists.bio && (
                        <div>
                            <h2>Artist Bio </h2>

                            <p dangerouslySetInnerHTML={{ __html: searchArtists.bio }} />
                        </div>
                    )}
                    <div className="flex gap-6">
                        <div>
                            <h2>Albums</h2>
                            <ul>
                                {searchArtists.albums.slice(0, 5).map((album, index) => (
                                    <li key={index}> {album}</li>
                                ))}
                                {searchArtists.albums.length > 5 && <li><a href={searchArtists.discogsUrl} target="_blank">more ...</a></li>}
                            </ul>
                        </div>

                        {searchArtists.urls && (
                            <div>
                                <h3>Links</h3>
                                <ul>
                                    {searchArtists.urls.map((url, index) => {
                                        const urlObject = new URL(url)
                                        const siteName = urlObject.hostname.replace('www.', '')
                                        return (
                                            <li key={index}>
                                                <a href={url} target="_blank">{siteName}</a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className='pt-4 pr-2 flex justify-end' >
                        <a className='' href={searchArtists.discogsUrl} target="_blank">Find more {searchArtists.name}'s Info at Discogs.com</a>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SearchArtist;
