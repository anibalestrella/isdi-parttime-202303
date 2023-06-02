const posts = JSON.parse(localStorage.postsJson)



posts.forEach(post => {
    if (!post.likes) {
        post.likes = []
    }
})

localStorage.postsJson = JSON.stringify(posts)