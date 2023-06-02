export default function splice(array, start, deleteCount, item1) {
    if (deleteCount === 0)  {
        for (let i = array.length - 1; i >= start; i--) {
            const element = array[i]
    
            array[i + 1] = element
        }
    
        array[start] = item1
    
        return []
    } else if (deleteCount === 1) {
        const extracted = array[start]

        array[start] = item1

        return [extracted]
    }
}