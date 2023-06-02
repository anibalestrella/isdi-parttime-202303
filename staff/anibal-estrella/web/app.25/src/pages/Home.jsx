import { useState, useEffect } from 'react'
import { context } from "../ui"
import retrieveUser from "../logic/retrieveUser"

import Posts from "../components/Posts"
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import Profile from '../components/Profile'
import Menu from '../components/Menu'

import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'

import './Home.css'

export default function Home({ onLoggedOut }) {

    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [menu, setMenu] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(Date.now())
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)
            })

        } catch (error) {
            alert(error.message)
        }

    }, [])

    const closeModal = () => setModal(null)

    const handleGoToProfile = event => setView('profile')

    const handleGoToHome = event => {
        event.preventDefault()
        setView('posts')
    }

    const handleOpenAddPostModal = () => setModal('add-post')

    const handleOpenEditPostModal = postId => {
        setModal('edit-post')
        setPostId(postId)
        setView('posts')
    }


    const handleOpenMenu = event => {
        event.preventDefault()

        setMenu('menu')
    }

    const handleCloseMenu = () => setMenu(null)

    const handlePostCreated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

    const handleLogOut = () => {
        delete context.userId
        onLoggedOut()
    }


    const handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')

    const handleAvatarUpdated = () => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)
                // setView('profile')
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const salutations = [
        "Long time no see!",
        "What's crackin'?",
        "How's it going?",
        "What's up, my friend?",
        "What's good?",
        "Let's catch up!",
    ]

    const randomSalutation = () => {
        const randomNumber = Math.floor(Math.random() * salutations.length);
        return salutations[randomNumber];
    };

    console.log('// Home -> RENDER')

    return <div className="home ">
        <section>
            <header className="home-header">
                <div className="header-items-wrapper">
                    <h1> <a href="#" className="header-title-link" onClick={handleGoToHome} >
                        Logo
                    </a></h1>

                    <a href="#" className="home-profile-avatar-link" onClick={handleGoToProfile}>

                        {user && <>
                            <img className="user-avatar home-header-avatar" src={user.avatar} alt="" />
                        </>}
                    </a>

                    <button className="menu-open" onClick={handleOpenMenu}><Bars3BottomRightIcon className='Bars3BottomRightIcon icon' /></button>
                </div>

                {menu === 'menu' && <Menu
                    openProfile={handleGoToProfile}
                    onCloseMenu={handleCloseMenu}
                    createPost={handleOpenAddPostModal}
                    onLogOut={handleLogOut}
                />}

            </header>

            <div className="hello-user border-top-gradient">
                <a href="#" className="home-profile-avatar-link" onClick={handleGoToProfile}>

                    {user && <>
                        <img className="user-avatar home-profile-avatar" src={user.avatar} alt="" />
                    </>}

                </a>
                {user && <>
                    <h2 className="hello-user-headline">
                        <span className="hello-user-name">Hi {user.name}.</span>
                        <br />{randomSalutation()}</h2>
                </>}
            </div>

            {view === 'posts' && <Posts
                onEditPost={handleOpenEditPostModal}
                lastPostsUpdate={lastPostsUpdate}
            />}

            {view === 'profile' && <Profile onAvatarUpdated={handleAvatarUpdated} />}

            {modal === 'add-post' && <AddPostModal
                onCancel={closeModal}
                onPostCreated={handlePostCreated}
            />}

            {modal === 'edit-post' && <EditPostModal
                onCancel={closeModal}
                onPostEdited={handlePostCreated}
                postId={postId}
                onDeletedPost={handlePostCreated}
            />}

            <footer className="home-footer">
                <div className="footer-items-wrapper">
                    <button className="add-post-button icon" onClick={handleOpenAddPostModal}> <PencilSquareIcon className="add icon" />Add Post</button>
                </div>
            </footer>
        </section>
    </div>

}