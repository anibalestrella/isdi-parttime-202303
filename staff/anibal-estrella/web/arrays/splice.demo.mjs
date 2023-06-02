console.log('splice demo')

import splice from './splice.mjs'

console.log('case 0')

const months = ['Jan', 'March', 'April', 'June']
console.log(splice(months, 1, 0, 'Feb'))
// Inserts at index 1
console.log(months)
// Expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

console.log('case 1')

const nums = [1, 2, 3, 5, 6]
console.log(splice(nums, 3, 0, 4))
// Expected output: []
console.log(nums)
// Expected output: [1, 2, 3, 4, 5, 6]

console.log('case 2')

const months2 = ['Jan', 'Feb', 'March', 'April', 'June']
console.log(splice(months2, 4, 1, 'May'))
// Expected output: ['June']
console.log(months2)
// Expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']

console.log('case 3')

const nums2 = [1, 2, 10, 4, 5]
console.log(splice(nums2, 2, 1, 3))
// Expected output: [10]
console.log(nums2)
// Expected output: [1, 2, 3, 4, 5]

console.log('case 4')

const months3 = ['Jan', 'Feb', 'March', 'April', 'June', 'July']
console.log(splice(months3, 2, 2, 'X'))
// Expected output: ['March', 'April']
console.log(months3)
// Expected output: Array ['Jan', 'Feb', 'X', 'June', 'July']

console.log('case 5')

const months4 = ['Jan', 'Feb', 'March', 'April', 'June', 'July']
console.log(splice(months4, 2, 3, 'X'))
// Expected output: ['March', 'April', 'June']
console.log(months4)
// Expected output: Array ['Jan', 'Feb', 'X', 'July']

console.log('case 6')

const months5 = ['Jan', 'Feb', 'March', 'April', 'June', 'July', 'August']
console.log(splice(months5, 2, 4, 'X'))
// Expected output: ['March', 'April', 'June', 'July']
console.log(months5)
// Expected output: Array ['Jan', 'Feb', 'X', 'August']

console.log('case 7')

// TODO make this case work!

const months6 = ['Jan', 'Feb', 'March', 'April', 'June', 'July', 'August']
console.log(splice(months6, 2, 4, 'X', 'Y'))
// Expected output: ['March', 'April', 'June', 'July']
console.log(months6)
// Expected output: Array ['Jan', 'Feb', 'X', 'Y', 'August']