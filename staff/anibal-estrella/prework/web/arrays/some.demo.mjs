console.log('some demo')

import some from './some.mjs'

const array = [1, 2, 3, 4, 5]

// Checks whether an element is even
const even = (element) => element % 2 === 0

console.log(some(array, even))
// Expected output: true

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']
console.log(some(words, word => word === 'elite'))
// Expected output: true
console.log(some(words, word => word === 'Elite'))
// Expected output: false

const nums = [1, 2, 3, , 5]
console.log(some(nums, num => num === undefined))
// Expected output: false

const colors = ['red', 'green', 'blue', undefined, 'yellow']
console.log(some(colors, color => color === undefined))
// Expected output: true