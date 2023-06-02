import { useState } from "react"
import { context } from "./ui.js"

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
//CONTEXT/ALERTS/00// import the context that centyralizes a  
import Alert from "./components/Alert"
import Context from "./Context"

import Loader from "./library/Loader"

export default function App() {
    const [view, setView] = useState(context.userId ? 'home' : 'login')
    //CONTEXT/ALERTS/04// setFeedback is called from the context and will set an Alert message
    const [feedback, setFeedback] = useState(null)

    const [loader, setLoader] = useState(false)

    const freeze = () => setLoader(true)
    const unfreeze = () => setLoader(false)

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')
    //CONTEXT/ALERTS/04// setFeedback is set as null to close/reset component
    const handleAcceptAlert = () => setFeedback(null)

    const alert = (message, level = 'info') => setFeedback({ message, level })

    console.debug('// App -> RENDER');

    //CONTEXT/ALERTS/04// setFeedback is called from the context 
    return <Context.Provider value={{ alert, freeze, unfreeze }}>
        {/* // as soon as we change the state value of loader we render it */}
        {loader && <Loader />}

        {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}

        {/* //CONTEXT/ALERTS/END// setFeedback is called with the shared message from the alert error */}
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
        {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    </Context.Provider>

}



