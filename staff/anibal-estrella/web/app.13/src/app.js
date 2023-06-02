// componente principal que gestiona todas las vistas de l
import  { Component } from './library/composito.js'
import Login from  './pages/login.js'

export default class App extends Component {
    constructor(){
        super('<div></div>')

        const login = new Login
        this.add(login)
    }
}