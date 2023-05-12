import { Component } from 'react'
import { context } from "../ui"
import Posts from "../components/Posts"
import retrieveUser from "../logic/retrieveUser"
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import Profile from '../components/Profile'
import Menu from '../components/Menu'
//import each component styles
import './Home.css'

export default class Home extends Component {

// no logro que se repinte home con los cambios, oneditpost, onavatarupdate, ondeletepost....

    constructor(props) {
        super(props)
        try {
            const user = retrieveUser(context.userId)
            const loggedUser = retrieveUser(context.userId)

            this.name = loggedUser.name
            this.avatar = loggedUser.avatar
            this.state = {
                view: 'posts',
                modal: null,
                menu: null,
                postId: null,
                lastPostsUpdate: Date.now(),
                user
            }

        } catch (error) {
            alert(error.message)
        }
    }

    closeModal = () => this.setState({ modal: null })

    handleGoToProfile = event => {
        this.setState({ view: 'profile' })
    }

    handleGoToHome = event => {
        event.preventDefault()
        this.setState({ view: 'posts' })
    }

    handleOpenAddPostModal = () => this.setState({
        modal: 'add-post'
    })

    handleOpenEditPostModal = postId => {
        console.log('edit modal!!!')
        // we keep the postId in state so that we can retrieve it later when the postModal is called
        // this.setState({ modal: 'edit-post', postId : postId }) Old
        this.setState({ modal: 'edit-post', postId, view: 'posts' })
    }

    handleOpenMenu = event => {
        event.preventDefault()

        this.setState({ menu: 'menu' })
    }

    handleCloseMenu = () => this.setState({ menu: null })

    handlePostCreated = () => this.setState({ modal: null, lastPostsUpdate: Date.now() })

    handleLogOut = () => {
        console.log('LOG OUT MOTHERFUCKER!!!');
        this.props.onLogOut()

    }

    handleSwitchMode = () => {
        document.querySelector(':root').classList.toggle('dark')
    }

    onAvatarUpdated = () => {
        this.setState({view: 'posts'})
        this.props.onAvatarUpdatedProfile()
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
                    onEditPost={this.handleOpenEditPostModal}
                    // onPostEdited={this.handlePostCreated}
                    lastPostsUpdate={this.state.lastPostsUpdate}
                />}

                {this.state.view === 'profile' && <Profile onAvatarUpdated={this.onAvatarUpdated} />}

                {this.state.modal === 'add-post' && <AddPostModal
                    onCancel={this.closeModal}
                    onPostCreated={this.handlePostCreated}
                />}

                {this.state.modal === 'edit-post' && <EditPostModal
                    postId={this.state.postId}
                    // once edited update send a new time stamp
                    onPostEdited={this.handlePostCreated}
                    onDeletedPost={this.handlePostCreated}
                    //pass the postId to the state constructor
                    onCancel={this.closeModal}
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