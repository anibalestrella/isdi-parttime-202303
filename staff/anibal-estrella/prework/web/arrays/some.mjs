export default function some(array, callback) {
    for (const i in array) {
        if (callback(array[i]))
            return true
    }

    return false
}