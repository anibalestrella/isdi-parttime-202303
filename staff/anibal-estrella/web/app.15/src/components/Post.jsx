import { context } from "../ui"
// call post data destructuring parameter, instead of src={props.post.image} only src={image}
export default function Post({ post: { author, date, id, image, text, likes }, user: { avatar, name } }) {
  console.log('// Post -> RENDER')

  return <article className="post panel">
    <img className="user-avatar home-post-avatar" src={avatar} />
    <h3>{name}</h3>
    {author === context.userId ? '<button>Edit</button>' : ''}
    <time>{date.toLocaleString()}</time>
    <img className="home-post-image" src={image} alt="" />
    <p>{text}</p>
    <button>
      {likes && likes.includes(context.userId) ? '❤️ {likes.length}' : '🤍'} {likes ? likes.length : 0} 
    </button>
    <button></button>
  </article>
}
