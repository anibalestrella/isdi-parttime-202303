import React, { useState, useEffect } from 'react'
import isUserLoggedIn from '../../logic/users/isUserLoggedIn'
import retrieveUser from '../../logic/users/retrieveUser'
import { Link, Navigate, useLocation } from 'react-router-dom';

import { Drawer } from './'
import { PlusCircleIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { } from '@heroicons/react/24/outline'


function menuBottom() {
    const [isVisible, setIsVisible] = useState(false);

    function closeMenuLayer() {
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
        closeMenuLayer()
        logOutUser()
        navigate('/')
    }

    const loginItem = isUserLoggedIn() ? (
        { id: "logout", link: "/", label: "logout", click: handleLogOut }
    ) : (
        { id: "login/register", link: "/login", label: "login/register" }
    )
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => {
        if (!isDrawerOpen) {
            setDrawerOpen(true);
            console.log('>>> OPEN');
        } else {
            setDrawerOpen(false);
            console.log('>>> CLOSE');

        }

    }

    return (<>
        {isUserLoggedIn() &&
            <nav className="flex-no-wrap fixed bottom-2 z-10 flex w-full items-center  px-2 h-15"  >
                <div className="h-12 flex-wrap w-full px-3 shadow-black/10  rounded-full  bg-gray-100/90 shadow-md backdrop-blur-lg  ">
                    <ul className="h-full list-style-none mr-auto flex pl-0 flex-row items-center justify-evenly w-full">
                        <li>
                            <button className="flex items-center flex-col border-0 px-2 text-gray-400  hover:text-red hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0" onClick={() => setIsVisible(prev => !prev)} >
                                <HomeIcon className='w-6 h-6' />
                                <span className='text-center text-[0]'>Home</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center flex-col border-0 px-2 text-gray-400  hover:text-red hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0" onClick={() => setIsVisible(prev => !prev)} >
                                <HeartIcon className='w-6 h-6' />
                                <span className='text-center text-[0]'>Home</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center flex-col border-0 px-2 text-gray-400  hover:text-red hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0" onClick={openDrawer} >
                                <PlusCircleIcon className='p-0 m-0 w-10  aspect-square ' />
                                <span className='text-center text-[0]'>Create</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center flex-col border-0 px-2 text-gray-400  hover:text-red hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0" onClick={() => setIsVisible(prev => !prev)} >
                                <MagnifyingGlassIcon className='w-6 h-6' />
                                <span className='text-center text-[0]'>Search</span>
                            </button>
                        </li>
                        {
                            isUserLoggedIn() ? (
                                <div div='user-avatar' className="relative">
                                    <Link className="hidden-arrow flex items-center whitespace-nowrap" to="/profile" >
                                        {user && <>
                                            <img className="h-10 w-10 object-cover rounded-full border-2 hover:border-red border-solid transition duration-150 bg-gray-200 hover:bg-red ease-in-out  motion-reduce:transition-none" src={user.avatar} alt={user.avatar} label={'go to ptofile'} /> </>}
                                    </Link>
                                </ div>
                            ) : (
                                <ul className='list-none' >
                                    <MenuItem to="/login" tag={Link} liClassName='text-gray-400 w-6 h-6 mr-2' handleItemClick={handleLoginReload}
                                        alt="log me in" title='Log me in' >
                                        <ArrowLeftOnRectangleIcon className='scale-x-[-1]' />
                                    </MenuItem>
                                </ul>)}
                    </ul>

                </div>
            </nav >


        }
        <Drawer openDrawer={openDrawer} isDrawerOpen={isDrawerOpen} />
    </>
    )
}

export default menuBottom;
