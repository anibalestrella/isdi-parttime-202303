export default function map(array, callback) {
    // TODO steps
    // - create new empty array mapped
    // - loop through array and invoke callback with each element
    // - add the return value from callback into array mapped
    // - after look return array mapped

    const mapped = []

    for (const element of array)
        mapped[mapped.length] = callback(element)

    return mapped
}