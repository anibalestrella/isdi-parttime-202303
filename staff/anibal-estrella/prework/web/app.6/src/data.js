//DATA
console.log('//// DATA');

// export const users = []
// if localStorage is empty then create an empty array, if thers is something convert it to a JSON string.
// export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []
export const users = 'usersJson' in localStorage? JSON.parse(localStorage.usersJson) : []



users.push({
  id:'user-01',
  name: 'Lars Ulrich',
  email: 'metallica@gmail.com',
  password: '123',
});

users.push({
  id:'user-02',
  name: 'Eddie Vedder',
  email: 'pj@gmail.com',
  password: '123',
});

users.push({
  id:'user-03',
  name: 'Bruce Dickinson',
  email: 'iron@gmail.com',
  password: '123',
});

  export const posts = 'postsJson' in localStorage? JSON.parse(localStorage.postsJson) : []

posts.push({
  id: 'post-01',
  author: 'user-01',
  image: 'https://picsum.photos/500?grayscale&random=1',
  text: 'I ♥️ Avatars! all the way through.',
  date: new Date(2023,2,31,23,45,0),
})

posts.push({
  id: 'post-02',
  author: 'user-02',
  image: 'https://picsum.photos/500?random=2&grayscale',
  text: 'I ♥️ Avatars!',
  date: new Date(2023,2,31,23,45,0),
})

posts.push({
  id: 'post-03',
  author: 'user-03',
  image: 'https://picsum.photos/500?random=3&grayscale',
  text: 'I ♥️ Avatars too! lorem ipsum dolor sit amet, consectetur adip',
  date: new Date(2023,3,11,21,45,0)
})

posts.push({
  id: 'post-04',
  author: 'user-01',
  image: 'https://picsum.photos/500?random=4&grayscale',
  text: 'I Fucking hate Avatars! lorem ipsum dolor sit amet, consectetur adip',
  date: new Date(2023,3,11,23,45,0)
})



//save data in localstorage as JSON string file
export function saveUsers() {
localStorage.usersJson = JSON.stringify(users)
}


export function savePosts() {
  localStorage.postsJson = JSON.stringify(posts)
  console.log('////////// POST CREATED');
  }
