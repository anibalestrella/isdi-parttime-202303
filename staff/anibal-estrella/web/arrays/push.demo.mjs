import push from './push.mjs'

const animals = ['pigs', 'goats', 'sheep']

const count = push(animals, 'cows')
console.log(count)
// Expected output: 4
console.log(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

const count2 = push(animals, 'chickens', 'cats', 'dogs')
console.log(count2)
// Expected output: 7
console.log(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]