
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect, useRef, useState } from 'react';

import { fetchLoadGoogleMapsApi } from '../../logic/';

const GoogleMapsContainer = ({ lat, lng }) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const initializeGoogleMaps = async () => {
            const apiLoaded = await fetchLoadGoogleMapsApi();
            setIsMapLoaded(apiLoaded);
        };

        initializeGoogleMaps();
    }, []);

    if (!isMapLoaded) {
        return <div>Loading map...</div>; // Optionally add a loading indicator
    }

    return (
        <APIProvider>
            <Map
                style={{ width: '100%', height: '400px' }}
                center={{ lat, lng }}
                zoom={15}
            >
                <Marker
                    position={{ lat, lng }}
                    title="Location"
                />
            </Map>
        </APIProvider>
    );
};

export default GoogleMapsContainer;