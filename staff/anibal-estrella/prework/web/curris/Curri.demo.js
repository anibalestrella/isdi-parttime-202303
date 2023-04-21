import Curri from './Curri.js'

console.log('/// Curri.prototype');

const c = new Curri

c[0] = 'A'
c.length++
c[1] = 'B'
c.length++
c[2] = 'C'
c.length++



//console.log(c)

//for (var i = 0; i < c.length; i++)
//    console.log(c[i])
console.log('/// Curri.prototype.forEach');
c.forEach(elem => console.log(elem))

console.log('/// Curri.prototype.map');

const c2 = c.map(elem => elem.toLowerCase())
c2.forEach(elem => console.log(elem))

console.log('/// Curri.prototype.includes');

const pets = new Curri

pets[0] = 'cat'
pets.length++
pets[1] = 'dog'
pets.length++
pets[2] = 'bird'
pets.length++
console.log(c.includes('B'))
// Expected output: true

console.log(pets.includes('bird'))
// Expected output: true

console.log(pets.includes('at'))
// Expected output: false



console.log('/// Curri.prototype.some');

const c3 = new Curri

c3[0] = '1'
c3.length++
c3[1] = '2'
c3.length++
c3[2] = '3'
c3.length++
c3[3] = ' '
c3.length++
c3[4] = '5'
c3.length++


// Checks whether an element is even
const even = (element) => element % 2 === 0

console.log(c3.some(even))
// Expected output: true

const c4 = new Curri

c4[0] ='spray'
c4.length++
c4[1] ='limit'
c4.length++
c4[2] ='elite'
c4.length++
c4[3] ='exuberant'
c4.length++
c4[4] ='destruction'
c4.length++
c4[5] ='present'
c4.length++



console.log(c4.some(word => word === 'elite'))
// Expected output: true
console.log(c4.some(word => word === 'Elite'))
// Expected output: false

console.log(c3.some(num => num === undefined))
// Expected output: false

const c5 = new Curri

c5[0] = 'red'
c5.length++
c5[1] ='green'
c5.length++
c5[2] ='blue'
c5.length++
c5[3] =undefined
c5.length++
c5[4] ='yellow'
c5.length++

console.log(c5.some(color => color === undefined))
// Expected output: true

console.log('/// Curri.prototype.filter')

const c6 = new Curri

c6[0] = 'spray'
c6.length++
c6[1] = 'limit'
c6.length++
c6[2] = 'elite'
c6.length++
c6[3] = 'exuberant'
c6.length++
c6[4] = 'destruction'
c6.length++
c6[5] = 'present'
c6.length++

const result = c6.filter(word => word.length > 6)

console.log(result)
// Expected output: Array ["exuberant", "destruction", "present"]

console.log('/// Curri.prototype.push')

const c7 = new Curri

c7[0] = 'pigs'
c7.length++
c7[1] = 'goats'
c7.length++
c7[2] = 'sheep'
c7.length++

const count = c7.push('cows')

console.log(count)
// Expected output: 4
console.log(c7)
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

const count2 = c7.push( 'chickens', 'cats', 'dogs')
console.log(count2)
// Expected output: 7
console.log(c7)
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]


console.log('/// Curri.prototype.pop')

const c8 = new Curri

c8[0] = 'broccoli'
c8.length++
c8[1] = 'cauliflower'
c8.length++
c8[2] = 'cabbage'
c8.length++
c8[3] = 'kale'
c8.length++
c8[4] = 'tomato'
c8.length++


console.log(c8.pop(c8))
// Expected output: "tomato"

console.log(c8)
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

console.log(c8.pop(c8))
// Expected output: "kale"

console.log(c8)
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]


console.log('/// prototype.join');

const c9 = new Curri

c9[0] = 'Fire'
c9.length++
c9[1] = 'Air'
c9.length++
c9[2] = 'Water'
c9.length++

console.log(c9.join());
// Expected output: "Fire,Air,Water"

console.log(c9.join(''));
// Expected output: "FireAirWater"

console.log(c9.join('-'));
// Expected output: "Fire-Air-Water"
