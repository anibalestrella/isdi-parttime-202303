
export default function Menu(props) {
    console.log('// Menu -> RENDER')

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

    return <nav className="home-menu center-container">
        <ul>
            <li className="menu-close">
                <a href="#" className="close-menu" onClick={handleClose} >Close Menu</a>
            </li>
            <li className="menu-profile" onClick={handleOpenProfile}><a href="#" >Edit your profile</a></li>
            {/* <li className="menu-show-posts" ><a href="#">Show Posts</a></li> */}
            <li className="menu-create-post" onClick={handleCreatePost}> <a href="#" >Create Post</a></li>
            <li className="menu-logout"onClick={handleLogOut}><a href="#">Logout</a></li>
        </ul>
    </nav>

}