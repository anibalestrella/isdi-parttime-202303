import forEach from './forEach.mjs'

const array1 = ['a', 'b', 'c']

//forEach(array1, element => console.log(element))
// forEach(array1, function(item) { 
//     console.log(item) 
// })

// function printToConsole(item) {
//     console.log(item)
// }
const printToConsole = item => console.log(item)

forEach(array1, printToConsole)

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

const nums = [10, 20, 30]

const mulBy10AndPrint = num => console.log(num * 10)
const mulBy100AndPrint = num => console.log(num * 100)

forEach(nums, mulBy10AndPrint)
// Expected
// 100
// 200
// 300

forEach(nums, mulBy100AndPrint)
// Expected
// 1000
// 2000
// 3000

forEach(nums, num => console.log(num * 1000))
// Expected
// 10000
// 20000
// 30000