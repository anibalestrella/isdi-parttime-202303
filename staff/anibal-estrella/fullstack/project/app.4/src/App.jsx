import React, { useState, useEffect } from 'react'
import { retrieveUserGeolocation, logOutUser } from './logic/users'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, retrieveUser } from './logic/users/'
import { Home, Profile, Login, Create } from './view/pages'
import { MenuTop, MenuBottom, Footer, Alert, Confirm } from './view/components'
import { Loader } from './view/library'
import { useAppContext } from './view/hooks'
import AppContext from './AppContext'

const { Provider } = AppContext

function App() {
    console.log('>>> App');

    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [city, setCity] = useState('');
    const [user, setUser] = useState()
    const [feedback, setFeedback] = useState(null)
    const [feedbackConfirm, setFeedbackConfirm] = useState(null)

    // const [loader, setLoader] = useState(false)

    const [loaderPercentage, setLoaderPercentage] = useState(0);

    let interval;

    const freeze = () => {
        let fastIncrement = true;

        setLoaderPercentage(10);
        interval = setInterval(() => {
            setLoaderPercentage(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                if (fastIncrement) {
                    return prev + 2;
                }
                return prev + 0.5;
            });
        }, 50);

        setTimeout(() => {
            fastIncrement = false;
        }, 1000);
    }

    const unfreeze = () => {
        clearInterval(interval);
        setLoaderPercentage(100);
        setTimeout(() => setLoaderPercentage(0), 500);  // Reset after a half-second delay
    }

    const alert = (message, level = 'info') => setFeedback({ message, level })

    const confirm = (message, actionType, level = 'warning') => setFeedbackConfirm({ message, actionType, level })

    function handlePanelClick(event) {
        event.stopPropagation();
    }

    const handleClose = () => {
        setFeedback(null)
        setFeedbackConfirm(null)
    }

    const handleCancel = () => {
        setFeedback(null)
        setFeedbackConfirm(null)
    }

    function closeMenuTopLayer() {
        setIsVisible(false);
    }

    const handleConfirmOk = (confirmed) => {
        if (confirmed) {
            switch (feedbackConfirm.actionType) {
                case "logout":
                    logOutUser();
                    handleCancel()
                    closeMenuTopLayer();
                    navigate('/');
                    break;
                case "sendMessage":
                    console.log("Sending message...");
                    break;
                default:
                    handleCancel()
            }
        }
    };


    const handleLogOut = () => {
        const actionType = "logout"
        confirm(`${user.name}, are you sure you want to log out ? `, actionType);
    };

    const [ipGeoLocation, setGeolocation] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isUserLoggedIn()) {
                    const user = await retrieveUser();
                    setUser(user);
                    console.log(`############### ${user.name} is logged ###############`);
                }
            } catch (error) {
                alert(error.message);
            }

            try {
                const geolocationData = await retrieveUserGeolocation();
                const closestCity = geolocationData.closestCity;
                const originalLocation = geolocationData.originalLocation;
                setCity(closestCity);
                setGeolocation(originalLocation);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchData();
    }, []);


    return <Provider value={{ alert, confirm, freeze, unfreeze }} >

        <MenuTop
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isUserLoggedIn={isUserLoggedIn}
            handleLogOut={handleLogOut}
            closeMenuTopLayer={closeMenuTopLayer}
        />


        <Routes>
            {(() => console.log("ROUTES = render"))()}

            <Route path="/" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} retrieveUser={retrieveUser} />} />
            <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" city={city} ipGeoLocation={ipGeoLocation} user={user} /> : <Login city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/profile" element={<Profile city={city} ipGeoLocation={ipGeoLocation} user={user}
                onOk={handleClose}
                onPanelClick={handlePanelClick}
                onCancel={handleCancel}

            />} />
            <Route path="/events" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/reviews" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/artists" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/Create" element={<Create city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
        </Routes>

        {feedback && <Alert
            message={feedback.message}
            level={feedback.level}
            onOk={handleClose}
            onPanelClick={handlePanelClick}
        />}

        {feedbackConfirm &&
            <Confirm
                message={feedbackConfirm.message}
                level={feedbackConfirm.level}
                onPanelClick={handlePanelClick}
                onCancel={handleCancel}
                onConfirmOk={handleConfirmOk}
            />}

        {loaderPercentage > 0 && <Loader percentage={loaderPercentage} />}

        <Footer isUserLoggedIn={isUserLoggedIn} city={city} ipGeoLocation={ipGeoLocation} user={user} />
        <MenuBottom />
    </Provider >
}

export default App;
