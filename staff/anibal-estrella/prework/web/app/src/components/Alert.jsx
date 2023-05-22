export default function alert({ message, onAccept }) {
    console[level](message)

    console.log(`Alert -> render`)


    return <section className="alert">
        <p>{message}</p>
        <button onClick={}></button>
    </section>
}