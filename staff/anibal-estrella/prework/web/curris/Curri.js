class Curri {

    constructor() {
        for (let i = 0; i < arguments.length; i++)
            this[i] = arguments[i]

        this.length = arguments.length
    }



    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            callback(element)
        }
    }


    map(callback) {
        const mapped = new Curri

        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            mapped[mapped.length] = callback(element)
            mapped.length++
        }

        return mapped
    }

    // TODO implement more Curri methods (same as Array methods)


    includes(searchElement) {
        for (let i = 0; i < this.length; i++) {
            let element = this[i]
            if (element === searchElement) {
                return true
            }
        }
        return false
    }


    some(callback) {
        for (let i = 0; i < this.length; i++) {
            let element = this[i]

            if (callback(element))
                return true
        }

        return false
    }

    filter(callback) {

        let filtered = []
        for (let i = 0; i < this.length; i++) {
            let element = this[i]

            if (callback(element))
                filtered[filtered.length] = element

        }

        return filtered
    }


    push(...elements) {
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]

            this[this.length] = element
            this.length++
        }

        return this.length
    }


    pop() {
        const last = this[this.length - 1]

        delete this[this.length - 1]

        this.length--

        return last
    }


    join(separator) {
        let result = ''
        let element

        for (let i = 0; i < this.length; i++) {
            element = this[i]

            if (i < this.length - 1) {
                if (separator === undefined)
                    result += element + ','
                else if (separator || separator === '')
                    result += element + separator

            } else {

                result += element;
            }

        }

        this[this.length] = this.length

        return result
    }

}

window.Curri = Curri

export default Curri

