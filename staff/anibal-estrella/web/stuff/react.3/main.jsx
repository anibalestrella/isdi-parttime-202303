function Login(props) {

    // 2 // this function will send the event to its parent 
    function handleGoToRegisterClick(event) {
        event.preventDefault()

        // 3 // ask the parent function for a function (sent through the CALLBACK component's props) when a click event occurs 
        props.onRegisterClick()
    }

    return <div className="login center-container off">
        <section className="panel">
            <h2>Login</h2>
            <form>
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


function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }

    return <div className="register center-container off">
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

// this function composite the components and it saves STATES
// STATE handles visual elements of the APP
class App extends React.Component {
    constructor(props) {
        super(props)

        // this is the default state of the App component
        this.state = { view: 'login' }
    }
    // 5 // this function changes the STATE in the App component from 'login' to 'register'
    handleGoToRegister() {
        // 6 // setState changes the state.view to REGISTER in the RENDER function
        this.setState({ view: 'register' })
        console.log('render register div!')
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
        console.log('render Login! div')
    }

    // is a method REFRESHES to Render in the DOM
    render() {
        // 4 // call function through props (property)
        if (this.state.view === 'login')
            return <Login onRegisterClick={this.handleGoToRegister.bind(this)} />
        else
            return <Register onLoginClick={this.handleGoToLogin.bind(this)} />
    }
}

// link react w/DOM 

ReactDOM.createRoot(document.querySelector('#root')).render([<App />])



