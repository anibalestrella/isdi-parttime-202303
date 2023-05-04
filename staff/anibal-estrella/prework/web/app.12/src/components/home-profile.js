console.log('/// COMPONENTS / profile panel')

import { context} from "../ui.js"
import { updateUserPassword } from "../logic/update-user-password.js"
import { updateUserEmail } from "../logic/update-user-email.js"
import { updateUserAvatar } from '../logic/update-user-avatar.js'

export default function initHomeProfile(homePage, avatarImage) {

    const homeProfile = homePage.querySelector('.home-profile')
    
    const changeUserPasswordForm = homePage.querySelector('.change-user-password-form')
    const changeUserEmailForm = homePage.querySelector('.change-user-email-form')
    const changeUserAvatarForm = homePage.querySelector('.change-user-avatar-form')

    changeUserAvatarForm.onsubmit = function (event) {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url)

            alert('avatar updated')

            avatarImage.forEach((image) => image.src = url)

            changeUserAvatarForm.reset()
        } catch (error) {
            alert(error.message)
        }

    }

    changeUserEmailForm.onsubmit = function (event) {
        event.preventDefault()

        const newEmail = event.target.newEmail.value
        const newEmailConfirm = homePage.querySelector('input[name="newEmailConfirm"]').value
        const userId = context.userId

        try {
            updateUserEmail(userId, newEmail, newEmailConfirm)
            alert('email updated')

        } catch (error) {
            alert(error.message)
        }

        changeUserEmailForm.reset()

    }

    changeUserPasswordForm.onsubmit = function (event) {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = homePage.querySelector('input[name="newPassword"]').value
        const newPasswordConfirm = homePage.querySelector('input[name="newPasswordConfirm"]').value

        try {

            updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)

            alert('password changed')

            changeUserPasswordForm.reset()
        } catch (error) {
            alert(error.message)
        }

    }
    // return an object incase i need to add more elements in the object
    return { homeProfile }
}