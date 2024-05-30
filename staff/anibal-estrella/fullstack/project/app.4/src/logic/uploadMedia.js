export default (files, name) => {


    return fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files, name })
    })
        .then(res => {
            if (res.status === 201)
                return

            return res.json()
                .then(body => {
                    throw new Error(body.error)
                })
        })
}