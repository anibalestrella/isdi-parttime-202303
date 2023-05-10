import { context } from "../ui"
import './Post.css'


export default function Post({post: {id, author, image, text, date, likes }, user: {avatar, name}, onEditPost}) {
  console.log('// Post -> RENDER')

  function handleOpenEditPost() {
    onEditPost(id)
  }

  return <article className="post panel">
    <div className="post-info">
      <img className="user-avatar home-post-avatar" src={avatar} />
      <h3>{name}</h3>
      <time>{date.toLocaleString()}</time>
    </div>
    <img className="home-post-image" src={image} alt="" />
    <p>{text}</p>
    <button>
      {likes && likes.includes(context.userId) ? '❤️ {likes.length}' : '🤍'} {likes ? likes.length : 0}
    </button>
    {author === context.userId ? <button onClick={handleOpenEditPost}>Edit Post</button> : ''}
  </article>
}