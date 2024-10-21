import { useEffect, useState } from 'react';
// import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from "../hooks"
import { Button } from '../library'
import { AuthPassword } from '../components'
import { createBase64ImageObject } from '../../logic/utilities'
import {
    retrieveUser,
    isUserLoggedIn,
    updateUserProfile
} from "../../logic/users"

export default function Profile({ onOk, onPanelClick, onCancel }) {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [user, setUser] = useState({
        name: '',
        nickName: '',
        email: '',
        avatar: ''
    })

    const [userUpdate, setUserUpdate] = useState({
        userNewName: '',
        userNewNickName: '',
        userNewEmail: '',
        userNewEmailConfirm: '',
        userNewPassword: '',
        userNewPasswordConfirm: '',
        userNewAvatar: '',
        userCurrentEmail: ''
    });

    const [showAuthPassword, setShowAuthPassword] = useState(false)
    const [formChanged, setFormChanged] = useState(false)
    const [userAvatarImagePreview, setUserAvatarImagePreview] = useState("")
    const [avatarObject, setAvatarObject] = useState(null)
    const [formEvent, setFormEvent] = useState(null)

    useEffect(() => {
        retrieveUser()
            .then(user => {
                setUser(user);
                setUserAvatarImagePreview(user.avatar);
                setUserUpdate({
                    userNewName: user.name,
                    userNewNickName: user.nickName,
                    userNewEmail: user.email,
                    userNewPasswordConfirm: '',
                    userNewPassword: '',
                    userCurrentEmail: user.email,
                    userCurrentAvatar: user.avatar,
                    userNewAvatar: '',
                });
            })
            .catch(error => alert(error.message));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserUpdate(prevState => ({
            ...prevState,
            [name]: value
        }));
        setFormChanged(true);
        if (name === 'userNewAvatar') {
            handleAvatarChange(event)
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        setFormEvent(event)
        setShowAuthPassword(true)
    }

    const handleAuthPassword = (isAuthenticated) => {
        if (isAuthenticated) {
            handleUpdateUserProfile(formEvent, isAuthenticated)
        }
    }

    const handleUpdateUserProfile = async (event, isAuthenticated) => {
        event.preventDefault();

        const userNewProfileValues = await getFormNewValues(user, event);

        if (isAuthenticated) {
            setShowAuthPassword(false);

            try {
                await isUserLoggedIn();
                freeze();

                // Perform the profile update, including the new avatar
                const profileChanges = await updateUserProfile(
                    userNewProfileValues.userCurrentName,
                    userNewProfileValues.userCurrentEmail,
                    userNewProfileValues.userCurrentNickName,
                    userNewProfileValues.userNewName,
                    userNewProfileValues.userNewNickName,
                    userNewProfileValues.userNewEmail,
                    userNewProfileValues.userNewEmailConfirm,
                    userNewProfileValues.userNewPassword,
                    userNewProfileValues.userNewPasswordConfirm,
                    userNewProfileValues.userCurrentAvatar,
                    userNewProfileValues.userNewAvatar,
                    avatarObject // Make sure avatarObject is passed correctly
                );

                unfreeze();
                setFormChanged(false);

                // Update the user state with the new values, including the avatar
                const updatedUser = {
                    name: userNewProfileValues.userNewName || user.name,
                    nickName: userNewProfileValues.userNewNickName || user.nickName,
                    email: userNewProfileValues.userNewEmail || user.email,
                    avatar: avatarObject ? avatarObject.file : user.avatar  // Use the new avatar if available
                };

                setUser(updatedUser);
                setUserAvatarImagePreview(updatedUser.avatar); // Update avatar preview

                // Notify user about the changes
                let alertMessage = `Your profile updated successfully: `;
                if (profileChanges.length > 0) {
                    profileChanges.forEach(change => {
                        alertMessage += ` · New ${change}`;
                    });
                    alert(alertMessage);
                } else {
                    alert(`${userNewProfileValues.userCurrentName.toUpperCase()}, no changes were made to your profile.`);
                }

            } catch (error) {
                unfreeze();
                alert(error.message);

                // Revert state on error
                setUserUpdate(getInitialUserUpdateState(user));
                setUserAvatarImagePreview(user.avatar); // Revert avatar to original on error
                setFormChanged(false);
            }
        }
    };

    const getInitialUserUpdateState = (user) => ({
        userNewName: user.name,
        userNewNickName: user.nickName,
        userNewEmail: user.email,
        userNewPassword: '',
        userNewPasswordConfirm: '',
        userNewAvatar: '',
        userNewEmailConfirm: '',
        userCurrentEmail: user.email
    });

    const handleCancel = () => {
        setUserUpdate(getInitialUserUpdateState(user));
        setUserAvatarImagePreview(user.avatar);
        setFormChanged(false);
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setUserAvatarImagePreview(reader.result);
        }
        reader.readAsDataURL(file)

        try {
            const avatarObject = await createBase64ImageObject(file)
            setAvatarObject(avatarObject);
        } catch (error) {
            console.error('Error converting file to base64:', error);
            alert(error.message);
        }
    };

    async function getFormNewValues(user, event) {
        const avatarCurrentObject = await createBase64ImageObject(user.avatar)

        const userNewValues = {}

        const propertiesToCheck = [
            { name: 'Name', current: user.name, new: event.target.userNewName.value },
            { name: 'NickName', current: user.nickName, new: event.target.userNewNickName.value },
            { name: 'Email', current: user.email, new: event.target.userNewEmail.value },
            { name: 'Password', current: null, new: event.target.userNewPassword.value },
            { name: 'EmailConfirm', current: null, new: event.target.userNewEmailConfirm.value },
            { name: 'PasswordConfirm', current: null, new: event.target.userNewPasswordConfirm.value },
            { name: 'Avatar', current: avatarCurrentObject.file, new: event.target.userNewAvatar.value }
        ];

        propertiesToCheck.forEach(property => {
            if (property.current !== null)
                userNewValues['userCurrent' + property.name] = property.current;

            if (property.current !== property.new)
                userNewValues['userNew' + property.name] = property.new;
            else
                userNewValues['userNew' + property.name] = null

        });

        return userNewValues;
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
                        <form action="" onSubmit={handleFormSubmit}>
                            <div id='user-avatar' className="flex flex-col">
                                <h3 >Avatar:</h3>
                                <div className='flex flex-row  items-center my-4'>
                                    <img className="h-28 w-28  object-cover rounded-full  border-2 border-solid transition duration-150  mr-2  bg-gray-200 " src={userAvatarImagePreview} alt='avatar image' />
                                    <div className="grid grid-flow-row">

                                        <label htmlFor='userNewAvatar' >
                                            <input
                                                onChange={handleInputChange}
                                                value={userUpdate.userNewAvatar}

                                                id='userNewAvatar'
                                                type='file'
                                                name='userNewAvatar'
                                                accept="image/*"

                                                className='
                                                    max-w-fit
                                                    h-11    
                                                    text-sm
                                                    pl-0
                                                    file:h-11
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

                                    </div>

                                </div>
                            </ div>
                            <div id="user-data" className='sm:grid gap-2 grid-cols-2 [&>h3]:col-span-2 [&>h3]:mt-4'>
                                <h3 >Name:</h3>
                                <div>
                                    <label htmlFor="userNewName">Edit Name:</label>
                                    <input
                                        type="text"
                                        id='userNewName'
                                        name="userNewName"
                                        placeholder="Your Name"
                                        autoComplete="off"
                                        value={userUpdate.userNewName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>

                                    <label htmlFor="userNewNickName">Edit nickname:</label>

                                    <input type="text"
                                        name="userNewNickName"
                                        id='userNewNickName'
                                        placeholder="New nickname"
                                        value={userUpdate.userNewNickName}
                                        onChange={handleInputChange}
                                        autoComplete="off" />

                                </div>

                                <h3>Email:</h3>
                                <div>

                                    <label htmlFor="userNewEmail">Edit email:</label>
                                    <input type="text"
                                        name="userNewEmail"
                                        id='userNewEmail'
                                        placeholder="Enter your email"
                                        value={userUpdate.userNewEmail}
                                        onChange={handleInputChange}
                                        autoComplete="enter email"
                                        autoFocus
                                    />

                                </div>
                                <div>
                                    <label htmlFor="userNewEmailConfirm">Confirm new email:</label>
                                    <input
                                        type="text"
                                        id="userNewEmailConfirm"
                                        name="userNewEmailConfirm"
                                        placeholder="Confirm New Email"
                                        onChange={handleInputChange}
                                        value={userUpdate.userNewEmailConfirm}
                                        autoComplete="off"
                                    />
                                </div>


                                <h3>Password:</h3>
                                <div>
                                    <label htmlFor="userNewPassword">New password:</label>
                                    <input
                                        type="password"
                                        name="userNewPassword"
                                        id='userNewPassword'
                                        placeholder="New Password"
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        value={userUpdate.userNewPassword}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="userNewPasswordConfirm">Confirm new password:</label>
                                    <input
                                        type="password"
                                        id='userNewPasswordConfirm'
                                        name="userNewPasswordConfirm"
                                        placeholder="Confirm new password"
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        value={userUpdate.userNewPasswordConfirm}
                                    />
                                </div>

                                <div className="grid grid-flow-col w-full  col-span-2 place-content-center gap-2">

                                    <Button type="button" className={`max-w-fit  ${formChanged ? 'button-cancel  hover:button-cancel-hover' : ' hidden'}`} disabled={!formChanged} onClick={handleCancel}>
                                        cancel
                                    </Button>

                                    <Button type="submit" className={`max-w-fit  ${formChanged ? '' : ' hover:bg-gray-400 button-cancel active:bg-gray-500 text-gray-200'}`} disabled={!formChanged}>
                                        Save profile
                                    </Button>

                                </div>
                            </div>
                        </form>
                    }

                    {showAuthPassword &&
                        <AuthPassword
                            onOk={onOk}
                            onAuthentication={handleAuthPassword}
                            onChange={handleInputChange}
                            onPanelClick={onPanelClick}
                            onCancel={onCancel}
                            userCurrentEmail={user.email}
                        />}

                </div>

            ) : (
                <div>
                    <h3>User must be logged</h3>
                </div>
            )}
        </div >
    )
};