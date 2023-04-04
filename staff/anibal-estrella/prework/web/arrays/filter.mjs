export default function(array,  callback){
const result=[]
for (const element of array) {
    if(callback(element))
    result[result.length]=element

}
return result
}