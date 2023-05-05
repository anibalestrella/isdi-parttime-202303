import { Component } from "react"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"

// this function composite the components and it saves STATES
// STATE handles visual elements of the APP
export default class App extends Component {
    constructor(props) {
        super(props)

        // this is the default state of the App component
        this.state = { view: 'login' }

    }
    // 5 // this function changes the STATE in the App component from 'login' to 'register'
    //converting to arrow functions will AUTOBIND to its parent
    handleGoToRegister = () => {
        // 6 // setState changes the state.view to REGISTER in the RENDER function
        this.setState({ view: 'register' })
    }

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleGoToHomePage = () => this.setState({ view: 'home' })

    // is a method REFRESHES to Render in the DOM
    render() {
        console.log('// App -> RENDER');

        // 4 // call function through props (property)
        switch (this.state.view) {
            case 'login':
                return <Login onRegisterClick={this.handleGoToRegister} onUserLoggedIn={this.handleGoToHome} />
         
           case 'register':
                return <Register onLoginClick={this.handleGoToLogin} />

            case 'home':
                 return <Home />
        }

    }
}



