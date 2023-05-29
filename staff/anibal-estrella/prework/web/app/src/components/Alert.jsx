import "./Alert.css"

export default function alert({ onCancel, message, onAccept }) {

    function handleCancel(event) {
        event.preventDefault()
        
        onCancel()
    }


    console.debug(`Alert -> render`)


    return <section className="alert panel side-in">
        <div className="panel">

            <p className="alert-message border-top-gradient">{message}</p>
            <button className="button" onClick={onAccept}>OK</button>
        </div>
        <div className="overlay-panel-close" onClick={onAccept}></div>

    </section>
}