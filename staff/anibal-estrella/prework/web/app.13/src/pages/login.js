import { Component } from "../library/composito.js"
import { authenticateUser } from '../logic/authenticate-user.js'
import { context} from "../ui.js"


export default class Login extends Component {
    constructor() {
        super(`<div class="login center-container">
    <section class="panel">
        <h2>Login</h2>
        <form>
            <label for="username">E-mail:</label>
            <input type="text" class="email" name="email" placeholder="Enter your e-mail" value="pj@gmail.com" />
            <label for="lastname">Password:</label>
            <input type="password" class="password" name="password" placeholder="Enter your password" value="123" />
            <button class="button-submit" type="submit">Login</button>
        </form>
        <p class="goto-register">Not registered? <br />Do it <a href="#">here</a>.</p>
    </section>
</div>`)

        this.container.querySelector('form').onsubmit = function (event) {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            try {
                context.userId = authenticateUser(email, password)

                alert('tODO goto home')
            } catch (error) {
                alert(error.message)
            }
        }

    }
}