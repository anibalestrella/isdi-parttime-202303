console.log('//// DATA');

// use a  function to access data so every time it's invoked it will referesh the updated  DB
export const users = () => 'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []

export const posts = () => {
  const posts = 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []

  posts.forEach(post => post.date = new Date(post.date))

  return posts
}


export function saveUsers(users) {
  localStorage.usersJson = JSON.stringify(users)
}

export function savePosts(posts) {
  localStorage.postsJson = JSON.stringify(posts)
}

// function to save only one post
export function savePost(post) {
  const _posts = posts()

  const index = _posts.findIndex(_post => _post.id === post.id)

  if (index < 0)
    _posts.push(post)
  else
    _posts.splice(index, 1, post)

  savePosts(_posts)
}


// function to save only one post
export function saveUser(user) {
  const _users = users()

  const index = _users.findIndex(_user => _user.id === user.id)

  if (index < 0)
    _users.push(user)
  else
    _users.splice(index, 1, user)

  saveUsers(_users)
}
