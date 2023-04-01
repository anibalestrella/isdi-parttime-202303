//pasas multiples arguments gracias a "..." y con un loop los tratas como array

function show(...containers) {
  for (var i = 0; i < containers.length; i++)
    containers[i].classList.remove("off");
}

function hide(...containers) {
  for (var i = 0; i < containers.length; i++)
    containers[i].classList.add("off");
}

function toggle(...containers) {
  for (var i = 0; i < containers.length; i++)
    containers[i].classList.toggle("off");
}

