const replaceRoviLinks = (text) => {
    const roviLinkRegex = /\[roviLink="(MW\d+|MN\d+)"\](.*?)\[\/roviLink\]/g;
    return text.replace(roviLinkRegex, (match, id, content) => {
        return `<a href="https://www.allmusic.com/artist/${id}" target="_blank" rel="noopener noreferrer">${content}</a>`;
    });
}

export default replaceRoviLinks;
