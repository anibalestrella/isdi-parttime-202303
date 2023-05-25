import { useState } from "react"
import { context } from "./ui.js"

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"

export default function App() {
 /* We create a STATE with an initial value using a HOOK. 
        const viewState = useState(view: context.userId? 'home' : 'login')
    the STATE returns an array with 2 things, [0] position: the actual state, [1] a setter to change that state later.

        const view = viewState[0]
        const setView = viewState[1]

    we decosntruct an array instead of above to make it shorter */

    // we can set any names to the variables
    const [view, setView] = useState(context.userId ? 'home' : 'login')

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const onLoggedOut = () => {
        console.log('Logged OUT!!');
    }

    const handleGoToHome = () => setView('home')

    console.log('// App -> RENDER');

    // now we use a FUNCTION type COMPO to RENDER
    switch (view) {
        case 'login':
            return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />

        case 'register':
            return <Register onLoginClick={handleGoToLogin} 
            onUserRegistered={handleGoToLogin}/>

        case 'home':
            return <Home onLoggedOut={handleGoToLogin} 
            
            />
    }
}




