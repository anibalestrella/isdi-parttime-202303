require('dotenv').config();

module.exports = async (text) => {
    const { DISCOGS_BASE_URL, DISCOGS_API_KEY, DISCOGS_API_SECRET_KEY } = process.env;


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
        // .replace(/\r\n/g, '<br>')
        .trim();

    return newText;
};
