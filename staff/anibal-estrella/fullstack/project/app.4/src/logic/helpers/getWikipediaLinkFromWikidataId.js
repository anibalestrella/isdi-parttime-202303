export function getWikipediaLinkFromWikidataId(wikidataId) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                try {
                    const englishTitle = data.entities[wikidataId].sitelinks.enwiki.title;
                    // return `https://en.wikipedia.org/wiki/${encodeURIComponent(data.entities[wikidataId].sitelinks.enwiki.title)}`
                    resolve(encodeURIComponent(englishTitle));

                } catch (error) {
                    console.log("English Wikipedia link not found.");
                    reject(error);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                reject(error);
            });
    });
}

