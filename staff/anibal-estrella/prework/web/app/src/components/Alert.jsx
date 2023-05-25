export default function alert({ message, onAccept }) {

    console.debug(`Alert -> render`)


    return <section className="alert edit-post-modal">
        <p>{message}</p>
        <button onClick={onAccept}>Accept</button>
    </section>
}