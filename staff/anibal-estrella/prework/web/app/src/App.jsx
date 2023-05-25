import { useState } from "react"
import { context } from "./ui.js"

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import Alert from "./components/Alert"
import Context from "./Context"

export default function App() {
    const [view, setView] = useState(context.userId ? 'home' : 'login')
    const [feedback, setFeedback] = useState(null)

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const handleAcceptAlert = () => setFeedback(null)

    console.debug('// App -> RENDER');

    return <Context.Provider value={{ alert: setFeedback }}>

        {feedback === <Alert message={feedback} onAccept={handleAcceptAlert} />}
        {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
        {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
        {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}
    </Context.Provider>

}



