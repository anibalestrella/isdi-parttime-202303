import { context } from '../ui'
import updateUserAvatar from "../logic/updateUserAvatar"
import updateUserPassword from "../logic/updateUserPassword"
import updateUserEmail from "../logic/updateUserEmail"
import retrieveUser from "../logic/retrieveUser"

import './Profile.css'

export default function Profile({ onAvatarUpdated }) {
    console.log('// Profile -> RENDER');

    let _user
    let avatar

    try {
        _user = retrieveUser(context.userId)
        const name = _user.name
        avatar = _user.avatar

    } catch (error) {
        alert(error.message)
    }


    const handleUpdateAvatar = event => {
        event.preventDefault()

        const url = event.target.url.value

        try {

            updateUserAvatar(context.userId, url)
            onAvatarUpdated()

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

    return <div className="home-profile">
        <section>
            <h2 className="profile-headline">Profile</h2>
            <section className="change-user-avatar panel">
                <h3 className="change-user-avatar-headline">Change your avatar</h3>
                <form action="" className="change-user-avatar-form" onSubmit={handleUpdateAvatar}>
                <img className="user-avatar home-profile-avatar" src={avatar} alt="" />
                    <input type="url" name="url" placeholder="Avatar image URL" accept="image/*" />
                    <button type="submit">Update Avatar</button>
                </form>
            </section>

            <section className="change-user-password panel">
                <h3 className="change-password-headline">Change Your Password</h3>
                <form action="" className="change-user-password-form" onSubmit={handleUpdatePassword}>
                    <input type="password" name="password" placeholder="Enter your password" />
                    <input type="password" name="newPassword" placeholder="Enter your new password" />
                    <input type="password" name="newPasswordConfirm" placeholder="Confirm your new password" />
                    <button type="submit">Update Password</button>
                </form>
            </section>

            <section className="change-user-email panel">
                <h3 className="change-user-email-headline">Change Your e-mail</h3>

                <form action="" className="change-user-email-form" onSubmit={handleChangeUserEmail}>
                    <input type="text" name="newEmail" placeholder="Enter your new e-mail" />
                    <input type="text" name="newEmailConfirm" placeholder="Confirm your new e-mail" />
                    <button type="submit" typeof='submit'>Change e-mail</button>
                </form>
            </section>
        </section>
    </div>

}