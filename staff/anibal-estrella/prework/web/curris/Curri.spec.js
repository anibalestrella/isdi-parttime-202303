import Curri from './Curri.js'

console.log('/// Curri');

describe('Curri', () => {
    describe('constructur', () => {
        it('should create instance of elements', () => {

            const c = new Curri(10, 20, 30)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(3)
            expect(c[0]).toBe(10)
            expect(c[1]).toBe(20)
            expect(c[2]).toBe(30)
        })

    })

    describe('forEach', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements', () => {
                const c = new Curri

                c[0] = 'a'
                c.length++
                c[1] = 'b'
                c.length++
                c[2] = 'c'
                c.length++

                c.forEach(elem => console.log(elem))

                expect(c).toBeInstanceOf(Curri)
                expect(c.length).toBe(3)
                expect(c[0]).toBe('a')
                expect(c[1]).toBe('b')
                expect(c[2]).toBe('c')

            })

        })

    })

    describe('map', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements', () => {
                const c = new Curri

                c[0] = 'A'
                c.length++
                c[1] = 'B'
                c.length++
                c[2] = 'C'
                c.length++

                const c2 = c.map(elem => elem.toLowerCase())

                expect(c2).toBeInstanceOf(Curri)
                expect(c2.length).toBe(3)
                expect(c2[0]).toBe(c[0].toLowerCase())
                expect(c2[1]).toBe(c[1].toLowerCase())
                expect(c2[2]).toBe(c[2].toLowerCase())

            })

        })

    })


    describe('includes', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements', () => {

                const pets = new Curri

                pets[0] = 'cat'
                pets.length++
                pets[1] = 'dog'
                pets.length++
                pets[2] = 'bird'
                pets.length++

                console.log(pets.includes('g'))
                // Expected output: true

                console.log(pets.includes('bird'))
                // Expected output: true

                console.log(pets.includes('at'))
                // Expected output: false

                expect(pets).toBeInstanceOf(Curri)
                expect(pets.length).toBe(3)
                expect(pets[0]).toBe(false)
                expect(pets[1]).toBe(true)
                expect(pets[2]).toBe(false)

            })
        })
    })


})






// console.log('/// Curri.prototype.some');

// const c3 = new Curri

// c3[0] = '1'
// c3.length++
// c3[1] = '2'
// c3.length++
// c3[2] = '3'
// c3.length++
// c3[3] = ' '
// c3.length++
// c3[4] = '5'
// c3.length++


// // Checks whether an element is even
// const even = (element) => element % 2 === 0

// console.log(c3.some(even))
// // Expected output: true

// const c4 = new Curri

// c4[0] ='spray'
// c4.length++
// c4[1] ='limit'
// c4.length++
// c4[2] ='elite'
// c4.length++
// c4[3] ='exuberant'
// c4.length++
// c4[4] ='destruction'
// c4.length++
// c4[5] ='present'
// c4.length++



// console.log(c4.some(word => word === 'elite'))
// // Expected output: true
// console.log(c4.some(word => word === 'Elite'))
// // Expected output: false

// console.log(c3.some(num => num === undefined))
// // Expected output: false

// const c5 = new Curri

// c5[0] = 'red'
// c5.length++
// c5[1] ='green'
// c5.length++
// c5[2] ='blue'
// c5.length++
// c5[3] =undefined
// c5.length++
// c5[4] ='yellow'
// c5.length++

// console.log(c5.some(color => color === undefined))
// // Expected output: true

// console.log('/// Curri.prototype.filter')

// const c6 = new Curri

// c6[0] = 'spray'
// c6.length++
// c6[1] = 'limit'
// c6.length++
// c6[2] = 'elite'
// c6.length++
// c6[3] = 'exuberant'
// c6.length++
// c6[4] = 'destruction'
// c6.length++
// c6[5] = 'present'
// c6.length++

// const result = c6.filter(word => word.length > 6)

// console.log(result)
// // Expected output: Array ["exuberant", "destruction", "present"]

// console.log('/// Curri.prototype.push')

// const c7 = new Curri

// c7[0] = 'pigs'
// c7.length++
// c7[1] = 'goats'
// c7.length++
// c7[2] = 'sheep'
// c7.length++

// const count = c7.push('cows')

// console.log(count)
// // Expected output: 4
// console.log(c7)
// // Expected output: Array ["pigs", "goats", "sheep", "cows"]

// const count2 = c7.push( 'chickens', 'cats', 'dogs')
// console.log(count2)
// // Expected output: 7
// console.log(c7)
// // Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]


// console.log('/// Curri.prototype.pop')

// const c8 = new Curri

// c8[0] = 'broccoli'
// c8.length++
// c8[1] = 'cauliflower'
// c8.length++
// c8[2] = 'cabbage'
// c8.length++
// c8[3] = 'kale'
// c8.length++
// c8[4] = 'tomato'
// c8.length++


// console.log(c8.pop(c8))
// // Expected output: "tomato"

// console.log(c8)
// // Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

// console.log(c8.pop(c8))
// // Expected output: "kale"

// console.log(c8)
// // Expected output: Array ["broccoli", "cauliflower", "cabbage"]


// console.log('/// prototype.join');

// const c9 = new Curri

// c9[0] = 'Fire'
// c9.length++
// c9[1] = 'Air'
// c9.length++
// c9[2] = 'Water'
// c9.length++

// console.log(c9.join());
// // Expected output: "Fire,Air,Water"

// console.log(c9.join(''));
// // Expected output: "FireAirWater"

// console.log(c9.join('-'));
// // Expected output: "Fire-Air-Water"
