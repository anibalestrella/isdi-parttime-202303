/**
 * APP / retrieveUserGeolocation
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 *
 * @param {number} lat1 - Latitude of the first point in degrees.
 * @param {number} lon1 - Longitude of the first point in degrees.
 * @param {number} lat2 - Latitude of the second point in degrees.
 * @param {number} lon2 - Longitude of the second point in degrees.
 * @returns {number} - The distance between the two points in kilometers.
 */

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (angle) => angle * (Math.PI / 180);
    lat1 = toRad(lat1);
    lon1 = toRad(lon1);
    lat2 = toRad(lat2);
    lon2 = toRad(lon2);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const R = 6371; // Earth's radius in kilometers
    return R * c;
};

const closerCity = (lat, lon) => {
    const cities = {
        Madrid: [40.4168, -3.7038],
        Barcelona: [41.3851, 2.1734],
        Bilbao: [43.2630, -2.9340],
        Vigo: [42.2328, -8.7226],
        Sevilla: [37.3886, -5.9823]
    };

    let closestCity = null;
    let shortestDistance = Infinity;

    for (const [city, coords] of Object.entries(cities)) {
        const distance = haversineDistance(lat, lon, ...coords);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestCity = city;
        }
    }

    return closestCity;
};

const retrieveUserGeolocation = async () => {
    try {
        const response = await fetch('https://ipinfo.io?token=7a1a4123a6698c');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { city, loc } = data;

        // Parse the 'loc' to get latitude and longitude
        const [lat, lon] = loc.split(',').map(Number);

        // Prepare result object
        const result = {
            closestCity: city,
            originalLocation: [lat, lon]
        };

        // If city is not in our list of cities, update the closestCity field
        if (!['Madrid', 'Barcelona', 'Bilbao', 'Vigo', 'Sevilla'].includes(city)) {
            result.closestCity = closerCity(lat, lon);
        }
        return result;
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
    }
};

export default retrieveUserGeolocation;
