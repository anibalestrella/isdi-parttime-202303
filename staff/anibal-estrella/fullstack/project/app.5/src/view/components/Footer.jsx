import React from 'react'
import getCurrentYear from '../../logic/helpers/getCurrentYear'

function Footer({ isUserLoggedIn, ipGeoLocation, city }) {

    const currentYear = getCurrentYear();

    return (<>
        <footer className='flex justify-end flex-col items-end pt-2 px-3'>
            <div>
                {isUserLoggedIn() ? (

                    <div className='pt-2 px-3'>
                        <div className=' text-xs pb-4'>
                            {city && <p>Your City: {city} Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
                        </div >
                    </div>
                ) : (
                    <></>
                )}

            </div>
            <p>Live Dive® · {currentYear}</p>
        </footer>    </>
    )
}

export default Footer;
