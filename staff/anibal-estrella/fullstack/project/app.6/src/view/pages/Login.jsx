import { useState } from 'react';
import { useAppContext } from '../hooks'

import { loginUser, retrieveUserEmail, registerUser } from '../../logic/users/';
import { Button } from '../library'

const Login = ({ city, ipGeoLocation }) => {
    console.debug('// Login/Register  -> Render');
    const [showPasswordLayer, setShowPasswordLayer] = useState(null);
    const [email, setEmail] = useState("");
    const { alert, confirm, freeze, unfreeze, navigate } = useAppContext()

    function handleLoginEmail(event) {
        event.preventDefault()
        const userEmail = event.target.email.value;
        setEmail(userEmail)
        try {
            freeze()
            retrieveUserEmail(userEmail)
                .then(() => {
                    setShowPasswordLayer(true)
                })
                .catch(error => {
                    alert(error.message)
                    if (error.status === 406) {
                        setShowPasswordLayer(null)
                    } else {
                        setShowPasswordLayer(false)
                    }
                })
        } catch (error) {
            unfreeze()
            alert(error.message)
        } finally {
            unfreeze();
        }
    }

    const handleLogin = async event => {
        event.preventDefault();
        const password = event.target.password.value;

        try {
            freeze();
            await loginUser(email, password)
            navigate('/', { replace: true })
        } catch (error) {
            alert(error.message, 'error');
        } finally {
            unfreeze();
        }
    }

    function handleRegister(event) {
        event.preventDefault()
        const name = event.target.name.value
        const nickName = event.target.nickName.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value
        const emailConfirm = event.target.emailConfirm.value

        try {
            freeze()
            registerUser(name, nickName, email, emailConfirm, password, repeatPassword, city, ipGeoLocation)
                .then(() => {
                    alert(`Thank you ${name}!\n you have been succesfully registered\n with the ${email} email address.`)
                    setShowPasswordLayer(null)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
        unfreeze()
    }

    const handleCancel = () => {
        setShowPasswordLayer(null);
    }

    return <div className='flex items-center justify-center px-4 h-[calc(100vh-7rem)]'>
        <div className=''>

            {showPasswordLayer === null && (
                <div id='login-register' >
                    <h2>Register / Login</h2>
                    <form action="" onSubmit={handleLoginEmail}>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" className="h-10" name="email" placeholder="Enter your e-mail" autoComplete="on" autoFocus />
                        <Button type="submit" value="validateEmail">continue with email</Button>
                    </form>
                </div>
            )}

            {showPasswordLayer && (
                <div id='login'>
                    <h2>Login</h2>
                    <form action="" onSubmit={handleLogin}>
                        <label htmlFor="Email">Email:</label>
                        <p>{email}</p>
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="on" autoFocus />
                        <Button type="submit" value="loginUser">Continue with password</Button>
                    </form>
                </div>
            )}

            {showPasswordLayer === false && (
                <div id="register" tag='section'  >

                    <h2>Register</h2>
                    <div className='self-start mb-8'>
                        {city && <p>Your City: {city} Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
                        <p>There's no related account by the <span className=' font-bold'>{email}</span> email.</p>
                    </div >
                    <form method="get" className="grid grid-cols-2 gap-4" onSubmit={handleRegister}>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="enter email" autoFocus />
                        </div>

                        <div>
                            <label htmlFor="emailConfirm">Email Confirmation:</label>
                            <input type="text" className="" name="emailConfirm" placeholder="Please confirm your eMail" autoComplete="Enter eMail confiormation" autoFocus />
                        </div>

                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="name" name="name" placeholder="Enter your name" autoComplete="enter name" autoFocus />
                        </div>

                        <div>

                            <label htmlFor="nickName">Nick name:</label>
                            <input type="text" className="nickName" name="nickName" placeholder="Enter your nickname" autoComplete="on" />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="off" />

                        </div>

                        <div>
                            <label htmlFor="password">Repeat password:</label>
                            <input type="password" className="password" name="repeatPassword" placeholder="Repeat your password" autoComplete="off" />
                        </div>

                        <Button type="button" className={'button-cancel hover:button-cancel-hover'} onClick={handleCancel}>Cancel</Button>

                        <Button type="submit" value="register" on>Register</Button>
                    </form>
                </ div >
            )}
        </div>
    </div>
}

export default Login;