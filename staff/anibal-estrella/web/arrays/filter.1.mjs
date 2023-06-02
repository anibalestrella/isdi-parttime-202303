export default function filter(array, callback) {
    // TODO steps
    // - create empty array results
    // - loop for array and invoke callback with each element
    // - if callback returns true then add element to the results array, otherwise continue to next
    // - after loop return array results

    const results = []

    for (let i = 0; i < array.length; i++) {
        const element = array[i]

        const matches = callback(element)

        if (matches)
            results[results.length] = element
    }

    return results
}