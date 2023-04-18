export default function forEach(array, callback) {
    for (const element of array)
        callback(element)
}