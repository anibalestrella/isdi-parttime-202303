function Login(props){
    function handleRegisterClick(event){
        event.preventDefault()

        props.onRegisteClick()
    }

    function handleLogin(event){
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value
        

}