import { context } from "../ui"

export default function Post(props) {
  console.log('// Post -> RENDER')

  return <article className="post panel">
    <img className="user-avatar home-post-avatar" src={props.user.avatar} />
    <h3>{props.user.name}</h3>
    {props.author === context.userId ? '<button>Edit</button>' : ''}
    <time>{props.post.date.toLocaleString()}</time>
    <img className="home-post-image" src={props.post.image} alt="" />
    <p>{props.post.text}</p>
  </article>
}
