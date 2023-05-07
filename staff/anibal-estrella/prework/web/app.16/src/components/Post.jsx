import { context } from "../ui"
// call post PROPS data as destructuring parameters, instead of src={props.post.image} then we'll use only src={image} to call PORPS data
export default function Post({ post: { author, date, id, image, text, likes }, user: { avatar, name } }) {
  console.log('// Post -> RENDER')

  return <article className="post panel">
    <img className="user-avatar home-post-avatar" src={avatar} />
    <h3>{name}</h3>
    <time>{date.toLocaleString()}</time>
    <img className="home-post-image" src={image} alt="" />
    <p>{text}</p>
    <button>
      {likes && likes.includes(context.userId) ? '❤️ {likes.length}' : '🤍'} {likes ? likes.length : 0} 
    </button>
    {author === context.userId ? <button>Edit</button> : ''}
  </article>
}
