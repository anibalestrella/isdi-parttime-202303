function pop(array) {
    const last = array[array.length - 1]

    array.length--

    return last
}

export default pop