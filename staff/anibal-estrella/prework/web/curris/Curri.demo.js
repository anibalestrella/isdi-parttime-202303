import Curri from './Curri.js'

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

c.forEach(elem => console.log(elem))

const c2 = c.map(elem => elem.toLowerCase())
c2.forEach(elem => console.log(elem))