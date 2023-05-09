import updateUserAvatar from "../logic/updateUserAvatar"

export default function Profile() {
    console.log('// Profile -> RENDER');

    const handleUpdateAvatar = event => {
        event.preventDefault()
        const url = event.target.url.value

        try {

            updateUserAvatar(userId, url)

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
                    <input type="url" name="url" placeholder="Avatar image URL" accept="image/*" />
                    <button type="submit">Update Avatar</button>
                </form>
            </section>

            <section className="change-user-password panel">
                <h3 className="change-password-headline">Change Your Password</h3>
                <form action="" className="change-user-password-form">
                    <input type="password" name="password" placeholder="Enter your password" />
                    <input type="password" name="newPassword" placeholder="Enter your new password" />
                    <input type="password" name="newPasswordConfirm" placeholder="Confirm your new password" />
                    <button type="submit">Update Password</button>
                </form>
            </section>

            <section className="change-user-email panel">
                <h3 className="change-user-email-headline">Change Your e-mail</h3>
                <form action="" className="change-user-email-form">
                    <input type="text" name="newEmail" placeholder="Enter your new e-mail" />
                    <input type="text" name="newEmailConfirm" placeholder="Confirm your new e-mail" />
                    <button type="submit">Change e-mail</button>
                </form>
            </section>
        </section>
    </div>

}