console.log('//// DATA');

export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []
// export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []

export const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

posts.forEach(post => post.date = new Date(post.date))

export function saveUsers() {
localStorage.usersJson = JSON.stringify(users)
}
// function to save only one user
export function savePost() {
}

export function savePosts() {
  localStorage.postsJson = JSON.stringify(posts)  
}

