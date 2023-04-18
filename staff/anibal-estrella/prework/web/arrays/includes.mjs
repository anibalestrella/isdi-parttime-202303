function includes(array, searchElement) {
    for (const element of array)
        if (element === searchElement)
            return true

    return false
}

export default includes