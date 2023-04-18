export default function filter(array, callback) {
    const filtered = []

    for (const element of array)
        if (callback(element))
            filtered[filtered.length] = element

    return filtered
}