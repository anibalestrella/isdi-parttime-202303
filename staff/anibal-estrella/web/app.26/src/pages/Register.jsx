import registerUser from '../logic/registerUser'


export default function Register({ onUserRegistered, onLoginClick }) {

    function handleLoginClick(event) {
        event.preventDefault()

        onLoginClick()
    }

    function handleRegister(event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        // handle synchronous errors with TRY/CATCH
        try {
            //handle asynchronous errors with a CALLBACK
            registerUser(name, email, password, repeatPassword, error => {

                if (error) {
                    alert(error.message)

                    return
                }

                onUserRegistered()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    console.debug('// Register -> RENDER');
    
    return <div className="register center-container">
        <section className="panel">
            <h2>Register</h2>
            <form method="get" className="register-form border-top-gradient" onSubmit={handleRegister}>
                <label htmlFor="name">Name:</label>
                <input type="text" className="name" name="name" placeholder="Enter your name" />
                <label htmlFor="email">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" />
                <label htmlFor="password">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" />
                <label htmlFor="password">Repeat password:</label>
                <input type="password" className="password" name="repeatPassword" placeholder="Repeat your password" />
                <button className="buttom button-submit" type="submit" value="register">Register</button>
            </form>
            <p className="goto-login border-top-gradient">
                Already registered? <br />
                Login <a href="#" onClick={handleLoginClick}>here</a>.
            </p>
        </section>
    </div>
}
