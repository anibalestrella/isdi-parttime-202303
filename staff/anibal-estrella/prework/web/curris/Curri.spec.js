import Curri from './Curri.js'


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



                expect(pets).toBeInstanceOf(Curri)
                expect(pets.length).toBe(3)
                expect(pets.includes('g')).toBe(false)
                expect(pets.includes('bird')).toBe(true)
                expect(pets.includes('at')).toBe(false)

            })
        })
    })



    describe('some', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements and give a result of boolean if function is applied', () => {

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

                expect(c3).toBeInstanceOf(Curri)
                expect(c3.length).toBe(5)
                expect(c3.some(even)).toBe(true)

                const c4 = new Curri

                c4[0] = 'spray'
                c4.length++
                c4[1] = 'limit'
                c4.length++
                c4[2] = 'elite'
                c4.length++
                c4[3] = 'exuberant'
                c4.length++
                c4[4] = 'destruction'
                c4.length++
                c4[5] = 'present'
                c4.length++

                expect(c4).toBeInstanceOf(Curri)
                expect(c4.length).toBe(6)
                expect(c4.some(num => num === undefined)).toBe(false)
                expect(c4.some(word => word === 'Elite')).toBe(false)
                expect(c4.some(word => word === 'elite')).toBe(true)

                const c5 = new Curri

                c5[0] = 'red'
                c5.length++
                c5[1] = 'green'
                c5.length++
                c5[2] = 'blue'
                c5.length++
                c5[3] = undefined
                c5.length++
                c5[4] = 'yellow'
                c5.length++

                expect(c5).toBeInstanceOf(Curri)
                expect(c5.length).toBe(5)
                expect(c5.some(color => color === undefined)).toBe(true)
            })
        })
    })

    describe('filter', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements and filter it through a given function', () => {

                const c6 = new Curri('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present')

                const result = c6.filter(word => word.length > 6)

                expect(c6).toBeInstanceOf(Curri)
                expect(c6.length).toBe(6)
                expect(result).toEqual(['exuberant', 'destruction', 'present'])
                // Expected output: Array ["exuberant", "destruction", "present"]
            })
        })
    })

    describe('push', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements and add one at the end', () => {

                const c7 = new Curri('pigs', 'goats', 'sheep')

                const count = c7.push('cows')

                expect(c7).toBeInstanceOf(Curri)
                expect(c7.length).toBe(4)
                expect(count).toBe(4)
                // Expected output: 4
                expect(c7).toBe("Curri({ 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4})")
                // Expected output: Array ["pigs", "goats", "sheep", "cows"]

                const count2 = c7.push('chickens', 'cats', 'dogs')

                expect(c7).toBeInstanceOf(Curri)
                expect(c7.length).toBe(7)
                expect(count2).toBe(7)

                const c = new Curri(10, 20, 30, 40, 50);
                const c1 = new Curri("uno", "dos", "tres");

                const a = c.push(60, 70);
                const a1 = c1.push("cuatro");

                expect(a).toBeInstanceOf(Number);
                expect(a).toBe(c.length);
                expect(a1).toBeInstanceOf(Number);
                expect(a1).toBe(c1.length);
            })
        })
    })

    describe('pop', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements and pop out an element passed and change the original list', () => {
                const c8 = new Curri("broccoli", "cauliflower", "cabbage", "kale", "tomato")

                expect(c8).toBeInstanceOf(Curri)
                expect(c8.length).toBe(5)

                expect(c8.pop(c8)).toBe("tomato")
                expect(c8.length).toBe(4)
                expect(c8.pop(c8)).toBe("kale")
            })
        })
    })

    describe('join', () => {
        describe('constructor', () => {
            it('should iterate over a list of elements and join each element and assign an element between them if passed as a parameter', () => {

                const c9 = new Curri

                c9[0] = 'Fire'
                c9.length++
                c9[1] = 'Air'
                c9.length++
                c9[2] = 'Water'
                c9.length++

                expect(c9).toBeInstanceOf(Curri)
                expect(c9.length).toBe(3)
                
                expect(c9.join()).toBe("Fire,Air,Water")
                // Expected output: "Fire,Air,Water"
                
                expect(c9.join('')).toBe("FireAirWater")
                
                // Expected output: "FireAirWater"
                
                expect(c9.join('-')).toBe("Fire-Air-Water")
                // Expected output: "Fire-Air-Water"
                

            })
        })
    })
    
    describe('unshift', () => {
        describe('constructor', () => {
            it('Adds the specified elements to the beginning of an array and returns the new length of the array.', () => {
                const c9 = new Curri(1, 2, 3)

                expect(c9).toBeInstanceOf(Curri)
                expect(c9.length).toBe(3)
                
                expect(c9.unshift(4, 5)).toBe(5)
                expect(c9).toBe([4, 5, 1, 2, 3])
                

            })
        })
    })
})







