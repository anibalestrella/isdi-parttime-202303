import { Panel, Button, PanelBackgroundClose } from '../library'

export default function confirm({ message, onPanelClick, onCancel, onConfirmOk }) {
    console.debug(`//// Confirm -> render`)

    const handlePanelClick = (event) => {
        event.preventDefault()
        onPanelClick(event)
        const clickedElement = event.target;

        if (clickedElement.id === 'Panel-Background-Close') {
            onCancel()
        }
    }



    return (
        <PanelBackgroundClose onClick={handlePanelClick}>

            <Panel type="div p-4" className={' text-center w-1/2 border border-red'} onClick={handlePanelClick}>

                <p className="mb-4 ">{message}</p>

                <div className='grid grid-flow-col w-full col-span-2 place-content-center gap-2'>
                    <Button className=" max-w-fit" onClick={() => onConfirmOk(true)}
                    >OK</Button>
                    <Button className=" max-w-fit" onClick={onCancel}>Cancel</Button>
                </div>

            </Panel>

        </PanelBackgroundClose>
    )
}
