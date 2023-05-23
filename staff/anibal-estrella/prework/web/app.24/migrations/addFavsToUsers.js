const users = JSON.parse(localStorage.usersJson)

users.forEach(post => {
    if (!post.favs) {
        post.favs = []
    }
})

localStorage.usersJson = JSON.stringify(users)