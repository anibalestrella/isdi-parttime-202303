function HelloWorld() {
 return <h1>Hello World!</h1>   
}

function Login() {
    return <div className="login center-container off">
    <section className="panel">
        <h2>Login</h2>
        <form>
            <label htmlFor="username">E-mail:</label>
            <input type="text" className="email" name="email" placeholder="Enter your e-mail" value="pj@gmail.com" />
            <label htmlFor="lastname">Password:</label>
            <input type="password" className="password" name="password" placeholder="Enter your password" value="123" />
            <button className="button-submit" type="submit">Login</button>
        </form>
        <p className="goto-register">Not registered? <br />Do it <a href="#">here</a>.</p>
    </section>
</div>
}


function Register(){
    return 	<div className="register center-container off">
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
            Login <a href="#">here</a>.
        </p>
    </section>
</div>
}

// link react w/DOM
const container = document.querySelector('#root')

ReactDOM.createRoot(container).render([<HelloWorld />, <Login />, <Register />])

 

