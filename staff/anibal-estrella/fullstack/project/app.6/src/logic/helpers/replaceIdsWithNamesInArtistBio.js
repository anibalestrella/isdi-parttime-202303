const BASE_URL = import.meta.env.VITE_BASE_URL;
const DISCOGS_API_KEY = import.meta.env.VITE_DISCOGS_API_KEY;
const DISCOGS_API_SECRET_KEY = import.meta.env.VITE_DISCOGS_API_SECRET_KEY;

// async function getEntityNameById(entityType, entityId) {
//     const url = `${BASE_URL}/${entityType}/${entityId}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}`;

//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             return data.name;
//         } else {
//             console.error(`Error fetching ${entityType} with ID ${entityId}:`, response.statusText);
//             return null;
//         }
//     } catch (error) {
//         console.error(`Error fetching ${entityType} with ID ${entityId}:`, error);
//         return null;
//     }
// }

// async function replaceIdsWithNamesInArtistBio(text) {
//     const entityIdPattern = /\[(a|m|l)=(\d+)\]/g;
//     const matches = [...text.matchAll(entityIdPattern)];

//     for (const match of matches) {
//         const entityType = match[1] === "a" ? "artists" : match[1] === "l" ? "labels" : "masters";
//         const entityIdWithoutPrefix = match[2];
//         const entityName = await getEntityNameById(entityType, entityIdWithoutPrefix);

//         if (entityName) {
//             text = text.replace(match[0], entityName);
//         }
//     }

//     text = text.replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>');
//     text = text.replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>');

//     return text;
// }


async function replaceIdsWithNamesInArtistBio(text) {
    // Function to fetch name by discogs ID based on type
    debugger
    async function fetchNameByIdAndType(id, type) {
        let endpoint;
        switch (type) {
            case 'a':
                endpoint = 'artists';
                break;
            case 'm':
                endpoint = 'masters';
                break;
            case 'l':
                endpoint = 'labels';
                break;
            case 'r':
                endpoint = 'releases';
                break;
            default:
                return '';
        }

        const url = `https://api.discogs.com/${endpoint}/${id}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            return data.title || data.name || '';
        }
        return '';
    }

    // Find all discogs IDs in the text
    const regex = /\[(a|m|l|r)=(\d+)\]|\[(a|m|l|r)(\d+)\]/g;
    const matches = text.matchAll(regex);
    let newText = text;

    // Replace each ID with its name or remove if no name available
    for (let match of matches) {
        const type = match[1] || match[3];
        const id = match[2] || match[4];
        const name = await fetchNameByIdAndType(id, type);
        newText = name ? newText.replace(match[0], name) : newText.replace(match[0], '');
    }

    newText = newText.replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>')
        .replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>')
        .replace(/\[[a-zA-Z]=|\[|\]/g, '')
        .trim();

    return newText;
}

export default replaceIdsWithNamesInArtistBio;

