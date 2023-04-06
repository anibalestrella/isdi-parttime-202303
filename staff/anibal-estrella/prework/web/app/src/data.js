//DATA
console.log('//// DATA');


export const users = []

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

export const posts = []

posts.push({
  id:'post-01',
  author:'user-01',
  image:'http://lorempixel.com/600/400/people/1/',
  etxt:'',
  date: new Date(),
})

posts.push({
  id: 'post-02',
  author: 'user-01',
  image: 'https://img.icons8.com/color/512/avatar.png',
  text: 'I ♥️ Avatars!',
  date: new Date()
})

posts.push({
  id: 'post-03',
  author: 'user-02',
  image: 'https://img.icons8.com/color/512/avatar.png',
  text: 'I ♥️ Avatars too!',
  date: new Date()
})