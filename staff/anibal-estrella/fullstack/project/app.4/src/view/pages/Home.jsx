import React, { useState, useEffect } from 'react'

import { useAppContext } from '../hooks'
import { EventCard, DraggableSlider, HeaderWelcome } from '../components'
import { isUserLoggedIn, retrieveUser } from '../../logic/users/'

export default ({ city }) => {
    console.debug('// Home  -> Render');
    const [user, setUser] = useState()
    const items = Array(10).fill(0).map((_, index) => index + 1) //temporary for the cards slider
    const { alert, confirm, freeze, unfreeze, navigate } = useAppContext(); // Access the context using custom hook
    // const [showMenuLayer, setShowMenuLayer] = useState(false)

    useEffect(() => {
        try {
            if (isUserLoggedIn()) {
                freeze()
                retrieveUser()
                    .then(user => {
                        setUser(user);
                    })
                    .catch(error => alert(error.message))
            }
        } catch (error) {
            alert(error.message)
        }
        unfreeze()
    }, [])

    return <section id="home" className="px-3 [&>section]:pt-4">

        < HeaderWelcome city={city} user={user} isUserLoggedIn={isUserLoggedIn} />

        <section id='Events'>
            <h3>Events in <span>your area: {city}</span></h3>
            <DraggableSlider>
                {Array.from({ length: 10 }).map((_, index) => (
                    <EventCard key={index} />
                ))}
            </DraggableSlider>

        </section>
        <section id='events-featured'>
            <h3>Upcoming Events</h3>
            <DraggableSlider>
                {Array.from({ length: 5 }).map((_, index) => (
                    <EventCard key={index} />
                ))}
            </DraggableSlider>
        </section>
        <section>
            <h3>Featured Review</h3>
            <DraggableSlider>
                {Array.from({ length: 1 }).map((_, index) => (
                    <EventCard key={index} />
                ))}
            </DraggableSlider>
        </section>

    </section>


}