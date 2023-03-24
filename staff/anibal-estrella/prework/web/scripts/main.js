//DATA

// PRESENTATION 
// LOGIC

var resgisterPage= document.querySelector(".register form")
var loginPage= document.querySelector(".login")
var homePage= document.querySelector(".home")

var foundUser;
var name = 'Anibal Estrella'
var authenticatedEmail;



  loginPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()
  

      var email =  loginPage.querySelector('input.email').value
      var password = loginPage.querySelector('input.password').value
      var result = authentificateUser(email, password);

      if (result === false) {
        alert('Wrong email or password!')
    } else {
        authenticatedEmail = email
        document.querySelector(".login").classList.add("off");
        document.querySelector(".home").classList.remove("off");
    }

    console.log('>>',{email}, {password})
  })


