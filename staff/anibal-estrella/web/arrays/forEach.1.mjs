function forEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i]
        
        callback(element)
    }
}

export default forEach