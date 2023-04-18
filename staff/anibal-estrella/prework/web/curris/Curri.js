 function Curri() {
    this.length = 0
}



Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        callback(element)
    }
}


Curri.prototype.map = function map(callback) {
    const mapped = new Curri

    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        mapped[mapped.length] = callback(element)
        mapped.length++
    }

    return mapped
}

// TODO implement more Curri methods (same as Array methods)


Curri.prototype.includes = function includes(searchElement) {
    for (let i = 0; i < this.length; i++) {
        let element = this[i] 
        if (element === searchElement){ 
        return true
        }
    }

    return  false
}

Curri.prototype.some = function some(callback) {
    for (let i = 0; i < this.length; i++) {
        let element = this[i] 

        if (callback(element))
            return true
    }

    return false
}



export default Curri

