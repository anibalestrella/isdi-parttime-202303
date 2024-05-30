import { validators } from 'com'
const { validateToken, validateFileUpload } = validators
import context from "./context"

const updateUserAvatar = async (files) => {
    validateToken(context.token, 'Session Token');
    debugger
    files.map((file, index) => {
        return validateFileUpload(file);
    })

    try {
        // const formData = new FormData();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/upload-media`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ files })
        })

        if (!response.ok)
            throw new Error('Failed to upload image')
        else {
            console.log(response)
        }
        debugger
        const responseData = await response.json();
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
