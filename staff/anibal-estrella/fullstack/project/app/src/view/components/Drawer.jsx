import React, { useState } from 'react';

import { Link, Navigate, useLocation } from 'react-router-dom';

import { CreateMenu } from '../components'


function Drawer({ openDrawer, isDrawerOpen }) {
    const location = useLocation();
    const [reloadKey, setReloadKey] = useState(0) //re render component

    const handleClose = () => {
        openDrawer()
        setReloadKey((prevKey) => prevKey + 1)

    }

    return (
        <div className={`fixed bottom-0 w-full bg-gray-100 z-40 rounded-t-xl duration-300 transition-all ease-in-out ${isDrawerOpen ? "h-1/2" : " h-0"} `}>
            <div className="grid grid-cols-2  h-full ">
                <h2 className="px-2 pt-2 font-bold mb-2 text-xs text-gray-300 ">Bottom Drawer Content</h2>
                <button className=" px-2 pt-2 text-gray-300 text-xs self-start place-self-end" onClick={handleClose}>Close</button>
                <div className='w-full overflow-y-auto overflow-x-hidden col-span-2'>

                    <CreateMenu handleClose={handleClose} reloadKey={reloadKey} openDrawer={openDrawer} />

                </div>
            </div>
        </div>
    );
}

export default Drawer;
