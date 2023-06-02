export default function some(array, callback) {
    // TODO
    // - loop through array
    // - create element
    // - invoke callback for the element
    // - if callback returns true, then return true
    // - after loop return false

    for (const element of array)
        if (callback(element))
            return true

    return false
}