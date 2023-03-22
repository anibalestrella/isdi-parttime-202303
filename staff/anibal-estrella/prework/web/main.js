document.querySelector(".register").querySelector("form").addEventlistener("submit", function (event) {
    event.preventsDefault();
    document.querySelector(".register").classList.add("off");
    document.querySelector(".login").classList.remove("off");

    console.log("Register!");
    // TODO how to get
  });

document.querySelector(".login").addEventlistener("submit", function (event) {
  event.preventsDefault();
  document.querySelector(".").classList.add("off");
  document.querySelector(".").classList.remove("on");
  console.log("Login!");
  // TODO how to get
});
