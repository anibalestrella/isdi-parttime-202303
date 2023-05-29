import { XCircleIcon } from '@heroicons/react/24/solid'

import "./Menu.css"

export default function Menu(props) {
    console.debug('// Menu -> RENDER')

    function handleClose(event) {
        event.preventDefault()
        props.onCloseMenu()
    }
    
    function handleOpenProfile(event) {
        props.openProfile()
        props.onCloseMenu()
    }

    function handleCreatePost(event) {
        props.createPost()
        props.onCloseMenu()
    }
 
    function handleLogOut(){
        props.onLogOut()
        props.onCloseMenu()
    }
    
    function handleOpenSavedPosts(){
        props.onOpenSavedPosts()
        props.onCloseMenu()
    }
    
    function handleOpenLikedPosts(){
        console.debug('// handleOpenLikedPosts !!!');
        props.onOpenLikedPosts()
        props.onCloseMenu()
    }

    function handleDarkTheme(){
        console.debug('// TODO:DARK THEME');  
    }

    return <nav className="home-menu center-container">
        <ul>
            <li className="menu-close">
                <a href="#" className="close-menu" onClick={handleClose} >Close Menu<XCircleIcon className='XCircleIcon icon'/></a>
            </li>
            <li className="menu-profile" ><a href="#" onClick={handleOpenProfile}>Edit your profile</a></li>
            {/* <li className="menu-show-posts" ><a href="#">Show Posts</a></li> */}
            <li className="menu-create-post" > <a href="#" onClick={handleCreatePost}>Create Post</a></li>
            <li className="menu-saved" ><a href="#" onClick={handleOpenSavedPosts}>Saved Posts</a></li>
            <li className="menu-liked" ><a href="#" onClick={handleOpenLikedPosts}>Liked Posts</a></li>
            <li className="menu-logout" ><a href="#"  onClick={handleLogOut}>Logout</a></li>
            <li className='theme'>dark <input type="checkbox" className='toggle-theme' onClick={handleDarkTheme} /> light</li>
        </ul>
    </nav>

}