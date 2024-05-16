import { validators } from 'com'
const { validateToken, validateFileUpload } = validators

const updateUserAvatar = async (userId, file) => {
    validateId(userId, 'user id')
    validateFileUpload(file, 'file upload')

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/Users/user-email`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ file }),
        })

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const { imageUrl } = await response.json();

        // Make a POST request to update the user's avatar in the database
        const updateResponse = await fetch('/update-avatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
