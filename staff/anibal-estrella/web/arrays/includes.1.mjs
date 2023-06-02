function includes(array, searchElement) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i]

        if (element === searchElement)
            return true
    }

    return false
}

export default includes