import { Component } from 'react'
import  Posts from "../components/Posts"

export default class Home extends Component {
    // console.log('// Home -> RENDER');

    constructor() {
        super();
    }

    render() {
        return <div className="home ">
            <section>
                <header className="home-header">
                    <div className="header-items-wrapper">
                        <a href="#" className="header-title-link">
                            <h1>APP Home</h1>
                        </a>
                        <a href="#" className="home-profile-avatar-link">
                            <img className="user-avatar home-header-avatar" src="" alt="" />
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
                            <li className="menu-create-post"><a href="#">Create Post</a></li>
                        </ul>
                    </nav>
                </header>

                <div className="hello-user">
                    <a href="#" className="home-profile-avatar-link">
                        <img className="user-avatar home-profile-avatar" src="" alt="" />
                    </a>
                    <h2 className="hello-user-headline">Hi <span className="hello-user-name"></span>! <br />What's up?</h2>
                </div>

                <main></main>

                <Posts />

            
                <footer className="home-footer">
                    <div className="footer-items-wrapper">
                        <button className="add-post-button">+</button>
                    </div>
                </footer>
            </section>
        </div>
    }

}