import context from "./context"

export default () =>
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    throw new Error(body.message)
                })
        })
        .catch(error => {
            throw new Error('Failed to retrieve user data. Please try again later.');
        });
