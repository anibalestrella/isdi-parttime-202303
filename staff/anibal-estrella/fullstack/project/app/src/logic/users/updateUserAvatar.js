import { validators } from 'com'
const { validateToken, validateFileUpload } = validators
import context from "./context"

const updateUserAvatar = async (file) => {
    validateToken(context.token, 'Session Token');

    // validateId(userId, 'user id')
    // validateFileUpload(file, 'file upload')

    try {
        const formData = new FormData();

        const files = [{ file }];

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/upload-media`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            // body: JSON.stringify({ file }),
            body: JSON.stringify({ files })
        })

        if (!response.ok)
            throw new Error('Failed to upload image')
        else {
            console.log(response)
            // console.log(response[0].url)
        }
        debugger
        // const { imageUrl } = await response.json();
        console.log(response)
        const responseData = await response.json();
        console.log(responseData[0]);
        console.log(responseData[0].url);
        const imageUrl = responseData[0].url

        const updateResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/user-avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ imageUrl }),
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update avatar');
        }

        console.log('Avatar updated successfully');
    } catch (error) {
        console.error('Error updating avatar:', error);
    }
};

export default updateUserAvatar;
