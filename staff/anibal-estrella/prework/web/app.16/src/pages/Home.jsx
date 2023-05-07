import { Component } from 'react'
import Posts from "../components/Posts"
import retrieveUser from "../logic/retrieveUser"
import { context } from "../ui"
import AddPostModal from '../components/AddPostModal'

export default class Home extends Component {

    
    
    constructor(props) {
        super(props)
        try {
            const loggedUser = retrieveUser(context.userId)
            
            this.name = loggedUser.name
            this.avatar= loggedUser.avatar
            
            this.state = { view: null }

        } catch (error) {
            alert(error.message)
        }
    }
    
    handleAddPost = () => this.setState({ view: 'add-post' })
    handleCancelAddPost = () => this.setState({ view: null });
    render() {
        console.log('// Home -> RENDER')
        return <div className="home ">
            <section>
                <header className="home-header">
                    <div className="header-items-wrapper">
                        <a href="#" className="header-title-link">
                            <h1>APP Home</h1>
                        </a>
                        <a href="#" className="home-profile-avatar-link">
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
                            <li className="menu-profile"><a href="#">Edit your profile</a></li>
                            <li className="menu-show-posts"><a href="#">Show Posts</a></li>
                            <li className="menu-create-post"><a href="#" onClick={this.handleAddPost}>Create Post</a></li>
                        </ul>
                    </nav>
                </header>

                <div className="hello-user">
                    <a href="#" className="home-profile-avatar-link">
                        <img className="user-avatar home-profile-avatar" src={this.avatar} alt="" />
                    </a>
                    <h2 className="hello-user-headline">Hi <span className="hello-user-name">{this.name}</span>! <br />What's up?</h2>
                </div>

                <Posts />
     
                {/* //if the state.view value is  'add.post' then load the component AddPostModal */}
                {this.state.view === 'add-post' && <AddPostModal onCancel={this.handleCancelAddPost}/>}

                <footer className="home-footer">
                    <div className="footer-items-wrapper">
                        <button className="add-post-button" onClick={this.handleAddPost}>+</button>
                    </div>
                </footer>
            </section>
        </div>
    }

}