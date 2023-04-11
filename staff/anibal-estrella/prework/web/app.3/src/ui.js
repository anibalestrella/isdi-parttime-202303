//pasas multiples arguments gracias a "..." y con un loop los tratas como array

console.log('//// UI');

export function show(...containers) {
  for (var i = 0; i < containers.length; i++)
    containers[i].classList.remove("off");
}

export function hide(...containers) {
  for (var i = 0; i < containers.length; i++)
    containers[i].classList.add("off");
}




export function toggle(...containers) {
  for (var i = 0; i < containers.length; i++)
    containers[i].classList.toggle("off");
}


export const context = {
  userId: null
}