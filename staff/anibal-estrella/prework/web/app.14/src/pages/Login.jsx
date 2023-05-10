import { context } from "../ui.js"
import { authenticateUser } from "../logic/authenticateUser.js"

export default function Login(props) {
    console.log('// Login -> RENDER');

    // 2 // this function will send the event to its parent 
    function handleGoToRegisterClick(event) {
        event.preventDefault()

        // 3 // ask the parent function for a function (sent through the CALLBACK component's props) when a click event occurs 
        props.onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {

            const userId = authenticateUser(email, password)

            context.userId = userId

            props.onUserLoggedIn()

        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="login center-container">
        <section className="panel">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" />
                <label htmlFor="lastname">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" />
                <button className="button-submit" type="submit">Login</button>
            </form>
            {/* // 1 // we created a property to grab the onclick event and call a function  */}
            <p className="goto-register">Not registered? <br />Do it <a href="#" onClick={handleGoToRegisterClick}>here</a>.</p>
        </section>
    </div>
}