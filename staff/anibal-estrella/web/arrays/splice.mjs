export default function splice(array, start, deleteCount, item1) {
    const extracted = []

    for (let i = start; i < start + deleteCount; i++) {
        const elem = array[i]

        extracted[extracted.length] = elem
    }

    if (deleteCount > 0) {
        for (let i = start + deleteCount; i < array.length; i++) {
            const elem = array[i]

            array[i - (deleteCount - 1)] = elem
        }

        array.length -= (deleteCount - 1)
    }

    array[start] = item1

    return extracted
}