import { Panel, Button, PanelBackgroundClose } from '../library'

export default function alert({ onPanelClick, message, onOk }) {
    console.debug(`//// Alert -> render`)

    const handlePanelClick = (event) => {
        event.preventDefault()
        onPanelClick(event)
        const clickedElement = event.target;

        if (clickedElement.id === 'Panel-Background-Close') {
            onOk()
        }
    }

    return (
        <PanelBackgroundClose onClick={handlePanelClick}>

            <Panel type="div p-4" className={'text-center w-1/2 border border-red'} onClick={handlePanelClick}>

                <p className="alert-message mb-4 ">{message}</p>
                <Button className=" max-w-fit" onClick={onOk}>OK</Button>

            </Panel>

        </PanelBackgroundClose>
    )
}
