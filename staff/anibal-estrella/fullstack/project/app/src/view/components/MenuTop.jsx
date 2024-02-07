import React, { useState, useEffect } from 'react'
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { MenuItem } from '../library'
import { MenuTopLayer } from '.'
import isUserLoggedIn from '../../logic/users/isUserLoggedIn'
import logOutUser from '../../logic/users/logOutUser'
import retrieveUser from '../../logic/users/retrieveUser'
import { Link, Navigate, useLocation } from 'react-router-dom';

function menuTop({ isVisible, setIsVisible }) {

    const location = useLocation();

    const handleLoginReload = location.pathname === '/login' ? () => {
        window.location.reload();
        console.log('Reloading on /login');
    } : undefined;


    function closeMenuTopLayer() {
        setIsVisible(false);
    }

    const [user, setUser] = useState()

    useEffect(() => {
        if (isUserLoggedIn()) {
            try {
                retrieveUser()
                    .then(data => {
                        setUser(data);
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            } catch (error) {
                alert(error.message);
            }
        }
    }, [isUserLoggedIn()]);


    const handleLogOut = () => {
        closeMenuTopLayer()
        logOutUser()
        navigate('/')
    }



    const loginItem = isUserLoggedIn() ? (
        { id: "logout", link: "/", label: "logout", click: handleLogOut }
    ) : (
        { id: "login/register", link: "/login", label: "login/register", click: handleLoginReload }
    )


    const menuItems = [
        { id: "create", link: "/create", label: "create" },
        { id: "events", link: "/events", label: "events" },
        { id: "reviews", link: "/reviews", label: "reviews" },
        { id: "artists", link: "/artists", label: "artists" },
        loginItem,
    ];



    return (
        <>
            {isVisible && (
                <MenuTopLayer
                    onLogOut={handleLogOut}
                    onClose={closeMenuTopLayer}
                    items={menuItems}
                    isUserLoggedIn={isUserLoggedIn}
                />
            )}

            <nav className="flex-no-wrap sticky top-0 z-10 flex w-full items-center justify-between pt-2 px-2"  >
                <div className=" flex w-full flex-wrap items-center justify-between px-3 shadow-black/10 sm:flex-wrap sm:justify-start  rounded-full  bg-gray-100/90 py-2 shadow-md backdrop-blur-lg">
                    <Link to='/' className="hover:text-red">
                        <h1 className="text-gray-400 flex items-center mx-4 font-extrabold bg-[url('../../../assets/LiveDive-Logo-B.svg')] bg-no-repeat bg-left bg-contain hover:text-red w-10 h-10  text-center text-[0] " >LiveDive</h1>
                    </Link>

                    <div className=" hidden flex-grow  items-center sm:!flex sm:basis-auto"
                        id="navbarSupportedContent1">

                        {/* <!-- Left navigation links --> */}

                        <ul className="list-style-none mr-auto flex flex-col pl-0 sm:flex-row">

                            {menuItems.map(item => (
                                <MenuItem
                                    key={item.id}
                                    tag={Link}
                                    id={item.id}
                                    className="p-4 text-gray-400"
                                    to={item.link}
                                    handleItemClick={item.click ? item.click : closeMenuTopLayer}
                                >
                                    {item.label}
                                </MenuItem>
                            ))}

                        </ul>
                    </div>

                    {/* <!-- Right elements --> */}
                    <div className="flex items-center flex-row">

                        {/* <!-- User avatar --> */}
                        {isUserLoggedIn() ? (
                            <div div='user-avatar' className="relative">
                                <Link className="hidden-arrow flex items-center whitespace-nowrap" to="/profile" >
                                    {user && <>
                                        <img className="h-10 w-10 rounded-full border-2 hover:border-red border-solid transition duration-150 bg-gray-200 hover:bg-red ease-in-out  motion-reduce:transition-none" src={user.avatar} alt={user.avatar} /> </>}
                                </Link>
                            </ div>
                        ) : (
                            <ul className='list-none' >
                                <MenuItem to="/login" tag={Link} liClassName='text-gray-400 w-6 h-6 mr-2' handleItemClick={handleLoginReload}
                                >
                                    <ArrowLeftOnRectangleIcon className='scale-x-[-1]' />
                                </MenuItem>
                            </ul>)}


                        {/* <!-- Hamburger button for mobile view --> */}
                        <button className="block border-0 px-2 text-gray-400  hover:text-red hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 sm:hidden " onClick={() => setIsVisible(prev => !prev)} >

                            {/* <!-- Hamburger icon --> */}
                            <span className="[&>svg]:w-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-7 w-7">
                                    <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    />
                                </svg>
                            </span>
                        </button>

                    </div>
                </div>
            </nav >
            <div>
                {isUserLoggedIn() &&
                    // Render elements for logged-in user
                    <div className='pt-2 px-3'>
                        <p>Welcome,
                            {user && <> {user.name} from {user.city}</>}!
                        </p>
                        {/* Other elements for logged-in user */}
                    </div>
                }
            </div>
        </>
    )
}

export default menuTop;