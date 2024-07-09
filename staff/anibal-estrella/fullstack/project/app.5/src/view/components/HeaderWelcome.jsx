import React, { useState, useEffect } from 'react';
import { Button } from '../library'
import { Link } from 'react-router-dom';
import { isUserLoggedIn } from '../../logic/users/'


function HeaderWelcome({ handleClick, user }) {
    console.log('HeaderWelcome >> RENDER');

    return (
        <div className="grid gap-x-20  md:grid-cols-2 pt-4 md:h-[calc(100vh_-_8rem)] ">
            {/* <div className="grid p-4 grid-cols-2 gap-x-20 h-screen"> */}
            <div className='flex flex-col justify-end '>
                <h2 className='mt-4 md:mt-4 '>
                    {isUserLoggedIn() ? (<> Hi {user && user.name}!! </>) : (<> Hi! </>)}
                    Review events and keep them forever
                </h2>
                <p>
                    Step into a dynamic hub with the energy of live concerts and events, where every beat is a thread connecting individuals from all walks of life. Here, vibrant communities converge to share their passion for music and create unforgettable memories.
                </p>
                <div className=' text-right'>
                    <Link to="/create">
                        <Button className={'max-w-fit mb-4 md:mb-0'} >let's review</Button>
                    </Link>
                </div>
            </div>
            <div className='overflow-hidden rounded-lg w-full h-full row-start-1 mb-4 md:mb-0 md:row-auto'>
                <img src="https://picsum.photos/1500?random=2" alt="" className='object-cover h-full md:h-full w-full' />
            </div>
        </div>
    );
}

export default HeaderWelcome;
