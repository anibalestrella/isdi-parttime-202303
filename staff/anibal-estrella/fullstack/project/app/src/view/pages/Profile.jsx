import { useAppContext } from "../hooks"

import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button } from '../library'

import {
    retrieveUser,
    isUserLoggedIn,
    updateUserProfile,
    loginUser,
    context
} from "../../logic/users"

const Profile = () => {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    console.debug('/// Profile  -> Render')


    const [user, setUser] = useState({
        name: '',
        nickName: '',
        email: '',
    })

    const [userUpdate, setUserUpdate] = useState({
        userNewName: '',
        userNewNickName: '',
        userNewEmail: '',
        userNewEmailConfirm: '',
        userCurrentPassword: '',
        userNewPassword: '',
        userNewPasswordConfirm: ''
    })
    console.log(userUpdate);
    useEffect(() => {
        try {
            retrieveUser()
                .then(user => {
                    setUser(user);
                    setUserUpdate(prevState => ({
                        ...prevState,
                        userNewEmail: user.email,
                        userNewName: user.name,
                        userNewNickName: user.nickName
                    }));
                })
                .catch(error => alert(error.message));
        } catch (error) {
            alert(error.message);
        }
    }, []);



    console.log(user);

    const [updatedName, setUpdatedName] = useState('');

    // const [Profile, setProfile] = useState(null);
    // const [error, setError] = useState(null); 






    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setUpdatedName(value);
            console.log('handleChange >>>' + value);
        } else {
            setUserUpdate({ ...user, [name]: value });
        }
    }



    const handleUpdateUserProfile = async event => {
        event.preventDefault()

        const userCurrentPassword = event.target.userCurrentPassword.value;
        const userCurrentEmail = user.email;

        const userNewPassword = event.target.userNewPassword.value;
        const userNewName = updatedName || user.name
        const userNewNickName = event.target.nickName.value.substring(1);
        const userNewEmail = event.target.email.value
        const userNewEmailConfirm = event.target.userNewEmailConfirm.value

        if (user.name !== userNewName ||
            user.nickName !== "@" + userNewNickName ||
            user.email !== userNewEmail ||
            userNewPassword.length > 0) {

            try {
                freeze()

                await loginUser(userCurrentEmail, userCurrentPassword)


                updateUserProfile(context.token, userNewName, userNewNickName, userCurrentEmail, userCurrentPassword, userNewEmail, userNewEmailConfirm, userNewPassword, error => {
                    if (error) {
                        alert(error.message, 'error');
                        return;
                    }
                })
                alert('Your profile has been Successfully updated.')

                unfreeze();


            } catch (error) {
                alert(error.message, 'error');
            }
            unfreeze()

        } else {
            alert('There are no changes in your profile.')
        }
    }

    const handleCancel = () => {
        console.log('CANCEL!!');
    }

    const [avatar, setAvatar] = useState(user.avatar);

    const handleAvatarChange = (event) => {
        console.log('AVATAAARRR!');
        const files = event.target.files;
        if (files.length > 0) { // Check if files array is not empty
            const file = files[0]; // Get the first file from the input
            const reader = new FileReader();

            reader.onloadend = () => {
                // Set the avatar state to the base64 data URL of the selected image
                setUserUpdate({ ...user, avatar: reader.result });
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        }
    }

    return (
        <div className='px-3 pt-6'>

            {isUserLoggedIn() ? (
                <div >
                    {user &&
                        <div>
                            <h2>
                                {user.name}, Edit your profile
                            </h2>
                        </div>
                    }
                    <p className='pb-4'>Keep your personal details private. Information you add here is visible to any who can view your profile.
                    </p>
                    {user &&
                        <form action="" onSubmit={handleUpdateUserProfile} >
                            <div div='user-avatar' className="flex flex-col">
                                <p className='grow'>Avatar:</p>

                                <div className='flex flex-row  items-center my-4'>
                                    <img className=" h-28 w-28  mr-2 rounded-full  border-solid transition duration-150 bg-gray-200 " src={user.avatar} alt={user.avatar} />
                                    <div className="grid grid-flow-row">

                                        <label htmlFor='avatar' >
                                            <input
                                                onChange={handleAvatarChange}
                                                type='file'
                                                id='avatar'
                                                accept='image/*'
                                                className='
                                                    max-w-fit
                                                    h-11    
                                                    text-sm
                                                    pl-0
                                                    font-normal
                                                    file:h-11
                                                    file:font-normal 
                                                    file:mr-4
                                                    file:py-2
                                                    file:px-4
                                                    file:rounded-full
                                                    file:border-0
                                                    file:text-xs
                                                    transition-all ease-in-out duration-300 
                                                    file:text-white
                                                    file:uppercase
                                                    file:bg-lime-300 
                                                    file:hover:drop-shadow-lg
                                                    file:hover:bg-lime-200
                                                    file:active:drop-shadow-none
                                                    active:bg-gray-100
                                                    '/>
                                        </label>
                                        <Button type="button" className={'max-w-fit place-self-middle'}>Change</Button>

                                    </div>

                                </div>
                            </ div>
                            <div className='sm:grid gap-2 grid-cols-2 [&>h3]:col-span-2 [&>h3]:mt-4'>
                                <h3 >Name:</h3>
                                <div>
                                    <label htmlFor="Name">Edit Name:</label>
                                    <input type="text"
                                        name="name"
                                        placeholder="Your Name" autoComplete="off"
                                        value={userUpdate.userNewName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>

                                    <label htmlFor="nickName">Edit nickname:</label>
                                    <input type="text"
                                        name="nickName"
                                        placeholder="New nickname"
                                        value={userUpdate.userNewNickName}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <h3>Email:</h3>
                                <div>

                                    <label htmlFor="email">Edit email:</label>
                                    <input type="text"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={userUpdate.userNewEmail}
                                        onChange={handleChange}
                                        autoComplete="enter email"
                                        autoFocus
                                    />

                                </div>
                                <div>
                                    <label htmlFor="userNewEmailConfirm">Confirm new email:</label>
                                    <input
                                        type="text"
                                        name="userNewEmailConfirm"
                                        placeholder="Confirm New Email"
                                        onChange={handleChange}
                                        autoComplete="off" />
                                </div>


                                <h3>Password:</h3>
                                <div>

                                    <label htmlFor="userCurrentPassword">Current password:</label>
                                    <input
                                        type="Password"
                                        name="userCurrentPassword"
                                        placeholder="current password"
                                        onChange={handleChange}
                                        autoComplete="off" />
                                </div>
                                <div>
                                    <label htmlFor="userNewPassword">New password:</label>
                                    <input type="Password"
                                        name="userNewPassword" placeholder="new password"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />

                                    <label htmlFor="userNewPasswordConfirm">Confirm new password:</label>
                                    <input type="Password"
                                        name="userNewPasswordConfirm" placeholder="Confirm new password"
                                        onChange={handleChange}
                                        autoComplete="off" />
                                </div>
                                <div className="grid grid-flow-col w-full  col-span-2 place-content-center gap-2">
                                    <Button type="button" className={'button-cancel max-w-fit hover:button-cancel-hover'} onClick={handleCancel}>Cancel</Button>
                                    <Button type="submit" className={'max-w-fit '}>Save profile</Button>

                                </div>
                            </div>
                        </form>
                    }

                </div>
            ) : (
                <div>
                    <h3>User must be logged</h3>
                </div>
            )}

            {/* // {error && <p className=" bg-lime-200">{error}</p>} */}

        </div>



    );
};


export default Profile;
