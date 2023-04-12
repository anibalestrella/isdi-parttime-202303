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
  image: 'https://picsum.photos/500',
  text:'lorem ipsum dolor sit amet, consectetur adip',
  date: new Date(2023,0,31,23,45,0),
})

posts.push({
  id: 'post-02',
  author: 'user-01',
  image: 'https://picsum.photos/500',
  text: 'I ♥️ Avatars!',
  date: new Date(2023,2,31,23,45,0),
})

posts.push({
  id: 'post-03',
  author: 'user-02',
  image: 'https://picsum.photos/500',
  text: 'I ♥️ Avatars too! lorem ipsum dolor sit amet, consectetur adip',
  date: new Date(2023,3,11,23,45,0)
})