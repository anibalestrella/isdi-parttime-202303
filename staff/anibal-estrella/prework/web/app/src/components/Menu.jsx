
export default function Menu({ onCloseMenu}) {
    console.log('// Menu -> RENDER')

    function handleClose(event) {
        event.preventDefault()

        onCloseMenu()
    }
 
    return <nav className="home-menu center-container">
        <ul>
            <li className="menu-close">
                <a href="#" className="close-menu" onClick={handleClose} >Close Menu</a>
            </li>
            <li className="menu-logout" ><a href="#">Logout</a></li>
            <li className="menu-profile"><a href="#" >Edit your profile</a></li>
            <li className="menu-show-posts" ><a href="#">Show Posts</a></li>
            <li className="menu-create-post"><a href="#" >Create Post</a></li>
        </ul>
    </nav>

}