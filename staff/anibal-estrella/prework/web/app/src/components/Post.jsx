export default function Post(props) {
    console.log('// Post -> RENDER')   

    return <article className="post">
            <p>{props.post.author}</p>
          {props.author === context.userId ? '<button>Edit</button>' : ''}
            <date>{props.post.date.toLocaleString()}</date>
            <img src={props.post.image} alt="">
            <p>{post.text}</p></article>
}
