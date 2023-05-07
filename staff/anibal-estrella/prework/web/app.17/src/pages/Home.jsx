import { Component } from 'react'
import Posts from "../components/Posts"
import retrieveUser from "../logic/retrieveUser"
import { context } from "../ui"
import AddPostModal from '../components/AddPostModal'
import Profile from '../components/Profile'

export default class Home extends Component {



    constructor(props) {
        super(props)
        try {
            const loggedUser = retrieveUser(context.userId)

            this.name = loggedUser.name
            this.avatar = loggedUser.avatar

            this.state = { view: 'posts', modal: null }

        } catch (error) {
            alert(error.message)
        }
    }

    handleOpenAddPost = () => this.setState({ modal: 'add-post' })
    
    handleCloseAddPost = () => this.setState({ modal: null })
    
    handleGoToProfile = event => {
        event.preventDefault()
        this.setState({ view: 'profile' })
    }

    handleGoToHome = event => {
        event.preventDefault()
        this.setState({ view: 'posts' })
    }

    render() {
        console.log('// Home -> RENDER')
        return <div className="home ">
            <section>
                <header className="home-header">
                    <div className="header-items-wrapper">
                        <h1> <a href="#" className="header-title-link" onClick={this.handleGoToHome} >
                           APP Home
                        </a></h1>
                        <a href="#" className="home-profile-avatar-link" onClick={this.handleGoToProfile}>
                            <img className="user-avatar home-header-avatar" src={this.avatar} alt="" />
                        </a>
                        <button className="menu-open">&#9776;</button>
                    </div>

                    <nav className="home-menu center-container off">
                        <ul>
                            <li className="menu-close">
                                <a href="#" className="close-menu">Close Menu</a>
                            </li>
                            <li className="menu-logout"><a href="#">Logout</a></li>
                            <li className="menu-profile"><a href="#" onClick={this.handleGoToProfile}>Edit your profile</a></li>
                            <li className="menu-show-posts" onClick={this.handleGoToHome}><a href="#">Show Posts</a></li>
                            <li className="menu-create-post"><a href="#" onClick={this.handleOpenAddPost}>Create Post</a></li>
                        </ul>
                    </nav>
                </header>

                <div className="hello-user">
                    <a href="#" className="home-profile-avatar-link" onClick={this.handleGoToProfile}>
                        <img className="user-avatar home-profile-avatar" src={this.avatar} alt="" />
                    </a>
                    <h2 className="hello-user-headline">Hi <span className="hello-user-name">{this.name}</span>! <br />What's up?</h2>
                </div>

                {this.state.view === 'posts' && <Posts />}
 
                {this.state.view === 'profile' && <Profile />}

                {this.state.modal === 'add-post' && <AddPostModal onCancel={this.handleCloseAddPost} />}

                <footer className="home-footer">
                    <div className="footer-items-wrapper">
                        <button className="add-post-button" onClick={this.handleOpenAddPost}>+</button>
                    </div>
                </footer>
            </section>
        </div>
    }

}