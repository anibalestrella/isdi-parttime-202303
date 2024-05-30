/**
 * Converts a file or image URL to a base64 image object.
 * @param {File|string} input - The file or image URL to convert.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the base64 image and file name.
 */
export default function createBase64ImageObject(input) {
    return new Promise((resolve, reject) => {
        if (typeof input === 'string') {
            // Input is a URL
            fetch(input)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const fileName = input.split('/').pop();
                        resolve({
                            file: reader.result,
                            fileName
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
                .catch(reject);
        } else if (input instanceof File) {
            // Input is a File object
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    file: reader.result,
                    fileName: input.name
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(input);
        } else {
            reject(new Error('Invalid input type. Expected a File or a string (URL).'));
        }
    });
}
