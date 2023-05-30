import { useState, useRef, useEffect, useContext } from 'react';
import Context from "../Context"

import { context } from '../ui'
import updateUserAvatar from "../logic/updateUserAvatar"
import updateUserPassword from "../logic/updateUserPassword"
import updateUserEmail from "../logic/updateUserEmail"
import retrieveUser from "../logic/retrieveUser"

import Panel from "../library/Panel"

import { EyeIcon } from '@heroicons/react/24/solid'
import './Profile.css'

export default function Profile({ onAvatarUpdated }) {
    const { alert, freeze, unfreeze } = useContext(Context)

    const [name, setUserName] = useState()
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUserName(user.name)
                setPreviewImage(user.avatar)
            })

        } catch (error) {
            alert(error.message)
        }
        //we send an empty array just to load it for the first time
    }, [])

    const handleUpdateAvatar = event => {
        event.preventDefault()

        const url = event.target.url.value

        try {
            freeze()
            updateUserAvatar(context.userId, url, error => {

                if (error) {
                    alert(error.message)

                    return
                }

                unfreeze()
                onAvatarUpdated()
            })

        } catch (error) {
            alert(error.message)
            unfreeze()
        }
    }

    const handleUpdatePassword = event => {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            unfreeze()
            updateUserPassword(context.userId, password, newPassword, newPasswordConfirm, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })
            unfreeze()
            alert('Your Password has been Successfully updated.')

        } catch (error) {
            alert(error.message)
        }
        unfreeze()

    }

    const handleChangeUserEmail = event => {
        event.preventDefault()

        const emailConfirm = event.target.newEmail.value
        const newEmailConfirm = event.target.newEmailConfirm.value

        try {
            freeze()

            updateUserEmail(context.userId, emailConfirm, newEmailConfirm, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })

            alert('Your email has been Successfully updated.')

        } catch (error) {
            alert(error.message)
        }
        unfreeze()
    }

    const imageInputRef = useRef();

    const handleImagePreview = (event) => {
        event.preventDefault()

        setPreviewImage(imageInputRef.current.value);

    }

    console.debug('// Profile -> RENDER')

    return <div className="home-profile">
        <section className='border-top-gradient'>
            <h2 className="profile-headline ">{name}'s Profile</h2>
            <Panel tag="section" className="change-user-avatar">
                <h3 className="change-user-avatar-headline">Change your avatar</h3>
                <div>
                    <img className="user-avatar home-profile-avatar" src={previewImage} alt="" />
                    <form action="" className="change-user-avatar-form " onSubmit={handleUpdateAvatar}>

                        <div>
                            <input type="url" name="url" placeholder="Avatar image URL" accept="image/*" ref={imageInputRef} onPaste={handleImagePreview} />
                            <button className="preview-image-button icon post-button" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button>
                        </div>

                        <button className='button change-avatar-submit' type="submit">Change Avatar</button>
                    </form>
                </div>

            </Panel>

            <Panel tag="section" className="change-user-password">
                <h3 className="change-password-headline">Change Your Password</h3>
                <form action="" className="change-user-password-form" onSubmit={handleUpdatePassword}>
                    <input type="password" name="password" placeholder="Enter your password" />
                    <input type="password" name="newPassword" placeholder="Enter your new password" />
                    <input type="password" name="newPasswordConfirm" placeholder="Confirm your new password" />
                    <button className='button change-password-submit' type="button submit">Change Password</button>
                </form>
            </Panel>

            <Panel tag="section" className="change-user-email">
                <h3 className="change-user-email-headline">Change Your e-mail</h3>
                <form action="" className="change-user-email-form" onSubmit={handleChangeUserEmail}>
                    <input type="text" name="newEmail" placeholder="Enter your new e-mail" />
                    <input type="text" name="newEmailConfirm" placeholder="Confirm your new e-mail" />
                    <button type="submit" typeof='submit' className='button'>Change e-mail</button>
                </form>
            </Panel>
        </section>
    </div>

}