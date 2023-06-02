export default function Register(props) {
    console.log('// Register -> RENDER');

    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }

    return <div className="register center-container">
        <section className="panel">
            <h2>Register</h2>
            <form method="get" className="register-form">
                <label htmlFor="name">Name:</label>
                <input type="text" className="name" name="name" placeholder="Enter your name" />
                <label htmlFor="email">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" />
                <label htmlFor="password">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" />
                <button className="buttom button-submit" type="submit" value="register">Register</button>
            </form>
            <p className="goto-login">
                Already registered? <br />
                Login <a href="#" onClick={handleLoginClick}>here</a>.
            </p>
        </section>
    </div>
}
