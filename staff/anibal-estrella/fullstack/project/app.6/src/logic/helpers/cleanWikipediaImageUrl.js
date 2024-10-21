export function cleanWikipediaImageUrl(inputURL) {
    const thumbPattern = /\/thumb\//i;
    inputURL = inputURL.replace(thumbPattern, '/');

    const pxPattern = /\/([^/]+\/)50px-(.*)$/;
    inputURL = inputURL.replace(pxPattern, '/$1$2');

    const jpgPattern = /(.jpg)/i;
    const jpgIndex = inputURL.search(jpgPattern);
    if (jpgIndex !== -1) {
        inputURL = inputURL.substring(0, jpgIndex + 4);
    }

    return inputURL;
}