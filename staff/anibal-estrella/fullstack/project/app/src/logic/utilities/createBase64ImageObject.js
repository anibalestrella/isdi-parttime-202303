/**
 * Converts a file or image URL to a base64 image object.
 * @param {File|string} input - The file or image URL to convert.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the base64 image and file name.
 */

export default function createBase64ImageObject(input) {
    return new Promise((resolve, reject) => {
        if (typeof input === 'string') {
            fetch(input, { mode: 'cors' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image. Status: ${response.status}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const fileName = input.split('/').pop();
                        resolve({
                            file: reader.result,
                            fileName
                        });
                    };
                    reader.onerror = () => reject(new Error('Error reading blob as data URL'));
                    reader.readAsDataURL(blob);
                })
                .catch(error => reject(new Error(`Image fetch failed: ${error.message}`)));
        } else if (input instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    file: reader.result,
                    fileName: input.name
                });
            };
            reader.onerror = () => reject(new Error('Error reading file as data URL'));
            reader.readAsDataURL(input);
        } else {
            reject(new Error('Invalid input type. Expected a File or a string (URL).'));
        }
    });
}