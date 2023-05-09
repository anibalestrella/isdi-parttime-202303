import { Component } from 'react'
import Posts from "../components/Posts"
import retrieveUser from "../logic/retrieveUser"
import { context } from "../ui"
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import Profile from '../components/Profile'
import Menu from '../components/Menu'
//import each component styles
import './Home.css'

export default class Home extends Component {



    constructor(props) {
        super(props)
        try {
            const loggedUser = retrieveUser(context.userId)

            this.name = loggedUser.name
            this.avatar = loggedUser.avatar
            // we keep postId in state so that we can retrieve it later when the postModal opens
            this.state = { view: 'posts', modal: null, menu: null, postId: null }

        } catch (error) {
            alert(error.message)
        }
    }

    handleOpenAddPostModal = () => this.setState({ modal: 'add-post' })

    closeModal = () => this.setState({ modal: null })


    HandleOpenEditPostModal = postId => {
        console.log('edit modal!!!')
        // we keep the postId in state so that we can retrieve it later when the postModal is called
        // this.setState({ modal: 'edit-post', postId : postId }) Old
        this.setState({ modal: 'edit-post', postId })
    }

    handleGoToProfile = event => {
        this.setState({ view: 'profile' })
    }

    handleGoToHome = event => {
        event.preventDefault()
        this.setState({ view: 'posts' })
    }

    handleOpenMenu = event => {
        event.preventDefault()

        this.setState({ menu: 'menu' })
    }

    handleCloseMenu = () => this.setState({ menu: null })


    handleLogOut = () =>{
        console.log('LOG OUT MOTHERFUCKER!!!');
        this.setState({ view: null })

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
                        <button className="menu-open" onClick={this.handleOpenMenu}>&#9776;</button>
                    </div>

                    {this.state.menu === 'menu' && <Menu
                        openProfile={this.handleGoToProfile}
                        onCloseMenu={this.handleCloseMenu}
                        createPost={this.handleOpenAddPostModal}
                        onLogOut={this.handleLogOut}
                    />}

                </header>

                <div className="hello-user">
                    <a href="#" className="home-profile-avatar-link" onClick={this.handleGoToProfile}>
                        <img className="user-avatar home-profile-avatar" src={this.avatar} alt="" />
                    </a>
                    <h2 className="hello-user-headline">Hi <span className="hello-user-name">{this.name}</span>! <br />What's up?</h2>
                </div>

                {this.state.view === 'posts' && <Posts 
                    onEditPost={this.HandleOpenEditPostModal} />}

                {this.state.view === 'profile' && <Profile />}

                {this.state.modal === 'add-post' && <AddPostModal
                    onCancel={this.closeModal}
                    onPostCreated={this.closeModal}
                />}

                {this.state.modal === 'edit-post' && <EditPostModal
                    onCancel={this.closeModal}
                    onPostEdited={this.closeModal}
                    //pass the postId to the state constructor
                    postId={this.state.postId}
                />}

                <footer className="home-footer">
                    <div className="footer-items-wrapper">
                        <button className="add-post-button" onClick={this.handleOpenAddPostModal}>+</button>
                    </div>
                </footer>
            </section>
        </div>
    }

}