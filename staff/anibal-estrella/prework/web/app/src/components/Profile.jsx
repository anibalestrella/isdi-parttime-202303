import { useState, useRef, useEffect } from 'react';

import { context } from '../ui'
import updateUserAvatar from "../logic/updateUserAvatar"
import updateUserPassword from "../logic/updateUserPassword"
import updateUserEmail from "../logic/updateUserEmail"
import retrieveUser from "../logic/retrieveUser"


import { EyeIcon } from '@heroicons/react/24/solid'
import './Profile.css'

export default function Profile({ onAvatarUpdated }) {
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

            updateUserAvatar(context.userId, url, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onAvatarUpdated()
            })
            
        } catch (error) {
            alert(error.message)
        }
    }
    
    const handleUpdatePassword = event => {
        event.preventDefault()
        
        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value
        
        try {
            
            updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)
            
            alert('Your Password has been Successfully updated.')
            
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChangeUserEmail = event => {
        event.preventDefault()
        
        const emailConfirm = event.target.newEmail.value
        const newEmailConfirm = event.target.newEmailConfirm.value
        
        try {
            
            updateUserEmail(context.userId, emailConfirm, newEmailConfirm)
            
            alert('Your email has been Successfully updated.')
            
        } catch (error) {
            alert(error.message)
        }
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
            <section className="change-user-avatar panel  ">
                <h3 className="change-user-avatar-headline">Change your avatar</h3>
                <div>
                    <img className="user-avatar home-profile-avatar" src={previewImage} alt="" />
                    <form action="" className="change-user-avatar-form " onSubmit={handleUpdateAvatar}>
                        
                        <div>
                            <input type="url" name="url"  placeholder="Avatar image URL" accept="image/*" ref={imageInputRef} onPaste={handleImagePreview} />
                            <button className="preview-image-button icon post-button" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button>
                        </div>

                        <button className='button change-avatar-submit' type="submit">Change Avatar</button>
                    </form>
                </div>

            </section>

            <section className="change-user-password panel">
                <h3 className="change-password-headline">Change Your Password</h3>
                <form action="" className="change-user-password-form" onSubmit={handleUpdatePassword}>
                    <input type="password" name="password" placeholder="Enter your password" />
                    <input type="password" name="newPassword" placeholder="Enter your new password" />
                    <input type="password" name="newPasswordConfirm" placeholder="Confirm your new password" />
                    <button className='button change-password-submit' type="button submit">Change Password</button>
                </form>
            </section>

            <section className="change-user-email panel">
                <h3 className="change-user-email-headline">Change Your e-mail</h3>

                <form action="" className="change-user-email-form" onSubmit={handleChangeUserEmail}>
                    <input type="text" name="newEmail" placeholder="Enter your new e-mail" />
                    <input type="text" name="newEmailConfirm" placeholder="Confirm your new e-mail" />
                    <button type="submit" typeof='submit' className='button'>Change e-mail</button>
                </form>
            </section>
        </section>
    </div>

}