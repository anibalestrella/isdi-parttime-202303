import { useState } from 'react';
import { Panel, Button, PanelBackgroundClose } from '../library'
import { loginUser } from '../../logic/users/';

export default function AuthPassword({ onPanelClick, message, onOk, onAuthentication, onChange, onCancel, userCurrentEmail }) {
    console.debug(`//// AuthPassword -> render`)
    const [error, setError] = useState(null);

    const handlePanelClick = (event) => {
        event.preventDefault()
        onPanelClick(event)
        const clickedElement = event.target;

        if (clickedElement.id === 'Panel-Background-Close') {
            onOk()
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const password = event.target.password.value;

        try {
            const isAuthenticated = await loginUser(userCurrentEmail, password)
            onAuthentication(isAuthenticated)

        } catch (error) {
            setError(error.message, 'error');
        }
    }

    return (
        // <PanelBackgroundClose onClick={handlePanelClick}>
        //     <Panel type="div p-4" className={'text-center w-1/2 border border-red'} onClick={handlePanelClick}>

        <PanelBackgroundClose >
            <Panel type="div p-4" className={'text-center w-1/2 border border-red'} >

                <form action="" onSubmit={handleSubmit}>
                    <p className="alert-message mb-4 ">{message}</p>
                    <div>
                        <label htmlFor="password">Enter your password to continue:</label>
                        <input
                            type="password"
                            className="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="off"
                            onChange={onChange}
                            required
                        />
                        {error && <p>{error}</p>}

                    </div>

                    <Button type="submit" className={'max-w-fit '}>Continue</Button>
                    <Button type="button" className={'button-cancel max-w-fit hover:button-cancel-hover'} onClick={onCancel}>Cancel</Button>
                </form>
            </Panel>

        </PanelBackgroundClose>
    )
}
