import { context } from "../ui"

// call post PROPS data as destructuring parameters, instead of src={props.post.image} then we'll use only src={image} to call PORPS data
export default function Post(props) {
  console.log('// Post -> RENDER')

  function handleOpenEditPost() {
    props.onEditPost()
  }

  return <article className="post panel">
    <img className="user-avatar home-post-avatar" src={props.user.avatar} />
    <h3>{props.user.name}</h3>
    <time>{props.post.date.toLocaleString()}</time>
    <img className="home-post-image" src={props.post.image} alt="" />
    <p>{props.post.text}</p>
    <button>
      {props.post.likes && props.post.likes.includes(context.userId) ? '❤️ {likes.length}' : '🤍'} {props.post.likes ? props.post.likes.length : 0}
    </button>
    {props.post.author === context.userId ? <button onClick={handleOpenEditPost}>Edit</button> : ''}
  </article>
}
