import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import './Post.css'

export default function Post({ post: { author, id, image, text, date, likes }, user: {avatar, name}, onEditPost, onToggledLikePost }) {
  console.log('// Post -> RENDER')
  
  const handleOpenEditPost = () => onEditPost(id)
  
  const handleToggleLikePost =() => {
  console.log('LIKE POST')
    try {
      
      toggleLikePost(context.userId, id)
      onToggledLikePost()
      
    } catch (error) {
      alert(error.message)
    }

  }

  
  return (
    
  <article className="post panel">
    <div className="post-info">
      <img className="user-avatar home-post-avatar" src={avatar} />
      <h3>{name}</h3>
      <time>{date.toLocaleString()}</time>
    </div>
    <img className="home-post-image" src={image} alt="" />
    <p>{text}</p>
    <button onClick={handleToggleLikePost}>
      {likes && likes.includes(context.userId) ? '❤️' : '🤍'} {likes ? likes.length : 0}
    </button>
    {author === context.userId ? <button onClick={handleOpenEditPost}>Edit Post</button> : ''}
  </article>

  )

}
