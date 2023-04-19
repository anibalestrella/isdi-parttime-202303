function Curri() {
    this.length = 0
}



Curri.prototype.forEach = function (callback) {
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
        if (element === searchElement) {
            return true
        }
    }

    return false
}

Curri.prototype.some = function some(callback) {
    for (let i = 0; i < this.length; i++) {
        let element = this[i]

        if (callback(element))
            return true
    }

    return false
}

Curri.prototype.filter = function filter(callback) {

    const filtered = []

    for (let i = 0; i < this.length; i++) {
        let element = this[i]

        if (callback(element))
            filtered[filtered.length] = element

    }

    return filtered
}


Curri.prototype.push = function push(...elements) {
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i]

        this[this.length] = element
        this.length ++
    }

    return this.length
}


Curri.prototype.pop = function pop() {
    const last = this[this.length - 1]

    delete this[this.length - 1]
    
    this.length--

    return last
}


export default Curri

