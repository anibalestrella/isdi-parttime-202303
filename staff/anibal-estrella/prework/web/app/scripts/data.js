//DATA
console.log('//// DATA');


export const users = []

users.push({
  id:'user-01'
  name: 'Lars Ulrich',
  email: 'metallica@gmail.com',
  password: '123',
});

users.push({
  id:'user-02'
  name: 'Eddie Vedder',
  email: 'pj@gmail.com',
  password: '123',
});

users.push({
  id:'user-03'
  name: 'Bruce Dickinson',
  email: 'iron@gmail.com',
  password: '123',
});

export const posts = []

posts.push{
  id:'post-01'
  author:'user-01',
  image:'http://lorempixel.com/600/400/people/1/',
  etxt:'',
  date: new Date(),
}