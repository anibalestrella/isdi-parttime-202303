import { validators } from 'com'
import context from "./context"

const { validateToken, validatePassword } = validators

export default function updateUserPassword(userCurrentPassword, userNewPassword, userNewPasswordConfirm) {
    validateToken(context.token, 'token')

    if (userNewPassword !== userNewPasswordConfirm) {
        throw new Error('password confirmation mismatch')
    } else if (userNewPassword === userCurrentPassword) {
        throw new Error('new password should not match old password')
    } else {
        validatePassword(userCurrentPassword, 'password')
        validatePassword(userNewPassword, 'new password')

        return (async () => {

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/users/user-password`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${context.token}`,
                    },
                    body: JSON.stringify({ userCurrentPassword, userNewPassword, userNewPasswordConfirm }),
                });

                if (res.status !== 201) {
                    const { error } = await res.json();
                    throw new Error(error);
                }
            } catch (error) {
                throw error;
            }
        })()

    }
}
