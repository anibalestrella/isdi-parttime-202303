function push(array, ...elements) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]

        array[array.length] = element
    }

    return array.length
}